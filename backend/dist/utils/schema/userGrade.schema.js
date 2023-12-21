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
exports.UserGradeSchema = exports.UserGrade = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../database/abstract.schema");
class Grades {
    gradeCompo_name;
    gradeCompo_scale;
    current_grade;
}
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Grades.prototype, "gradeCompo_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Grades.prototype, "gradeCompo_scale", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Grades.prototype, "current_grade", void 0);
let UserGrade = class UserGrade extends abstract_schema_1.AbstractDocument {
    user_id;
    class_id;
    grades;
    overall_grade;
};
exports.UserGrade = UserGrade;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserGrade.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserGrade.prototype, "class_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Grades], default: [] }),
    __metadata("design:type", Array)
], UserGrade.prototype, "grades", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], UserGrade.prototype, "overall_grade", void 0);
exports.UserGrade = UserGrade = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], UserGrade);
exports.UserGradeSchema = mongoose_1.SchemaFactory.createForClass(UserGrade);
//# sourceMappingURL=userGrade.schema.js.map