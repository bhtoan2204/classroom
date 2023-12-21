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
exports.ClassUserSchema = exports.ClassUser = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../database/abstract.schema");
class Student {
    user_id;
    student_id;
}
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "student_id", void 0);
class Teacher {
    user_id;
}
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Teacher.prototype, "user_id", void 0);
let ClassUser = class ClassUser extends abstract_schema_1.AbstractDocument {
    class_id;
    students;
    teachers;
};
exports.ClassUser = ClassUser;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class', unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ClassUser.prototype, "class_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Student], default: [] }),
    __metadata("design:type", Array)
], ClassUser.prototype, "students", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Teacher], default: [] }),
    __metadata("design:type", Array)
], ClassUser.prototype, "teachers", void 0);
exports.ClassUser = ClassUser = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], ClassUser);
exports.ClassUserSchema = mongoose_1.SchemaFactory.createForClass(ClassUser);
//# sourceMappingURL=classUser.schema.js.map