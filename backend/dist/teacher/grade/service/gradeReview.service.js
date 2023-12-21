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
exports.GradeReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const realStatus_enum_1 = require("../../../utils/enum/realStatus.enum");
const status_enum_1 = require("../../../utils/enum/status.enum");
const class_schema_1 = require("../../../utils/schema/class.schema");
const gradeReview_schema_1 = require("../../../utils/schema/gradeReview.schema");
const user_schema_1 = require("../../../utils/schema/user.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let GradeReviewService = class GradeReviewService {
    gradeReviewRepository;
    classRepository;
    userRepository;
    userGradeRepository;
    constructor(gradeReviewRepository, classRepository, userRepository, userGradeRepository) {
        this.gradeReviewRepository = gradeReviewRepository;
        this.classRepository = classRepository;
        this.userRepository = userRepository;
        this.userGradeRepository = userGradeRepository;
    }
    async checkInClass(user, classId) {
        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        });
        if (!userGrade) {
            return new common_1.HttpException('You are not in this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async viewGradeReview(currentUser, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
        }
        this.checkInClass(currentUser, classId);
        return await this.gradeReviewRepository.find({ class_id: classId }).exec();
    }
    async viewGradeReviewDetail(currentUser, gradeReviewId) {
        const gradeReview = await this.gradeReviewRepository.findOne({ _id: gradeReviewId }).exec();
        if (!gradeReview) {
            return new common_1.HttpException('Grade review not found', common_1.HttpStatus.NOT_FOUND);
        }
        const clazz = await this.classRepository.findOne({ _id: gradeReview.class_id }).exec();
        if (!clazz) {
            return new common_1.HttpException('Class not found', common_1.HttpStatus.NOT_FOUND);
        }
        this.checkInClass(currentUser, gradeReview.class_id);
        const student = await this.userRepository.findOne({ _id: gradeReview.student_id }, { student_id: 1, fullname: 1 }).exec();
        delete gradeReview.student_id;
        return {
            student,
            gradeReview
        };
    }
    async commentGradeReview(currentUser, dto) {
        const classId = new mongoose_2.Types.ObjectId(dto.classId);
        const gradeReviewId = new mongoose_2.Types.ObjectId(dto.gradeReviewId);
        this.checkInClass(currentUser, classId);
        const gradeReview = await this.gradeReviewRepository.findOne({ _id: gradeReviewId }).exec();
        if (!gradeReview) {
            return new common_1.HttpException('Grade review not found', common_1.HttpStatus.NOT_FOUND);
        }
        gradeReview.comments.push({
            commenter: currentUser.fullname,
            text: dto.comment
        });
        await gradeReview.save();
        return {
            message: 'Comment grade review successful'
        };
    }
    async markFinalGrade(currentUser, dto) {
        const gradeReviewId = new mongoose_2.Types.ObjectId(dto.gradeReview_id);
        const gradeReview = await this.gradeReviewRepository.findOne({ _id: gradeReviewId }).exec();
        if (!gradeReview) {
            return new common_1.HttpException('Grade review not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (gradeReview.finalDecision.status !== status_enum_1.Status.PENDING) {
            return new common_1.HttpException('Final decision has already been made', common_1.HttpStatus.FORBIDDEN);
        }
        const classId = gradeReview.class_id;
        this.checkInClass(currentUser, classId);
        if (dto.status === realStatus_enum_1.RealStatus.APPROVED) {
            gradeReview.finalDecision = {
                status: status_enum_1.Status.APPROVED,
                updatedGrade: gradeReview.expected_grade
            };
            const grade = await this.userGradeRepository.findOneAndUpdate({ class_id: gradeReview.class_id, user_id: gradeReview.student_id, "class_grades.grades.gradeCompo_name": gradeReview.gradeCompo_name }, { $set: { "class_grades.$.grades.$.current_grade": gradeReview.expected_grade } }, { new: true }).exec();
            gradeReview.save();
            return {
                message: 'Grade Review approved',
                grade: grade
            };
        }
        else if (dto.status === realStatus_enum_1.RealStatus.REJECTED) {
            gradeReview.finalDecision.status = status_enum_1.Status.REJECTED;
            return {
                message: 'Grade Review rejected'
            };
        }
    }
};
exports.GradeReviewService = GradeReviewService;
exports.GradeReviewService = GradeReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gradeReview_schema_1.GradeReview.name)),
    __param(1, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GradeReviewService);
//# sourceMappingURL=gradeReview.service.js.map