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
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { ClassDocument } from "src/utils/schema/class.schema";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { InvitationDocument } from "src/utils/schema/invitation.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { UserGradeDocument } from "src/utils/schema/userGrade.schema";
export declare class ClassService {
    private readonly classRepository;
    private readonly classUserRepository;
    private readonly invitationRepository;
    private readonly userRepository;
    private readonly userGradeRepository;
    constructor(classRepository: Model<ClassDocument>, classUserRepository: Model<ClassUserDocument>, invitationRepository: Model<InvitationDocument>, userRepository: Model<UserDocument>, userGradeRepository: Model<UserGradeDocument>);
    checkInClassForView(user: User, classId: Types.ObjectId): Promise<any>;
    joinClass(user: User, classToken: string, classid: string): Promise<any>;
    joinClassByClassId(user: User, classid: string): Promise<any>;
    getJoinedClasses(user: User): {
        class_id: Types.ObjectId;
        class_name: string;
        class_description: string;
    }[];
    viewGradeStructure(user: User, classid: string): Promise<NotFoundException | {
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[] | ForbiddenException>;
    viewClassMembers(user: User, classid: string): Promise<NotFoundException | (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[] | ForbiddenException>;
    viewClassTeachers(user: User, classid: string): Promise<NotFoundException | (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[] | ForbiddenException>;
}
