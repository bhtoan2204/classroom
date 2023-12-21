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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeReviewSchema = exports.GradeReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../database/abstract.schema");
let GradeReview = class GradeReview extends abstract_schema_1.AbstractDocument {
    class_id;
    student_id;
    gradeCompo_name;
    current_grade;
    expected_grade;
    student_explain;
    comments;
    finalDecision;
};
exports.GradeReview = GradeReview;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GradeReview.prototype, "class_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GradeReview.prototype, "student_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GradeReview.prototype, "gradeCompo_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GradeReview.prototype, "current_grade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GradeReview.prototype, "expected_grade", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GradeReview.prototype, "student_explain", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], GradeReview.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], GradeReview.prototype, "finalDecision", void 0);
exports.GradeReview = GradeReview = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], GradeReview);
exports.GradeReviewSchema = mongoose_1.SchemaFactory.createForClass(GradeReview);
//# sourceMappingURL=gradeReview.schema.js.map