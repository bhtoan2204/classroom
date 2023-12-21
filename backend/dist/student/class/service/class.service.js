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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("../../../utils/schema/class.schema");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const invitation_schema_1 = require("../../../utils/schema/invitation.schema");
const user_schema_1 = require("../../../utils/schema/user.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let ClassService = class ClassService {
    classRepository;
    classUserRepository;
    invitationRepository;
    userRepository;
    userGradeRepository;
    constructor(classRepository, classUserRepository, invitationRepository, userRepository, userGradeRepository) {
        this.classRepository = classRepository;
        this.classUserRepository = classUserRepository;
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
        this.userGradeRepository = userGradeRepository;
    }
    async checkInClassForView(user, classId) {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        });
        classUser.students.forEach(student => {
            if (student.user_id.equals(user._id)) {
                return true;
            }
        });
        return false;
    }
    async joinClass(user, classToken, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) {
            return new common_1.NotFoundException("Class not found");
        }
        const invitation = await this.invitationRepository.findOne({ class_id: classId, class_token: classToken }).exec();
        if (!invitation) {
            return new common_1.NotFoundException("Invitation not found");
        }
        const classUser = await this.classUserRepository.findOne({ class_id: classId });
        classUser.students.push({
            user_id: user._id,
            student_id: `${classUser.students.length + 1}-2023`
        });
        classUser.save();
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        const updatedUser = await this.userRepository.findOne({ _id: user._id });
        updatedUser.classes.push({
            class_id: classId,
            class_name: clazz.className,
            class_description: clazz.description,
        });
        updatedUser.save();
        const grades = clazz.grade_compositions.map(comp => ({
            gradeCompo_name: comp.gradeCompo_name,
            gradeCompo_scale: comp.gradeCompo_scale,
            current_grade: null,
        }));
        const newUserGrade = {
            user_id: user._id,
            classId: classId,
            grades: grades,
        };
        await this.userGradeRepository.create(newUserGrade);
        return { message: "Join class successfully" };
    }
    async joinClassByClassId(user, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) {
            return new common_1.NotFoundException("Class not found");
        }
        const classUser = await this.classUserRepository.findOne({ class_id: classId });
        classUser.students.push({
            user_id: user._id,
            student_id: `${classUser.students.length + 1}-2023`
        });
        classUser.save();
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        const updatedUser = await this.userRepository.findOne({ _id: user._id });
        updatedUser.classes.push({
            class_id: classId,
            class_name: clazz.className,
            class_description: clazz.description,
        });
        updatedUser.save();
        const grades = clazz.grade_compositions.map(comp => ({
            gradeCompo_name: comp.gradeCompo_name,
            gradeCompo_scale: comp.gradeCompo_scale,
            current_grade: null,
        }));
        const newUserGrade = {
            user_id: user._id,
            class_id: classId,
            grades: grades,
        };
        console.log;
        await this.userGradeRepository.create(newUserGrade);
        return { message: "Join class successfully" };
    }
    getJoinedClasses(user) {
        return user.classes;
    }
    async viewGradeStructure(user, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz)
            return new common_1.NotFoundException("Class not found");
        if (!this.checkInClassForView(user, new mongoose_2.Types.ObjectId(classId))) {
            return new common_1.ForbiddenException('You are already in this class');
        }
        const clazz = await this.classRepository.findOne({ _id: classId });
        return clazz.grade_compositions;
    }
    async viewClassMembers(user, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz)
            return new common_1.NotFoundException("Class not found");
        if (!this.checkInClassForView(user, classId)) {
            return new common_1.ForbiddenException('You are not in in this class');
        }
        const classUser = await this.classUserRepository.findOne({
            class_id: new mongoose_2.Types.ObjectId(classId)
        });
        const studentIds = classUser.students.map(student => student.user_id);
        const students = await this.userRepository.find({ _id: { $in: studentIds, $ne: user._id } }).select("fullname email").exec();
        return students;
    }
    async viewClassTeachers(user, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz)
            return new common_1.NotFoundException("Class not found");
        if (!this.checkInClassForView(user, new mongoose_2.Types.ObjectId(classId))) {
            return new common_1.ForbiddenException('You are not in in this class');
        }
        const classUser = await this.classUserRepository.findOne({
            class_id: new mongoose_2.Types.ObjectId(classId)
        });
        const teacherIds = classUser.teachers.map(teacher => teacher.user_id);
        const teachers = await this.userRepository.find({ _id: { $in: teacherIds } }).select("fullname email").exec();
        return teachers;
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(1, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(2, (0, mongoose_1.InjectModel)(invitation_schema_1.Invitation.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ClassService);
//# sourceMappingURL=class.service.js.map