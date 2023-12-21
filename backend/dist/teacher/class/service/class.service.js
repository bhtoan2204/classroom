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
const mongoose_3 = require("mongoose");
const class_schema_1 = require("../../../utils/schema/class.schema");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const user_schema_1 = require("../../../utils/schema/user.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let ClassService = class ClassService {
    classRepository;
    classUserRepository;
    userRepository;
    userGradeRepository;
    constructor(classRepository, classUserRepository, userRepository, userGradeRepository) {
        this.classRepository = classRepository;
        this.classUserRepository = classUserRepository;
        this.userRepository = userRepository;
        this.userGradeRepository = userGradeRepository;
    }
    async checkInClass(user, classId) {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        }).exec();
        const check = classUser.teachers.findIndex(teacher => teacher.user_id == user._id);
        if (check === -1) {
            return new common_1.HttpException('You are not in this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkIsHost(user, classId) {
        const clazz = await this.classRepository.findOne({ _id: classId, host: user._id }).exec();
        if (!clazz) {
            return new common_1.HttpException('You are not the host of this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async create(host, dto) {
        const newClass = new this.classRepository({
            className: dto.className,
            description: dto.description,
            host: host._id,
        });
        const newClassUser = await this.classUserRepository.create({
            class_id: newClass._id,
            teachers: [{ user_id: host._id }]
        });
        const user = await this.userRepository.findOne({ _id: host._id });
        user.classes.push({
            class_id: newClass._id,
            class_name: dto.className,
            class_description: dto.description
        });
        await newClass.save();
        await newClassUser.save();
        await user.save();
        return {
            message: "Create class successfully",
            class: {
                class_id: newClass._id,
                class_name: dto.className,
                class_description: dto.description
            }
        };
    }
    async deleteClass(host, classid) {
        const classId = new mongoose_3.Types.ObjectId(classid);
        this.checkIsHost(host, classId);
        const clazz = await this.classRepository.findOne({ _id: classId, host: host._id }).exec();
        if (!clazz)
            return new common_1.NotFoundException("Class not found");
        await this.classRepository.findOneAndDelete({ _id: classId, host: host._id }).exec();
        await this.classUserRepository.findOneAndDelete({ class_id: classId }).exec();
        await this.userGradeRepository.deleteMany({ class_id: classId }).exec();
        const users = await this.userRepository.find({ classes: { $elemMatch: { class_id: classId } } }).exec();
        users.forEach(async (user) => {
            const index = user.classes.findIndex(clazz => clazz.class_id == classId);
            user.classes.splice(index, 1);
            await user.save();
        });
        return new common_1.HttpException("Delete class successfully", common_1.HttpStatus.OK);
    }
    async getAll(user) {
        const classIds = user.classes.map(clazz => clazz.class_id);
        const classes = await this.classRepository.find({ _id: { $in: classIds } })
            .select('_id className description')
            .exec();
        if (!classes || classes.length === 0) {
            return new common_1.NotFoundException('No classes found for the given user');
        }
        return classes;
    }
    async getJoinedClasses(user) {
        const classes = await this.classRepository.find({ host: user._id })
            .select('_id className description')
            .exec();
        if (!classes || classes.length === 0) {
            return new common_1.NotFoundException('No classes found for the given host');
        }
        return classes;
    }
    async getClassDetail(host, classid) {
        const classId = new mongoose_3.Types.ObjectId(classid);
        this.checkInClass(host, classId);
        const clazz = await this.classRepository.findOne({ _id: classId, host: host._id })
            .select('_id className description')
            .exec();
        if (!clazz)
            return new common_1.ConflictException("You already in this class");
        return clazz;
    }
    async getTeachers(user, classid) {
        const classId = new mongoose_3.Types.ObjectId(classid);
        this.checkInClass(user, classId);
        try {
            const classUsers = await this.classUserRepository.find({ class_id: new mongoose_3.Types.ObjectId(classId) });
            const userIds = classUsers.map(classUser => classUser.teachers.map(teachers => teachers.user_id));
            const teachers = await this.userRepository.find({ _id: { $in: userIds } });
            return teachers;
        }
        catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }
    async getStudents(host, classid) {
        const classId = new mongoose_3.Types.ObjectId(classid);
        this.checkInClass(host, classId);
        try {
            const classUsers = await this.classUserRepository.find({ class_id: classId });
            const userIds = classUsers.map(classUser => classUser.students.map(student => student.user_id));
            const students = await this.userRepository.find({ _id: { $in: userIds } });
            return students;
        }
        catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(1, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ClassService);
//# sourceMappingURL=class.service.js.map