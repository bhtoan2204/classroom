"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeViewerModule = void 0;
const common_1 = require("@nestjs/common");
const gradeViewer_controller_1 = require("./controller/gradeViewer.controller");
const gradeViewer_service_1 = require("./service/gradeViewer.service");
const mongoose_1 = require("@nestjs/mongoose");
const class_schema_1 = require("../../utils/schema/class.schema");
const classUser_schema_1 = require("../../utils/schema/classUser.schema");
const userGrade_schema_1 = require("../../utils/schema/userGrade.schema");
const gradeReview_schema_1 = require("../../utils/schema/gradeReview.schema");
let GradeViewerModule = class GradeViewerModule {
};
exports.GradeViewerModule = GradeViewerModule;
exports.GradeViewerModule = GradeViewerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Class', schema: class_schema_1.ClassSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'ClassUser', schema: classUser_schema_1.ClassUserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'UserGrade', schema: userGrade_schema_1.UserGradeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'GradeReview', schema: gradeReview_schema_1.GradeReviewSchema }]),
        ],
        controllers: [gradeViewer_controller_1.GradeViewerController],
        providers: [gradeViewer_service_1.GradeViewerService],
    })
], GradeViewerModule);
//# sourceMappingURL=grade.module.js.map