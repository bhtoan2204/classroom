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
exports.GradeReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gradeReview_service_1 = require("../service/gradeReview.service");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const role_enum_1 = require("../../../utils/enum/role.enum");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const user_schema_1 = require("../../../utils/schema/user.schema");
const commentGradeReview_dto_1 = require("../../dto/commentGradeReview.dto");
const markFinalDescistion_dto_1 = require("../../dto/markFinalDescistion.dto");
let GradeReviewController = class GradeReviewController {
    gradeService;
    constructor(gradeService) {
        this.gradeService = gradeService;
    }
    async viewGradeReview(currentUser, params) {
        return await this.gradeService.viewGradeReview(currentUser, params.classId);
    }
    async viewGradeReviewDetail(currentUser, params) {
        return await this.gradeService.viewGradeReviewDetail(currentUser, params.gradeReviewId);
    }
    async commentGradeReview(currentUser, dto) {
        return await this.gradeService.commentGradeReview(currentUser, dto);
    }
    async markFinalGrade(user, dto) {
        return await this.gradeService.markFinalGrade(user, dto);
    }
};
exports.GradeReviewController = GradeReviewController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getGradeReview/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get grade review' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], GradeReviewController.prototype, "viewGradeReview", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getGradeReviewDetail/:gradeReviewId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get grade review detail' }),
    (0, swagger_1.ApiParam)({ name: 'gradeReviewId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], GradeReviewController.prototype, "viewGradeReviewDetail", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/conmmentGradeReview'),
    (0, swagger_1.ApiOperation)({ summary: 'Comment grade review' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, commentGradeReview_dto_1.CommentGradeReviewDto]),
    __metadata("design:returntype", Promise)
], GradeReviewController.prototype, "commentGradeReview", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/markFinalGrade'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark final grade' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, markFinalDescistion_dto_1.MarkFinalDescistionDto]),
    __metadata("design:returntype", Promise)
], GradeReviewController.prototype, "markFinalGrade", null);
exports.GradeReviewController = GradeReviewController = __decorate([
    (0, swagger_1.ApiTags)('Grade Review for Teacher'),
    (0, common_1.Controller)('gradeReview'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TEACHER),
    __metadata("design:paramtypes", [gradeReview_service_1.GradeReviewService])
], GradeReviewController);
//# sourceMappingURL=gradeReview.controller.js.map