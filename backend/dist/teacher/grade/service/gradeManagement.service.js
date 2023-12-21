"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exceljs_1 = require("exceljs");
const mongoose_2 = require("mongoose");
const tmp = require("tmp");
const storage_service_1 = require("../../../storage/storage.service");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const user_schema_1 = require("../../../utils/schema/user.schema");
const class_schema_1 = require("../../../utils/schema/class.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let GradeManagementService = class GradeManagementService {
    classUserRepository;
    userRepository;
    classRepository;
    userGradeRepository;
    storageService;
    constructor(classUserRepository, userRepository, classRepository, userGradeRepository, storageService) {
        this.classUserRepository = classUserRepository;
        this.userRepository = userRepository;
        this.classRepository = classRepository;
        this.userGradeRepository = userGradeRepository;
        this.storageService = storageService;
    }
    async checkIsHost(user, classId) {
        const clazz = await this.classRepository.findOne({ _id: classId, host: user._id }).exec();
        if (!clazz) {
            return new common_1.HttpException('You are not the host of this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    styleSheet(sheet) {
        sheet.getColumn(1).width = 30;
        sheet.getColumn(2).width = 20;
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getRow(1).height = 30;
        sheet.getRow(1).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    }
    async checkInClass(user, classId) {
    }
    async getStudentOfClass(classId) {
        const classUser = await this.classUserRepository.find({ class_id: classId }).exec();
        if (classUser == null) {
            throw new common_1.HttpException('Class not found', common_1.HttpStatus.NOT_FOUND);
        }
        const studentids = classUser.map((classUser) => classUser.students.map((student) => student.user_id));
        const users = await this.userRepository.find({ _id: { $in: studentids } }).exec();
        return users;
    }
    async isClassExist(classId) {
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            throw new common_1.HttpException('Class not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async downloadListStudentTemplate(currentUser, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkInClass(currentUser, classId);
        const users = await this.getStudentOfClass(classId);
        let rows = [];
        users.forEach(async (user) => {
            const classUser = await this.classUserRepository.findOne({ class_id: classId }).exec();
            const studentId = classUser.students.find((student) => student.user_id == user._id).student_id;
            rows.push(Object.values({ Name: user.fullname, Id: studentId }));
        });
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet('List Student');
        rows.unshift(Object.values({ studentName: 'Student Name', studentId: 'Student Id' }));
        sheet.addRows(rows);
        this.styleSheet(sheet);
        let File = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDescriptor: true,
                prefix: `MyExcelSheet`,
                postfix: '.xlsx',
                mode: parseInt('0600', 8),
            }, async (err, file) => {
                if (err)
                    throw new common_1.BadRequestException(err);
                await book.xlsx.writeFile(file);
                resolve(file);
            });
        });
        return File;
    }
    async uploadListStudentCsv(currentUser, classid, file) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        await this.isClassExist(classId);
        await this.checkIsHost(currentUser, classId);
        const fileName = await this.storageService.uploadCsv(file, classid);
        await this.classRepository.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(classId) }, {
            list_student_url: `https://storageclassroom.blob.core.windows.net/upload-file/${fileName}`
        }, { new: true }).exec();
        return {
            message: 'Upload file successful',
            fileName: fileName
        };
    }
    async showStudentsListxGradesBoard(currentUser, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        await this.checkInClass(currentUser, classId);
        try {
            const classUser = await this.classUserRepository.findOne({ class_id: classId });
            const students = classUser.students;
            const rows = [];
            for (const student of students) {
                const studentName = (await this.userRepository.findOne({ _id: student.user_id }).exec()).fullname;
                const studentId = student.student_id;
                const userGrade = await this.userGradeRepository.findOne({ user_id: student.user_id, class_id: classId }).exec();
                const grades = userGrade.grades;
                const row = {
                    user_id: student.user_id,
                    studentName: studentName,
                    studentId: studentId,
                };
                grades.forEach((grade) => {
                    row[grade.gradeCompo_name] = grade.current_grade;
                });
                rows.push(row);
            }
            return rows;
        }
        catch (err) {
            throw new common_1.HttpException('Error: ' + err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async mapStudentId(user, dto) {
        const classId = new mongoose_2.Types.ObjectId(dto.class_id);
        this.checkInClass(user, classId);
        const userId = new mongoose_2.Types.ObjectId(dto.user_id);
        const updatedClassUser = await this.classUserRepository.findOneAndUpdate({ class_id: classId, 'students.user_id': userId }, { $set: { 'students.$.student_id': dto.new_studentId } }, { new: true }).exec();
        if (!updatedClassUser) {
            throw new common_1.HttpException('Student not found or student_id not updated', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: 'Map student id successful'
        };
    }
    async inputGradeForStudent(currentUser, dto) {
        const classId = new mongoose_2.Types.ObjectId(dto.class_id);
        const userId = new mongoose_2.Types.ObjectId(dto.user_id);
        this.checkInClass(currentUser, classId);
        const user = await this.userRepository.findOne({ _id: userId }).exec();
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            throw new common_1.HttpException('Class not found', common_1.HttpStatus.NOT_FOUND);
        }
        const classUser = await this.classUserRepository.findOne({ class_id: classId }).exec();
        const check = classUser.students.find((student) => student.user_id == user._id);
        if (!check) {
            throw new common_1.HttpException('Student not found', common_1.HttpStatus.NOT_FOUND);
        }
        const gradeCompo_name = this.userGradeRepository.findOne({ class_id: dto.class_id, user_id: dto.user_id, "class_grades.grades.gradeCompo_name": dto.gradeCompo_name }).exec();
        if (!gradeCompo_name) {
            throw new common_1.HttpException('Grade composition not found', common_1.HttpStatus.NOT_FOUND);
        }
        const grade = await this.userGradeRepository.findOneAndUpdate({ class_id: dto.class_id, user_id: dto.user_id, "class_grades.grades.gradeCompo_name": dto.gradeCompo_name }, { $set: { "class_grades.$.grades.$.current_grade": dto.input_grade } }, { new: true }).exec();
        return {
            grade,
            message: 'Input grade successful'
        };
    }
    async downloadTemplateByAssignment(currentUser, classid, targetGradeCompoName) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkInClass(currentUser, classId);
        try {
            const classUser = await this.classUserRepository.findOne({ class_id: classId });
            const students = classUser.students;
            const rows = [];
            for (const student of students) {
                const studentInfo = await this.userRepository.findOne({ _id: student.user_id }).exec();
                const studentName = studentInfo.fullname;
                const studentId = student.student_id;
                const userGrade = await this.userGradeRepository.findOne({ user_id: student.user_id, class_id: classId }).exec();
                const targetGrade = userGrade.grades.find((grade) => grade.gradeCompo_name === targetGradeCompoName);
                const row = {
                    studentName: studentName,
                    studentId: studentId
                };
                row[targetGradeCompoName] = targetGrade.current_grade;
                rows.push(Object.values(row));
            }
            rows.unshift(Object.values({ studentName: 'Student Name', studentId: 'Student Id', [targetGradeCompoName]: targetGradeCompoName }));
            let book = new exceljs_1.Workbook();
            let sheet = book.addWorksheet('List Grade Student of ' + targetGradeCompoName);
            sheet.addRows(rows);
            this.styleSheet(sheet);
            let File = await new Promise((resolve, rejects) => {
                tmp.file({
                    discardDescriptor: true,
                    prefix: `MyExcelSheet`,
                    postfix: '.xlsx',
                    mode: parseInt('0600', 8),
                }, async (err, file) => {
                    if (err)
                        throw new common_1.BadRequestException(err);
                    await book.xlsx.writeFile(file);
                    resolve(file);
                });
            });
            return File;
        }
        catch (err) {
            throw new common_1.HttpException('Error: ' + err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async exportGradeBoard(currentUser, classid, gradeCompo_name) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkInClass(currentUser, classId);
        const users = await this.getStudentOfClass(classId);
        let rows = [];
        users.forEach(async (user) => {
            const userxgrade = await this.userGradeRepository.findOne({ user_id: user._id, class_id: classId }).exec();
            const classUser = await this.classUserRepository.findOne({ class_id: classId }).exec();
            const studentId = classUser.students.find((student) => student.user_id == user._id).student_id;
            rows.push(Object.values({ Name: user.fullname, Id: studentId, Grade: userxgrade.grades.find((grade) => grade.gradeCompo_name == gradeCompo_name).current_grade }));
        });
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet('List Student');
        let column = {};
        rows.unshift(Object.values({ studentName: 'Student Name', studentId: 'Student Id' }));
        sheet.addRows(rows);
    }
    async markGradeCompositionAsFinal(currentUser, gradeCompositionName, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkInClass(currentUser, classId);
        const clazz = await this.classRepository.findOneAndUpdate({ _id: classId, "grade_compositions.gradeCompo_name": gradeCompositionName }, { $set: { "grade_compositions.$.isFinal": true } }, { new: true }).exec();
        return clazz.grade_compositions;
    }
};
exports.GradeManagementService = GradeManagementService;
exports.GradeManagementService = GradeManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(3, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __param(4, (0, common_1.Inject)(storage_service_1.StorageService)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        storage_service_1.StorageService])
], GradeManagementService);
//# sourceMappingURL=gradeManagement.service.js.map