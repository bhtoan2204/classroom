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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("../utils/schema/notification.schema");
const user_schema_1 = require("../utils/schema/user.schema");
let NotificationService = class NotificationService {
    notificationRepository;
    userRepository;
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async createNotification(currentUser, notification) {
        const receiver = this.userRepository.find({ _id: new mongoose_2.Types.ObjectId(notification.receiver_id) });
        if (!receiver) {
            throw new Error("Receiver not found");
        }
        const notificationDetail = {
            sender_id: currentUser._id,
            title: notification.title,
            content: notification.content,
            is_read: false
        };
        const newNotification = await this.notificationRepository.findOne({
            receiver_id: new mongoose_2.Types.ObjectId(notification.receiver_id)
        });
        if (!newNotification) {
            const newNotification = await this.notificationRepository.create({
                receiver_id: new mongoose_2.Types.ObjectId(notification.receiver_id),
                notifications: [notificationDetail]
            });
            return newNotification.notifications;
        }
        else {
            await this.notificationRepository.updateOne({
                receiver_id: new mongoose_2.Types.ObjectId(notification.receiver_id)
            }, {
                $push: {
                    notifications: notificationDetail
                }
            });
            return newNotification.notifications;
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NotificationService);
//# sourceMappingURL=notification.service.js.map