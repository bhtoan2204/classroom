"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gradeComposition_controller_1 = require("./controllers/gradeComposition.controller");
const class_module_1 = require("../class/class.module");
const gradeManagement_controller_1 = require("./controllers/gradeManagement.controller");
const gradeComposition_service_1 = require("./service/gradeComposition.service");
const gradeManagement_service_1 = require("./service/gradeManagement.service");
const user_module_1 = require("../../user/user.module");
const gradeReview_controller_1 = require("./controllers/gradeReview.controller");
const gradeReview_service_1 = require("./service/gradeReview.service");
const class_schema_1 = require("../../utils/schema/class.schema");
const classUser_schema_1 = require("../../utils/schema/classUser.schema");
const user_schema_1 = require("../../utils/schema/user.schema");
const gradeReview_schema_1 = require("../../utils/schema/gradeReview.schema");
const storage_module_1 = require("../../storage/storage.module");
const userGrade_schema_1 = require("../../utils/schema/userGrade.schema");
let GradeModule = class GradeModule {
};
exports.GradeModule = GradeModule;
exports.GradeModule = GradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            class_module_1.ClassModule,
            user_module_1.UserModule,
            storage_module_1.StorageModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Class', schema: class_schema_1.ClassSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'ClassUser', schema: classUser_schema_1.ClassUserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'GradeReview', schema: gradeReview_schema_1.GradeReviewSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'UserGrade', schema: userGrade_schema_1.UserGradeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
        ],
        controllers: [gradeComposition_controller_1.GradeCompositionController, gradeManagement_controller_1.GradeManagementController, gradeReview_controller_1.GradeReviewController],
        providers: [gradeComposition_service_1.GradeCompositionService, gradeManagement_service_1.GradeManagementService, gradeReview_service_1.GradeReviewService],
    })
], GradeModule);
//# sourceMappingURL=grade.module.js.map