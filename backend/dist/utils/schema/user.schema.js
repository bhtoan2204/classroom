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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../utils/database/abstract.schema");
const role_enum_1 = require("../enum/role.enum");
const loginType_enum_1 = require("../enum/loginType.enum");
class Class {
    class_id;
    class_name;
    class_description;
}
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Class.prototype, "class_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Class.prototype, "class_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Class.prototype, "class_description", void 0);
let User = class User extends abstract_schema_1.AbstractDocument {
    email;
    password;
    fullname;
    role;
    avatar;
    birthday;
    refreshToken;
    login_type;
    is_ban;
    classes;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: role_enum_1.Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'local', type: String, enum: loginType_enum_1.LoginType }),
    __metadata("design:type", String)
], User.prototype, "login_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_ban", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Class], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "classes", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map