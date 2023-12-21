/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { EditProfileDTO } from './dto/editProfile.dto';
import { ChangePassworDto } from './dto/changePassword.dto';
import { StorageService } from '../storage/storage.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { sendOTPDto } from './dto/sendOtp.dto';
import { RoleDto } from './dto/role.dto';
import { User } from 'src/utils/schema/user.schema';
export declare class UserController {
    private readonly usersService;
    private readonly storageService;
    constructor(usersService: UserService, storageService: StorageService);
    create(createUserDto: CreateUserDto): Promise<any>;
    getProfile(request: any): Promise<import("mongoose").FlattenMaps<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    editProfile(user: User, dto: EditProfileDTO, body: {
        name: string;
    }): Promise<any>;
    uploadAvatar(user: User, file: Express.Multer.File): Promise<any>;
    readImage(res: any, filename: any): Promise<any>;
    changePassword(user: User, dto: ChangePassworDto): Promise<{
        message: string;
    }>;
    sendRegisterOTP(dto: sendOTPDto): Promise<{
        message: string;
    }>;
    sendOTP(dto: sendOTPDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    assignRole(user: User, dto: RoleDto): Promise<{
        message: string;
    }>;
}
