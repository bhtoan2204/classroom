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
exports.ClassSchema = exports.Class = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../database/abstract.schema");
let Class = class Class extends abstract_schema_1.AbstractDocument {
    className;
    description;
    host;
    list_student_url;
    grade_compositions;
};
exports.Class = Class;
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "Class Name Required"] }),
    __metadata("design:type", String)
], Class.prototype, "className", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Class.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Class.prototype, "host", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Class.prototype, "list_student_url", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                gradeCompo_name: { type: String, required: true },
                gradeCompo_scale: { type: Number, required: true },
                is_finalized: { type: Boolean, default: false },
            },
        ],
        validate: {
            validator: function (gradeCompositions) {
                const names = gradeCompositions.map(comp => comp.gradeCompo_name);
                return (new Set(names)).size === names.length;
            },
            message: "gradeCompo_name must be unique within the grade_compositions array.",
        },
        default: [],
    }),
    __metadata("design:type", Array)
], Class.prototype, "grade_compositions", void 0);
exports.Class = Class = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], Class);
exports.ClassSchema = mongoose_1.SchemaFactory.createForClass(Class);
//# sourceMappingURL=class.schema.js.map