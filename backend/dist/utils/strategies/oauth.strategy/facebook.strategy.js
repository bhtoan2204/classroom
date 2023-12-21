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
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const user_service_1 = require("../../../user/user.service");
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, "facebook") {
    userService;
    configService;
    constructor(userService, configService) {
        super({
            clientID: configService.get("FACEBOOK_CLIENT_ID"),
            clientSecret: configService.get("FACEBOOK_CLIENT_SECRET"),
            callbackURL: configService.get("FACEBOOK_CALLBACK_URL"),
            scope: ["email", "public_profile"],
            profileFields: ["id", "emails", "name", "picture.type(large)", "birthday"],
        });
        this.userService = userService;
        this.configService = configService;
    }
    async validate(accessToken, refreshToken, profile) {
        try {
            return this.userService.validateFacebookUser(profile);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Credentials are not valid');
        }
    }
};
exports.FacebookStrategy = FacebookStrategy;
exports.FacebookStrategy = FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], FacebookStrategy);
//# sourceMappingURL=facebook.strategy.js.map