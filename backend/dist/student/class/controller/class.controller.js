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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("../service/class.service");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const role_enum_1 = require("../../../utils/enum/role.enum");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let ClassController = class ClassController {
    classService;
    constructor(classService) {
        this.classService = classService;
    }
    async joinClassByCode(user, params) {
        return this.classService.joinClassByClassId(user, params.classId);
    }
    async joinClassByLink(user, params) {
        return this.classService.joinClass(user, params.classToken, params.classId);
    }
    async getJoinedClasses(user) {
        return this.classService.getJoinedClasses(user);
    }
    async viewGradeStructure(user, params) {
        return this.classService.viewGradeStructure(user, params.classId);
    }
    async viewClassMembers(user, params) {
        return this.classService.viewClassMembers(user, params.classId);
    }
    async viewClassTeachers(user, params) {
        return this.classService.viewClassTeachers(user, params.classId);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('joinClassByCode/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Join class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "joinClassByCode", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/joinClassByLink/:classToken/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Join class' }),
    (0, swagger_1.ApiParam)({ name: 'classToken', type: String }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "joinClassByLink", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getJoinedClasses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get joined classes' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getJoinedClasses", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('getGradeStructure/:classId'),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Get grade structure' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "viewGradeStructure", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('viewClassMembers/:classId'),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'View class members' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "viewClassMembers", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('viewClassTeachers/:classId'),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'View class members' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "viewClassTeachers", null);
exports.ClassController = ClassController = __decorate([
    (0, swagger_1.ApiTags)('Class for student'),
    (0, common_1.Controller)('class'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.STUDENT),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map