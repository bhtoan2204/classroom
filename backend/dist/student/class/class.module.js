"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassStudentsModule = void 0;
const common_1 = require("@nestjs/common");
const class_controller_1 = require("./controller/class.controller");
const class_service_1 = require("./service/class.service");
const mongoose_1 = require("@nestjs/mongoose");
const class_schema_1 = require("../../utils/schema/class.schema");
const invitation_schema_1 = require("../../utils/schema/invitation.schema");
const classUser_schema_1 = require("../../utils/schema/classUser.schema");
const user_schema_1 = require("../../utils/schema/user.schema");
const userGrade_schema_1 = require("../../utils/schema/userGrade.schema");
let ClassStudentsModule = class ClassStudentsModule {
};
exports.ClassStudentsModule = ClassStudentsModule;
exports.ClassStudentsModule = ClassStudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Class', schema: class_schema_1.ClassSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Invitation', schema: invitation_schema_1.InvitationSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'ClassUser', schema: classUser_schema_1.ClassUserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'UserGrade', schema: userGrade_schema_1.UserGradeSchema }]),
        ],
        controllers: [class_controller_1.ClassController],
        providers: [class_service_1.ClassService],
    })
], ClassStudentsModule);
//# sourceMappingURL=class.module.js.map