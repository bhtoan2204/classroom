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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const createUser_dto_1 = require("./dto/createUser.dto");
const jwt_auth_guard_1 = require("../utils/guard/authenticate/jwt-auth.guard");
const current_user_decorator_1 = require("../utils/decorator/current-user.decorator");
const editProfile_dto_1 = require("./dto/editProfile.dto");
const changePassword_dto_1 = require("./dto/changePassword.dto");
const platform_express_1 = require("@nestjs/platform-express");
const storage_service_1 = require("../storage/storage.service");
const resetPassword_dto_1 = require("./dto/resetPassword.dto");
const sendOtp_dto_1 = require("./dto/sendOtp.dto");
const role_dto_1 = require("./dto/role.dto");
const user_schema_1 = require("../utils/schema/user.schema");
let UserController = class UserController {
    usersService;
    storageService;
    constructor(usersService, storageService) {
        this.usersService = usersService;
        this.storageService = storageService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async getProfile(request) {
        const { _id } = request.user;
        return (await this.usersService.getUserById(_id)).toJSON();
    }
    async editProfile(user, dto, body) {
        const { _id } = user;
        return this.usersService.editProfile(_id, dto);
    }
    async uploadAvatar(user, file) {
        const { _id } = user;
        const fileName = await this.storageService.uploadImage(file);
        return this.usersService.uploadAvatar(_id, fileName);
    }
    async readImage(res, filename) {
        const data = await this.storageService.readStream(filename);
        return data.pipe(res);
    }
    async changePassword(user, dto) {
        const { _id } = user;
        return this.usersService.updatePassword(_id, dto);
    }
    async sendRegisterOTP(dto) {
        return this.usersService.sendRegisterOTP(dto.email);
    }
    async sendOTP(dto) {
        return this.usersService.sendResetOTP(dto.email);
    }
    async resetPassword(dto) {
        return this.usersService.resetPassword(dto);
    }
    async assignRole(user, dto) {
        return this.usersService.assignRole(user, dto.role);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Patch)('/edit_profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, editProfile_dto_1.EditProfileDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Patch)('/upload_avatar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        fileFilter: (req, file, callback) => {
            if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
                return callback(null, true);
            }
            return callback(new Error('Only image files are allowed!'), false);
        },
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Get)('/get_avatar'),
    (0, common_1.Header)('Content-Type', 'image/webp'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readImage", null);
__decorate([
    (0, common_1.Patch)('/change_password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, changePassword_dto_1.ChangePassworDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/send_registerOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendOtp_dto_1.sendOTPDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendRegisterOTP", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('send_resetOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendOtp_dto_1.sendOTPDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendOTP", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('reset_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/assign-role'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assignRole", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User and Profile'),
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        storage_service_1.StorageService])
], UserController);
//# sourceMappingURL=user.controller.js.map