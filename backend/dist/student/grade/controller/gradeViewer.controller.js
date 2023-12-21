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
exports.GradeViewerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const role_enum_1 = require("../../../utils/enum/role.enum");
const gradeViewer_service_1 = require("../service/gradeViewer.service");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const requestReview_dto_1 = require("../../dto/requestReview.dto");
const postComment_dto_1 = require("../../dto/postComment.dto");
let GradeViewerController = class GradeViewerController {
    gradeViewerService;
    constructor(gradeViewerService) {
        this.gradeViewerService = gradeViewerService;
    }
    async viewGradeCompostitions(user, params) {
        return this.gradeViewerService.viewGradeCompostitions(user, params.classId);
    }
    async requestReview(user, dto) {
        return this.gradeViewerService.requestReview(user, dto);
    }
    async viewGradeReview(user, params) {
        return this.gradeViewerService.viewGradeReview(user, params.reviewId);
    }
    async postAComment(user, dto) {
        return this.gradeViewerService.postAComment(user, dto);
    }
};
exports.GradeViewerController = GradeViewerController;
__decorate([
    (0, common_1.Get)('viewGradeCompostitions/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'View grade compostitions' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeViewerController.prototype, "viewGradeCompostitions", null);
__decorate([
    (0, common_1.Post)('requestReview'),
    (0, swagger_1.ApiOperation)({ summary: 'Request a review' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, requestReview_dto_1.RequestReviewDto]),
    __metadata("design:returntype", Promise)
], GradeViewerController.prototype, "requestReview", null);
__decorate([
    (0, common_1.Get)('viewGradeReview/:reviewId'),
    (0, swagger_1.ApiOperation)({ summary: 'View grade review' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeViewerController.prototype, "viewGradeReview", null);
__decorate([
    (0, common_1.Post)('postAComment'),
    (0, swagger_1.ApiOperation)({ summary: 'Let a comment' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, postComment_dto_1.PostCommentDto]),
    __metadata("design:returntype", Promise)
], GradeViewerController.prototype, "postAComment", null);
exports.GradeViewerController = GradeViewerController = __decorate([
    (0, swagger_1.ApiTags)('Grade for student'),
    (0, common_1.Controller)('gradeViewer'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.STUDENT),
    __metadata("design:paramtypes", [gradeViewer_service_1.GradeViewerService])
], GradeViewerController);
//# sourceMappingURL=gradeViewer.controller.js.map