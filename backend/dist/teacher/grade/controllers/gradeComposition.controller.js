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
exports.GradeCompositionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const createGradeComposition_dto_1 = require("../../dto/createGradeComposition.dto");
const gradeComposition_service_1 = require("../service/gradeComposition.service");
const jwt_auth_guard_1 = require("../../../utils/guard/authenticate/jwt-auth.guard");
const current_user_decorator_1 = require("../../../utils/decorator/current-user.decorator");
const role_guard_1 = require("../../../utils/guard/authorize/role.guard");
const role_enum_1 = require("../../../utils/enum/role.enum");
const role_decorator_1 = require("../../../utils/decorator/role.decorator");
const deleteGradeComposition_dto_1 = require("../../dto/deleteGradeComposition.dto");
const updateGradeComposition_dto_1 = require("../../dto/updateGradeComposition.dto");
const swapGradeComposition_dto_1 = require("../../dto/swapGradeComposition.dto");
let GradeCompositionController = class GradeCompositionController {
    gradeService;
    constructor(gradeService) {
        this.gradeService = gradeService;
    }
    async create(user, dto) {
        return this.gradeService.createGradeComposition(user, dto);
    }
    async getCurentGradeStructure(user, params) {
        return this.gradeService.getCurentGradeStructure(user, params.classId);
    }
    async removeGradeCompositions(user, dto) {
        return this.gradeService.removeGradeCompositions(user, dto);
    }
    async updateGradeCompositions(user, dto) {
        return this.gradeService.updateGradeCompositions(user, dto);
    }
    async swapGradeCompositions(user, dto) {
        return this.gradeService.swapGradeCompositions(user, dto);
    }
};
exports.GradeCompositionController = GradeCompositionController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('/create'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createGradeComposition_dto_1.CreateGradeCompositionDto]),
    __metadata("design:returntype", Promise)
], GradeCompositionController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiParam)({ name: 'classId', type: String }),
    (0, common_1.Get)('/getCurentGradeStructure/:classId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GradeCompositionController.prototype, "getCurentGradeStructure", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)('/removeGradeCompositions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deleteGradeComposition_dto_1.RemoveGradeCompositionDto]),
    __metadata("design:returntype", Promise)
], GradeCompositionController.prototype, "removeGradeCompositions", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/updateGradeCompositions'),
    (0, swagger_1.ApiOperation)({ summary: 'Update grade composition' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateGradeComposition_dto_1.UpdateGradeCompositionDto]),
    __metadata("design:returntype", Promise)
], GradeCompositionController.prototype, "updateGradeCompositions", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/swapGradeCompositions/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Swap grade composition' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, swapGradeComposition_dto_1.SwapGradeCompositionDto]),
    __metadata("design:returntype", Promise)
], GradeCompositionController.prototype, "swapGradeCompositions", null);
exports.GradeCompositionController = GradeCompositionController = __decorate([
    (0, swagger_1.ApiTags)('Grade Composition for Teacher'),
    (0, common_1.Controller)('gradeComposition'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TEACHER),
    __metadata("design:paramtypes", [gradeComposition_service_1.GradeCompositionService])
], GradeCompositionController);
//# sourceMappingURL=gradeComposition.controller.js.map