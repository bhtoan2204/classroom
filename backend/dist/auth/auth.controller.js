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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("../utils/guard/authenticate/local-auth.guard");
const jwt_refresh_guard_1 = require("../utils/guard/authenticate/jwt-refresh.guard");
const current_user_decorator_1 = require("../utils/decorator/current-user.decorator");
const login_dto_1 = require("./dto/login.dto");
const google_auth_guard_1 = require("../utils/guard/authenticate/google-auth.guard");
const facebook_auth_guard_1 = require("../utils/guard/authenticate/facebook-auth.guard");
const config_1 = require("@nestjs/config");
const user_schema_1 = require("../utils/schema/user.schema");
let AuthController = class AuthController {
    authService;
    configService;
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async login(dto, currentUser) {
        return await this.authService.login(currentUser);
    }
    async refresh(currentUser) {
        return this.authService.refresh(currentUser);
    }
    async googleAuth(req) {
        return { message: "google login successfully" };
    }
    async googleAuthRedirect(currentUser, res) {
        const { accessToken, refreshToken } = await this.authService.login(currentUser);
        return res.redirect(`${this.configService.get('FRONTEND_URL')}/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }
    async facebookAuth(req) {
        return { message: "facebook login successfully" };
    }
    async facebookLoginRedirect(currentUser, res) {
        const { accessToken, refreshToken } = await this.authService.login(currentUser);
        return res.redirect(`${this.configService.get('FRONTEND_URL')}/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('local/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('facebook/login'),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)("facebook/callback"),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLoginRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map