import { Model, Types } from "mongoose";
import { Request } from "express";
import { InvitationDocument } from "src/utils/schema/invitation.schema";
import { ClassDocument } from "src/utils/schema/class.schema";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
export declare class InvitationService {
    private readonly invitationRepository;
    private readonly classRepository;
    private readonly classUserRepository;
    private readonly userRepository;
    constructor(invitationRepository: Model<InvitationDocument>, classRepository: Model<ClassDocument>, classUserRepository: Model<ClassUserDocument>, userRepository: Model<UserDocument>);
    checkIsHost(user: User, classId: Types.ObjectId): Promise<any>;
    checkInClass(user: User, classId: Types.ObjectId): Promise<any>;
    getInvitations(user: User, classid: string, req: Request): Promise<any>;
    joinClass(user: User, classToken: string, classid: string): Promise<any>;
}
