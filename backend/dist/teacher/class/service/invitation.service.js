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
exports.InvitationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invitation_schema_1 = require("../../../utils/schema/invitation.schema");
const class_schema_1 = require("../../../utils/schema/class.schema");
const classUser_schema_1 = require("../../../utils/schema/classUser.schema");
const user_schema_1 = require("../../../utils/schema/user.schema");
let InvitationService = class InvitationService {
    invitationRepository;
    classRepository;
    classUserRepository;
    userRepository;
    constructor(invitationRepository, classRepository, classUserRepository, userRepository) {
        this.invitationRepository = invitationRepository;
        this.classRepository = classRepository;
        this.classUserRepository = classUserRepository;
        this.userRepository = userRepository;
    }
    async checkIsHost(user, classId) {
        const clazz = await this.classRepository.findOne({ _id: classId, host: user._id }).exec();
        if (!clazz) {
            return new common_1.HttpException('You are not the host of this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkInClass(user, classId) {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
            'teachers.user_id': user._id
        }).exec();
        if (classUser == null) {
            return new common_1.HttpException('You are not in this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getInvitations(user, classid, req) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkIsHost(user, classId);
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
    async joinClass(user, classToken, classid) {
        const classId = new mongoose_2.Types.ObjectId(classid);
        this.checkInClass(user, classId);
        const invitation = await this.invitationRepository.findOne({ class_id: classId, class_token: classToken }).exec();
        if (!invitation)
            return new common_1.NotFoundException("Invitation not found");
        const classUser = await this.classUserRepository.findOne({ class_id: classId });
        if (classUser.teachers.findIndex(teacher => teacher.user_id == user._id) == -1) {
            classUser.teachers.push({ user_id: user._id });
            await classUser.save();
            this.userRepository.findOneAndUpdate({ _id: user._id }, { $push: { classes: { class_id: classId } } }).exec();
            return {
                message: 'Join class successfully'
            };
        }
        else {
            return new common_1.HttpException('You are already in this class', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.InvitationService = InvitationService;
exports.InvitationService = InvitationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invitation_schema_1.Invitation.name)),
    __param(1, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(2, (0, mongoose_1.InjectModel)(classUser_schema_1.ClassUser.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], InvitationService);
//# sourceMappingURL=invitation.service.js.map