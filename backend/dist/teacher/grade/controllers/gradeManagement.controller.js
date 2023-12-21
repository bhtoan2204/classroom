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
exports.GradeManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const gradeManagement_service_1 = require("../service/gradeManagement.service");
const platform_express_1 = require("@nestjs/platform-express");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const role_enum_1 = require("../../../utils/enum/role.enum");
const storage_service_1 = require("../../../storage/storage.service");
const inputGrade_dto_1 = require("../../dto/inputGrade.dto");
const mapStudentId_dto_1 = require("../../dto/mapStudentId.dto");
let GradeManagementController = class GradeManagementController {
    gradeManagementService;
    storageService;
    constructor(gradeManagementService, storageService) {
        this.gradeManagementService = gradeManagementService;
        this.storageService = storageService;
    }
    async downloadListStudentTemplate(user, params, res) {
        const result = await this.gradeManagementService.downloadListStudentTemplate(user, params.classId);
        res.download(`${result}`);
    }
    async uploadListStudentCsv(user, params, file) {
        return this.gradeManagementService.uploadListStudentCsv(user, params.classId, file);
    }
    async showStudentsListxGradesBoard(user, params) {
        return this.gradeManagementService.showStudentsListxGradesBoard(user, params.classId);
    }
    async mapStudentId(user, dto) {
        return this.gradeManagementService.mapStudentId(user, dto);
    }
    async inputGradeForStudentAtSpecificAssignment(user, dto) {
        return this.gradeManagementService.inputGradeForStudent(user, dto);
    }
    async downloadTemplateByAssignment(user, params, res) {
        const result = await this.gradeManagementService.downloadTemplateByAssignment(user, params.classId, params.gradeCompo_name);
        res.download(`${result}`);
    }
    async uploadGradeByAssignment(user, params) { }
    async showTotalGradeColumn(user, params) { }
    async exportGradeBoard(user, params) {
        const result = await this.gradeManagementService.exportGradeBoard(user, params.classId, params.gradeCompo_name);
        return result;
    }
    async markGradeAsFinal(user, params) {
        return this.gradeManagementService.markGradeCompositionAsFinal(user, params.gradeCompositionName, params.classId);
    }
};
exports.GradeManagementController = GradeManagementController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, common_1.Get)('/downloadListStudentTemplate/:classId/'),
    (0, common_1.Header)('Content-Type', 'text/xlsx'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "downloadListStudentTemplate", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('listStudent', {
        fileFilter: (req, file, callback) => {
            if (file.originalname.match(/\.(csv|xlsx)$/)) {
                return callback(null, true);
            }
            return callback(new Error('Only CSV or XLSX files are allowed!'), false);
        },
    })),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload list of students in a class' }),
    (0, common_1.Post)('/uploadListStudent/:classId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "uploadListStudentCsv", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Show grade composition of a class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, common_1.Get)('/showGradeOfStudent/:classId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "showStudentsListxGradesBoard", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Map StudentId of a student in class' }),
    (0, common_1.Patch)('/mapStudentId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mapStudentId_dto_1.MapStudentIdDto]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "mapStudentId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Input grade composition of a student' }),
    (0, common_1.Patch)('/inputGradeForStudentAtSpecificAssignment'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inputGrade_dto_1.InputGradeDto]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "inputGradeForStudentAtSpecificAssignment", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Show grade composition of a class' }),
    (0, common_1.Get)('/downloadTemplateByAssignment/:classId/:gradeCompo_name'),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, swagger_1.ApiParam)({ name: 'gradeCompo_name', type: String }),
    (0, common_1.Header)('Content-Type', 'text/xlsx'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "downloadTemplateByAssignment", null);
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "uploadGradeByAssignment", null);
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "showTotalGradeColumn", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, common_1.Get)('/exportGradeBoard/:classId/:gradeCompo_name'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "exportGradeBoard", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/markGradeAsFinal/:classId/:gradeCompositionName'),
    (0, swagger_1.ApiParam)({ name: 'gradeCompositionName', type: String }),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeManagementController.prototype, "markGradeAsFinal", null);
exports.GradeManagementController = GradeManagementController = __decorate([
    (0, swagger_1.ApiTags)('Grade Management for Teacher'),
    (0, common_1.Controller)('gradeManagement'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TEACHER),
    __metadata("design:paramtypes", [gradeManagement_service_1.GradeManagementService,
        storage_service_1.StorageService])
], GradeManagementController);
//# sourceMappingURL=gradeManagement.controller.js.map