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
const swagger_1 = require("@nestjs/swagger");
const class_service_1 = require("../service/class.service");
const createClass_dto_1 = require("../dto/createClass.dto");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const role_enum_1 = require("../../../utils/enum/role.enum");
let ClassController = class ClassController {
    classService;
    constructor(classService) {
        this.classService = classService;
    }
    async create(host, dto) {
        return this.classService.create(host, dto);
    }
    async getAll(host) {
        return this.classService.getAll(host);
    }
    async getJoinedClasses(host) {
        return this.classService.getJoinedClasses(host);
    }
    async getClassDetail(host, params) {
        return this.classService.getClassDetail(host, params.classId);
    }
    async deleteClass(host, params) {
        return this.classService.deleteClass(host, params.classId);
    }
    async getTeacher(user, params) {
        return this.classService.getTeachers(user, params.classId);
    }
    async getStudents(user, params) {
        return this.classService.getStudents(user, params.classId);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Class' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createClass_dto_1.CreateClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getJoinedClasses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getJoinedClasses", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/classDetail/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get class detail' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassDetail", null);
__decorate([
    (0, common_1.Delete)('/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteClass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getTeachers/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get teacher of class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getTeacher", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/getStudents/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get students of class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getStudents", null);
exports.ClassController = ClassController = __decorate([
    (0, swagger_1.ApiTags)('Class for Teacher'),
    (0, common_1.Controller)('class'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TEACHER),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map