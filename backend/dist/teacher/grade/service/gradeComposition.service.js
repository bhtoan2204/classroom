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
exports.GradeCompositionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("../../../utils/schema/class.schema");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let GradeCompositionService = class GradeCompositionService {
    classRepository;
    classUserRepository;
    userGradeRepository;
    constructor(classRepository, classUserRepository, userGradeRepository) {
        this.classRepository = classRepository;
        this.classUserRepository = classUserRepository;
        this.userGradeRepository = userGradeRepository;
    }
    async checkIsHost(user, classId) {
        const clazz = await this.classRepository.findOne({ _id: new mongoose_2.Types.ObjectId(classId), host: user._id }).exec();
        if (!clazz) {
            return new common_1.HttpException('You are not the host of this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkInClass(user, classId) {
        const classUser = await this.classUserRepository.findOne({ user_id: user._id, class_id: classId }).exec();
        if (classUser == null) {
            return new common_1.HttpException('You are not in this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async createGradeComposition(user, dto) {
        try {
            this.checkIsHost(user, dto.class_id);
            if (!mongoose_2.Types.ObjectId.isValid(dto.class_id)) {
                return new common_1.HttpException("Invalid class_id format", common_1.HttpStatus.BAD_REQUEST);
            }
            const classId = new mongoose_2.Types.ObjectId(dto.class_id);
            const clazz = await this.classRepository.findOne({ _id: classId }).exec();
            if (!clazz) {
                return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
            }
            if (clazz.grade_compositions.findIndex((item) => item.gradeCompo_name == dto.name) != -1) {
                return new common_1.HttpException("Grade composition name is duplicated", common_1.HttpStatus.BAD_REQUEST);
            }
            clazz.grade_compositions.push({
                gradeCompo_name: dto.name,
                gradeCompo_scale: dto.scale,
                is_finalized: false
            });
            await clazz.save();
            const students = await this.userGradeRepository.find({ class_id: classId }).exec();
            for (let i = 0; i < students.length; i++) {
                const newGrade = {
                    gradeCompo_name: dto.name,
                    gradeCompo_scale: dto.scale,
                    current_grade: null,
                };
                students[i].grades.push(newGrade);
                students[i].save();
            }
            ;
            return {
                message: "Create GradeComposition successful",
            };
        }
        catch (err) {
            return new common_1.HttpException(err, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getCurentGradeStructure(user, classId) {
        this.checkInClass(user, classId);
        try {
            const clazz = await this.classRepository.findOne({ _id: new mongoose_2.Types.ObjectId(classId) }).exec();
            if (!clazz) {
                return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
            }
            return clazz.grade_compositions;
        }
        catch (err) {
            return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async removeGradeCompositions(user, dto) {
        this.checkIsHost(user, dto.class_id);
        try {
            const clazz = await this.classRepository.findOne({ _id: new mongoose_2.Types.ObjectId(dto.class_id) }).exec();
            const index = clazz.grade_compositions.findIndex((item) => item.gradeCompo_name == dto.name);
            if (index == -1) {
                return new common_1.HttpException("Grade composition not found", common_1.HttpStatus.NOT_FOUND);
            }
            clazz.grade_compositions.splice(index, 1);
            await this.userGradeRepository.updateMany({ class_id: new mongoose_2.Types.ObjectId(dto.class_id) }, { $pull: { 'grades': { gradeCompo_name: dto.name } } }).exec();
            return await clazz.save();
        }
        catch (err) {
            return new common_1.HttpException("Grade composition not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateGradeCompositions(user, dto) {
        try {
            this.checkIsHost(user, dto.class_id);
            const classId = new mongoose_2.Types.ObjectId(dto.class_id);
            const clazz = await this.classRepository.findOne({ _id: classId }).exec();
            if (!clazz) {
                return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
            }
            const index = clazz.grade_compositions.findIndex((item) => item.gradeCompo_name == dto.oldName);
            if (index == -1) {
                return new common_1.HttpException("Grade composition not found", common_1.HttpStatus.NOT_FOUND);
            }
            clazz.grade_compositions[index].gradeCompo_name = dto.name;
            clazz.grade_compositions[index].gradeCompo_scale = dto.scale;
            await this.userGradeRepository.updateMany({ class_id: classId, 'grades.gradeCompo_name': dto.oldName }, {
                $set: {
                    'grades.$.gradeCompo_name': dto.name,
                    'grades.$.gradeCompo_scale': dto.scale,
                }
            }).exec();
            return await clazz.save();
        }
        catch (err) {
            return new common_1.HttpException("Error updating GradeComposition", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async swapGradeCompositions(user, dto) {
        try {
            this.checkIsHost(user, dto.class_id);
            const classId = new mongoose_2.Types.ObjectId(dto.class_id);
            const clazz = await this.classRepository.findOne({ _id: classId }).exec();
            if (!clazz) {
                return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
            }
            const index1 = clazz.grade_compositions.findIndex((item) => item.gradeCompo_name == dto.firstName);
            const index2 = clazz.grade_compositions.findIndex((item) => item.gradeCompo_name == dto.secondName);
            if (index1 == -1 || index2 == -1) {
                return new common_1.HttpException("Grade composition not found", common_1.HttpStatus.NOT_FOUND);
            }
            const temp = clazz.grade_compositions[index1];
            clazz.grade_compositions[index1] = clazz.grade_compositions[index2];
            clazz.grade_compositions[index2] = temp;
            await this.userGradeRepository.updateOne({ class_id: classId, 'grades.gradeCompo_name': { $in: [dto.firstName, dto.secondName] } }, [
                {
                    $set: {
                        'grades.$[grade1]': '$grades.$[grade2]',
                        'grades.$[grade2]': '$grades.$[grade1]',
                    }
                },
            ], { arrayFilters: [{ 'grade1.gradeCompo_name': dto.firstName }, { 'grade2.gradeCompo_name': dto.secondName }] }).exec();
            return await clazz.save();
        }
        catch (err) {
            return new common_1.HttpException("Error updating GradeComposition", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GradeCompositionService = GradeCompositionService;
exports.GradeCompositionService = GradeCompositionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(1, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(2, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GradeCompositionService);
//# sourceMappingURL=gradeComposition.service.js.map