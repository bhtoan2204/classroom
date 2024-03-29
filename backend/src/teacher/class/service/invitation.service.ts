import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Invitation, InvitationDocument } from "src/utils/schema/invitation.schema";
import { Class, ClassDocument } from "src/utils/schema/class.schema";
import { ClassUser, ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { SearchService } from "src/elastic/search.service";
import { InviteEmailDto } from "../dto/inviteEmail.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private readonly invitationRepository: Model<InvitationDocument>,
        @InjectModel(Class.name) private readonly classRepository: Model<ClassDocument>,
        @InjectModel(ClassUser.name) private readonly classUserRepository: Model<ClassUserDocument>,
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
        @Inject(SearchService) private readonly searchService: SearchService,
        @Inject(MailService) private readonly mailService: MailService,
    ) { }

    async checkIsHost(user: User, classId: Types.ObjectId): Promise<any> {
        const clazz = await this.classRepository.findOne({ _id: classId, host: user._id }).exec();
        if (!clazz) {
            return new HttpException('You are not the host of this class', HttpStatus.FORBIDDEN);
        }
    }

    async checkInClass(user: User, classId: Types.ObjectId): Promise<any> {
        const classUser = await this.classUserRepository.findOne(
            {
                class_id: classId,
                'teachers.user_id': user._id
            }
        ).exec();
        if (classUser == null) {
            return new HttpException('You are not in this class', HttpStatus.FORBIDDEN);
        }
    }

    async checkInClassForJoin(user: User, classId: Types.ObjectId): Promise<any> {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        });

        classUser.teachers.forEach(teacher => {
            if (teacher.user_id.equals(user._id)) {
                return new ForbiddenException('You are already in this class');
            }
        });
    }

    async getCodeInvitation(user: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);

        await this.checkIsHost(user, classId);

        const existingInvitation = await this.invitationRepository.findOne({ class_id: classId });

        if (!existingInvitation) return new NotFoundException("Invitation not found");

        return {
            class_token: existingInvitation.class_token
        };
    }

    async getInvitations(user: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);

        await this.checkIsHost(user, classId);

        const existingInvitation = await this.invitationRepository.findOne({ class_id: classId });

        if (existingInvitation) {
            existingInvitation.class_token = (Math.random() + 1).toString(36).substring(8);

            return await existingInvitation.save();
        }

        const newInvitation = new this.invitationRepository({
            class_id: classId,
            class_token: (Math.random() + 1).toString(36).substring(8),
        });

        await newInvitation.save();

        return {
            newInvitation
        };
    }

    async joinClass(user: User, classToken: string, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        try {
            this.checkInClassForJoin(user, classId);

            const invitation = await this.invitationRepository.findOne({ class_id: classId, class_token: classToken }).exec();

            if (!invitation) return new NotFoundException("Invitation not found");

            const classUser = await this.classUserRepository.findOne(
                { class_id: classId }
            )
            const clazz = await this.classRepository.findOne({ _id: classId }).exec();
            if (classUser.teachers.findIndex(teacher => teacher.user_id == user._id) == -1) {
                classUser.teachers.push({ user_id: user._id });
                await classUser.save();
                const updatedUser = await this.userRepository.findOneAndUpdate(
                    { _id: user._id },
                    {
                        $push: {
                            classes: {
                                class_id: classId,
                                class_name: clazz.className,
                                class_description: clazz.description,
                            }
                        }
                    }
                ).exec();
                await this.searchService.update(updatedUser);

                return {
                    message: 'Join class successfully'
                };
            }
            else {
                return new HttpException('You are already in this class', HttpStatus.FORBIDDEN);
            }
        }
        catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async sendEmailInvite(user: User, dto: InviteEmailDto): Promise<any> {
        const classId = new Types.ObjectId(dto.class_id);
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
            'teachers.user_id': user._id
        }).populate('class_id', 'className').exec();
        if (!classUser) {
            return new HttpException('You are not in this class', HttpStatus.FORBIDDEN);
        }
        const invitation = await this.invitationRepository.findOne({ class_id: classId, class_token: dto.class_token }).exec();
        if (!invitation) {
            return new NotFoundException("Invitation not found");
        }

        return await this.mailService.sendMailInvitation(dto.email, dto.class_id, dto.class_token);;
    }
}