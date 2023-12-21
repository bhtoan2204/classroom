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
exports.InvitationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const invitation_service_1 = require("../service/invitation.service");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_enum_1 = require("../../../utils/enum/role.enum");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
let InvitationController = class InvitationController {
    invitationService;
    constructor(invitationService) {
        this.invitationService = invitationService;
    }
    async getInvitations(user, params, req) {
        return this.invitationService.getInvitations(user, params.classId, req);
    }
    async joinClass(user, params) {
        return this.invitationService.joinClass(user, params.classToken, params.classId);
    }
};
exports.InvitationController = InvitationController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Get)('/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invitations of class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "getInvitations", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/joinClassByLink/:classToken/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Join class' }),
    (0, swagger_1.ApiParam)({ name: 'classToken', type: String }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "joinClass", null);
exports.InvitationController = InvitationController = __decorate([
    (0, swagger_1.ApiTags)('Invitation for Teacher'),
    (0, common_1.Controller)('invitation'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TEACHER),
    __metadata("design:paramtypes", [invitation_service_1.InvitationService])
], InvitationController);
//# sourceMappingURL=invitation.controller.js.map