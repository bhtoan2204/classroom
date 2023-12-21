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
exports.GradeViewerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("../../../utils/schema/class.schema");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const gradeReview_schema_1 = require("../../../utils/schema/gradeReview.schema");
const userGrade_schema_1 = require("../../../utils/schema/userGrade.schema");
let GradeViewerService = class GradeViewerService {
    classUserRepository;
    userGradeRepository;
    classRepository;
    gradeReviewRepository;
    constructor(classUserRepository, userGradeRepository, classRepository, gradeReviewRepository) {
        this.classUserRepository = classUserRepository;
        this.userGradeRepository = userGradeRepository;
        this.classRepository = classRepository;
        this.gradeReviewRepository = gradeReviewRepository;
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
    async viewGradeCompostitions(user, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
        }
        this.checkInClass(user, classId);
        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        });
        const combinedData = clazz.grade_compositions.map((classGrade) => {
            const userGradeDetail = userGrade.grades.find((grade) => grade.gradeCompo_name === classGrade.gradeCompo_name);
            return {
                gradeCompo_name: classGrade.gradeCompo_name,
                gradeCompo_scale: classGrade.gradeCompo_scale,
                current_grade: userGradeDetail ? userGradeDetail.current_grade : null,
                is_finalized: classGrade.is_finalized,
            };
        });
        let rows = [];
        let total_scale = 0;
        let user_total = 0;
        combinedData.forEach((item) => {
            if (item.is_finalized) {
                rows.push(item);
                user_total += (item.current_grade) ? item.current_grade : 0;
            }
            else {
                rows.push({
                    gradeCompo_name: item.gradeCompo_name,
                    gradeCompo_scale: item.gradeCompo_scale,
                    current_grade: null,
                    is_finalized: false
                });
            }
            total_scale += item.gradeCompo_scale;
        });
        return {
            rows, total_scale, user_total
        };
    }
    async requestReview(user, dto) {
        const classId = new mongoose_2.Types.ObjectId(dto.class_id);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            return new common_1.HttpException("Class not found", common_1.HttpStatus.NOT_FOUND);
        }
        this.checkInClass(user, classId);
        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        });
        const grade = userGrade.grades.find((grade) => grade.gradeCompo_name === dto.gradeCompo_name);
        if (!grade) {
            return new common_1.HttpException("Grade composition not found", common_1.HttpStatus.NOT_FOUND);
        }
        const is_finalized = clazz.grade_compositions.find((grade) => grade.gradeCompo_name === dto.gradeCompo_name).is_finalized;
        if (!is_finalized) {
            return new common_1.HttpException("Grade composition is not finalized", common_1.HttpStatus.FORBIDDEN);
        }
        const gradeReview = await this.gradeReviewRepository.findOne({
            user_id: user._id,
            class_id: classId,
            gradeCompo_name: dto.gradeCompo_name,
        });
        if (gradeReview) {
            return new common_1.HttpException("You have already requested a review", common_1.HttpStatus.FORBIDDEN);
        }
        const newGradeReview = new this.gradeReviewRepository({
            class_id: classId,
            student_id: user._id,
            gradeCompo_name: dto.gradeCompo_name,
            expected_grade: dto.expected_grade,
            student_explain: dto.explaination,
            comments: [],
            finalDecision: {
                status: 'PENDING',
                updatedGrade: 0
            }
        });
        return await newGradeReview.save();
    }
    async viewGradeReview(user, reviewId) {
        const review = await this.gradeReviewRepository.findOne({ _id: reviewId });
        if (!review) {
            return new common_1.HttpException("Review not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (review.student_id.toString() !== user._id.toString()) {
            return new common_1.HttpException("You are not allowed to view this review", common_1.HttpStatus.FORBIDDEN);
        }
        return review;
    }
    async postAComment(user, dto) {
        const review = await this.gradeReviewRepository.findOne({ _id: new mongoose_2.Types.ObjectId(dto.gradeReview_id) });
        if (!review) {
            return new common_1.HttpException("Review not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (review.student_id.toString() !== user._id.toString()) {
            return new common_1.HttpException("You are not allowed to post a comment", common_1.HttpStatus.FORBIDDEN);
        }
        review.comments.push({
            commenter: user.fullname.toString(),
            text: dto.content
        });
        return await review.save();
    }
};
exports.GradeViewerService = GradeViewerService;
exports.GradeViewerService = GradeViewerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(1, (0, mongoose_1.InjectModel)(userGrade_schema_1.UserGrade.name)),
    __param(2, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(3, (0, mongoose_1.InjectModel)(gradeReview_schema_1.GradeReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GradeViewerService);
//# sourceMappingURL=gradeViewer.service.js.map