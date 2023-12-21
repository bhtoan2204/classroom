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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../utils/guard/authenticate/jwt-auth.guard");
const role_guard_1 = require("../../utils/guard/authorize/role.guard");
const role_decorator_1 = require("../../utils/decorator/role.decorator");
const role_enum_1 = require("../../utils/enum/role.enum");
const accounts_service_1 = require("./accounts.service");
const searchFilter_dto_1 = require("./dto/searchFilter.dto");
const search_service_1 = require("../../elastic/search.service");
let AccountsController = class AccountsController {
    accountsService;
    searchService;
    constructor(accountsService, searchService) {
        this.accountsService = accountsService;
        this.searchService = searchService;
    }
    async getUsers(filter) {
        return this.accountsService.getUsers(filter);
    }
    async getTeachersPerPage() { }
    async getStudentPerPage() { }
    async getAccountDetail() { }
    async banOrUnbanAccount(params) {
        return this.accountsService.banAccount(params.userId);
    }
    async searchAccounts(params) {
        return this.searchService.search(params.text);
    }
    async elasticSearchAccounts() { }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Post)('/getUsers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get users' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchFilter_dto_1.SearchFilterDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Patch)('/banOrUnbanAccount/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Ban account' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: String }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "banOrUnbanAccount", null);
__decorate([
    (0, common_1.Get)('/elasticSearchAccounts/:text'),
    (0, swagger_1.ApiOperation)({ summary: 'Search accounts' }),
    (0, swagger_1.ApiParam)({ name: 'text', type: String }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "searchAccounts", null);
exports.AccountsController = AccountsController = __decorate([
    (0, swagger_1.ApiTags)('Accounts for Admin'),
    (0, common_1.Controller)('accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        search_service_1.SearchService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map