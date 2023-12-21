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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const loginType_enum_1 = require("../utils/enum/loginType.enum");
const user_schema_1 = require("../utils/schema/user.schema");
const registerOtp_schema_1 = require("../utils/schema/registerOtp.schema");
const resetOtp_schema_1 = require("../utils/schema/resetOtp.schema");
const search_service_1 = require("../elastic/search.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let UserService = class UserService {
    userRepository;
    registerOtpRepository;
    resetOtpRepository;
    mailService;
    searchService;
    constructor(userRepository, registerOtpRepository, resetOtpRepository, mailService, searchService) {
        this.userRepository = userRepository;
        this.registerOtpRepository = registerOtpRepository;
        this.resetOtpRepository = resetOtpRepository;
        this.mailService = mailService;
        this.searchService = searchService;
    }
    async create(createUserDto) {
        try {
            await this.validateCreateUser(createUserDto.email);
            const otpRecord = await this.registerOtpRepository.findOne({ email: createUserDto.email }).exec();
            if (!otpRecord)
                throw new Error("OTP not found");
            if (otpRecord.otp !== createUserDto.otp)
                throw new Error("OTP not match");
            const hashPassword = await bcrypt.hash(createUserDto.password, 10);
            const newUser = new this.userRepository({
                email: createUserDto.email,
                password: hashPassword,
                role: 'null',
                fullname: createUserDto.fullname,
                birthday: new Date(),
                login_type: loginType_enum_1.LoginType.LOCAL,
            });
            await newUser.save();
            await this.searchService.indexUser(newUser);
            await this.registerOtpRepository.deleteOne({ email: createUserDto.email }).exec();
            return {
                user_info: {
                    user_id: newUser._id,
                    email: newUser.email,
                },
                message: 'User created successfully',
                http_code: common_1.HttpStatus.CREATED,
            };
        }
        catch (err) {
            throw new Error(err.message, err.http_code || 500);
        }
    }
    async validateCreateUser(email) {
        let checkEmailUser;
        try {
            checkEmailUser = await this.userRepository.findOne({ email, login_type: 'local' }).exec();
        }
        catch (err) {
            throw new mongoose_2.MongooseError(err);
        }
        if (checkEmailUser) {
            throw new mongoose_2.MongooseError('Email already exists');
        }
    }
    async getUserById(entryId) {
        return await this.userRepository.findOne({ _id: entryId })
            .select('-password')
            .select('-refreshToken')
            .select('-createAt')
            .select('-updatedAt')
            .select('-__v')
            .select('-id')
            .exec();
    }
    async validateLocalUser(email, password) {
        const user = await this.userRepository.findOne({ email, login_type: 'local' }).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('Credentials are not valid.');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new common_1.UnauthorizedException('Credentials are not valid.');
        }
        if (user.is_ban === true) {
            throw new common_1.UnauthorizedException('Your account has been banned.');
        }
        else {
            return user;
        }
        ;
    }
    async checkExistForReset(email) {
        const user = await this.userRepository.findOne({ email }).exec();
        if (!user)
            throw new common_1.HttpException('Email Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async checkExistLocal(email) {
        const user = await this.userRepository.findOne({ email, login_type: 'local' }).exec();
        if (user)
            throw new common_1.HttpException('This Email is already created', common_1.HttpStatus.CONFLICT);
    }
    async editProfile(_id, dto) {
        try {
            const user = await this.userRepository.findOneAndUpdate({ _id }, {
                fullname: dto.fullname,
                birthday: dto.birthday
            }).exec();
            user.fullname = dto.fullname;
            user.birthday = dto.birthday;
            await this.searchService.update(user);
            return { message: "Update profile successfully" };
        }
        catch (err) {
            throw err;
        }
    }
    async uploadAvatar(_id, fileName) {
        try {
            await this.userRepository.findOneAndUpdate({ _id }, {
                avatar: `https://storageclassroom.blob.core.windows.net/upload-file/${fileName}`,
            }, { new: true }).exec();
            return {
                message: "Upload avatar successfully",
                avatar: `https://storageclassroom.blob.core.windows.net/upload-file/${fileName}`
            };
        }
        catch (err) {
            throw err;
        }
    }
    async updateRefresh(_id, refreshToken) {
        try {
            await this.userRepository.findOneAndUpdate({ _id }, { refreshToken }, { new: true }).exec();
        }
        catch (err) {
            throw err;
        }
    }
    async softDeleteRefresh(_id) {
        try {
            await this.userRepository.findOneAndUpdate({ _id }, { refreshToken: null }, { new: true }).exec();
        }
        catch (err) {
            throw err;
        }
    }
    async validateGoogleUser(details) {
        const user = await this.userRepository.findOne({
            email: details._json.email,
            login_type: loginType_enum_1.LoginType.GOOGLE
        }).exec();
        if (user) {
            if (user.is_ban === true) {
                throw new common_1.UnauthorizedException('Your account has been banned.');
            }
            return user;
        }
        else {
            const newUser = new this.userRepository({
                email: details._json.email,
                password: crypto.randomBytes(Math.ceil(20 / 2)).toString('hex').slice(0, 20),
                role: 'null',
                fullname: details._json.family_name + ' ' + details._json.given_name,
                avatar: details._json.picture,
                birthday: new Date(),
                login_type: loginType_enum_1.LoginType.GOOGLE,
            });
            await this.searchService.indexUser(newUser);
            return await newUser.save();
        }
    }
    async validateFacebookUser(details) {
        const user = await this.userRepository.findOne({
            email: details._json.email,
            login_type: loginType_enum_1.LoginType.FACEBOOK
        }).exec();
        if (user) {
            if (user.is_ban === true) {
                throw new common_1.UnauthorizedException('Your account has been banned.');
            }
            return user;
        }
        else {
            const newUser = new this.userRepository({
                email: details._json.email,
                password: crypto.randomBytes(Math.ceil(20 / 2)).toString('hex').slice(0, 20),
                role: 'null',
                fullname: details._json.first_name + ' ' + details._json.last_name,
                avatar: `https://graph.facebook.com/${details._json.id}/picture?type=large`,
                birthday: new Date(),
                login_type: loginType_enum_1.LoginType.FACEBOOK,
            });
            await this.searchService.indexUser(newUser);
            return await newUser.save();
        }
    }
    async findUserById(_id) {
        return await this.userRepository.findOne({ _id }).exec();
    }
    async updatePassword(_id, dto) {
        if (dto.password !== dto.rewrite_password) {
            throw new Error('Two password are not match');
        }
        const hashPassword = await bcrypt.hash(dto.password, 10);
        await this.userRepository.findOneAndUpdate({ _id }, {
            password: hashPassword,
        }).exec();
        return { message: "Update password successfully" };
    }
    async sendRegisterOTP(email) {
        try {
            await this.checkExistLocal(email);
            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpRecord = await this.registerOtpRepository.findOne({ email }).exec();
            if (otpRecord) {
                otpRecord.otp = otp;
                await otpRecord.save();
            }
            else {
                const newOtp = new this.registerOtpRepository({
                    email,
                    otp,
                });
                await newOtp.save();
            }
            const title = "Register your account";
            await this.mailService.sendOtp(email, otp, title);
            return { message: "OTP sent" };
        }
        catch (err) {
            throw new common_1.ConflictException(err);
        }
    }
    async sendResetOTP(email) {
        try {
            await this.checkExistForReset(email);
            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpRecord = await this.resetOtpRepository.findOne({ email }).exec();
            if (otpRecord) {
                otpRecord.otp = otp;
                await otpRecord.save();
            }
            else {
                const newOtp = new this.resetOtpRepository({
                    email,
                    otp,
                });
                await newOtp.save();
            }
            const title = "Reset your password";
            await this.mailService.sendOtp(email, otp, title);
            return { message: "OTP sent" };
        }
        catch (err) {
            throw new common_1.ConflictException(err);
        }
    }
    async resetPassword(dto) {
        const otpRecord = await this.resetOtpRepository.findOne({ email: dto.email }).exec();
        if (otpRecord.otp !== dto.otp)
            throw new common_1.ConflictException("OTP not match");
        if (dto.password !== dto.rewrite_password)
            throw new common_1.ConflictException("Password and confirm password not match");
        try {
            await this.userRepository.findOneAndUpdate({ email: dto.email, login_type: loginType_enum_1.LoginType.LOCAL }, { password: await bcrypt.hash(dto.password, 10) }).exec();
            await this.resetOtpRepository.deleteOne({ email: dto.email }).exec();
            return { message: "Reset password successfully" };
        }
        catch (err) {
            throw new common_1.ConflictException({ err, status: common_1.HttpStatus.CONFLICT });
        }
    }
    async assignRole(user, role) {
        try {
            if (user.role !== 'null')
                throw new common_1.ConflictException("User already has role");
            const updatedUser = await this.userRepository.findOneAndUpdate({ _id: user._id }, { role }).exec();
            await this.searchService.update(updatedUser);
            return { message: "Assign role successfully" };
        }
        catch (err) {
            throw new common_1.ConflictException(err);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(registerOtp_schema_1.RegisterOtp.name)),
    __param(2, (0, mongoose_1.InjectModel)(resetOtp_schema_1.ResetOtp.name)),
    __param(3, (0, common_1.Inject)(mail_service_1.MailService)),
    __param(4, (0, common_1.Inject)(search_service_1.SearchService)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mail_service_1.MailService,
        search_service_1.SearchService])
], UserService);
//# sourceMappingURL=user.service.js.map