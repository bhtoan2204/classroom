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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    configService;
    jwtService;
    userService;
    constructor(configService, jwtService, userService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(user) {
        const { accessToken, refreshToken } = await this.getToken(user._id, user.role);
        try {
            this.userService.updateRefresh(user._id, refreshToken);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (err) {
            throw new common_1.ConflictException(err);
        }
    }
    async getToken(userId, role) {
        const jwtPayload = {
            _id: userId,
            role,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1d',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get('JWT_SECRET_REFRESH'),
                expiresIn: '1d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async refresh(user) {
        const { accessToken, refreshToken } = await this.getToken(user._id, user.role);
        try {
            await this.userService.updateRefresh(user._id, refreshToken);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                await this.userService.softDeleteRefresh(user._id);
                throw new common_1.UnauthorizedException();
            }
            else {
                throw err;
            }
        }
        ;
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map