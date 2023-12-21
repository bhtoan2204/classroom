/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/createUser.dto';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { ChangePassworDto } from './dto/changePassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { User, UserDocument } from 'src/utils/schema/user.schema';
import { RegisterOtpDocument } from 'src/utils/schema/registerOtp.schema';
import { ResetOtpDocument } from 'src/utils/schema/resetOtp.schema';
import { SearchService } from 'src/elastic/search.service';
export declare class UserService {
    private userRepository;
    private registerOtpRepository;
    private resetOtpRepository;
    private readonly mailService;
    private readonly searchService;
    constructor(userRepository: Model<UserDocument>, registerOtpRepository: Model<RegisterOtpDocument>, resetOtpRepository: Model<ResetOtpDocument>, mailService: MailService, searchService: SearchService);
    create(createUserDto: CreateUserDto): Promise<any>;
    validateCreateUser(email: string): Promise<void>;
    getUserById(entryId: any): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    validateLocalUser(email: string, password: string): Promise<any>;
    checkExistForReset(email: string): Promise<any>;
    checkExistLocal(email: any): Promise<any>;
    editProfile(_id: any, dto: any): Promise<any>;
    uploadAvatar(_id: any, fileName: string): Promise<any>;
    updateRefresh(_id: any, refreshToken: string): Promise<any>;
    softDeleteRefresh(_id: any): Promise<any>;
    validateGoogleUser(details: any): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    validateFacebookUser(details: any): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserById(_id: any): Promise<User>;
    updatePassword(_id: any, dto: ChangePassworDto): Promise<{
        message: string;
    }>;
    sendRegisterOTP(email: string): Promise<{
        message: string;
    }>;
    sendResetOTP(email: string): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    assignRole(user: User, role: string): Promise<{
        message: string;
    }>;
}
