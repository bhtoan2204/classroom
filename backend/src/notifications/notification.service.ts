import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "src/utils/schema/notification.schema";
import { NotificationDto } from "./dto/notification.dto";
import { User, UserDocument } from "src/utils/schema/user.schema";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private notificationRepository: Model<NotificationDocument>,
        @InjectModel(User.name) private userRepository: Model<UserDocument>,
    ) { }

    async getNotifications(currentUser: User) {
        const notifications = await this.notificationRepository.findOne({
            receiver_id: currentUser._id
        });
        if (!notifications) {
            return { notifications: [], unreadNotifications: 0 };
        }

        const unreadNotifications = notifications.notifications.reduce((count, notification) =>
            count + (notification.is_read ? 0 : 1), 0);

        return {
            notifications: notifications.notifications,
            unreadNotifications
        };
    }

    async markRead(currentUser: User, notificationId: string) {

    }

    async createNotification(currentUser: User, notification: NotificationDto) {
        const receiver = this.userRepository.find({ _id: new Types.ObjectId(notification.receiver_id) });
        if (!receiver) {
            throw new Error("Receiver not found");
        }
        const sender = await this.userRepository.findOne({ _id: new Types.ObjectId(currentUser._id) });
        if (!sender) {
            throw new Error("Sender not found");
        }

        const notificationDetail = {
            _id: new Types.ObjectId(),
            sender_id: currentUser._id,
            sender_avatar: sender.avatar,
            title: notification.title,
            content: notification.content,
            type: notification.type,
            url_id: notification.id,
            is_read: false
        }
        const newNotification = await this.notificationRepository.findOne({
            receiver_id: new Types.ObjectId(notification.receiver_id)
        });
        if (!newNotification) {
            const newNotification = await this.notificationRepository.create({
                receiver_id: new Types.ObjectId(notification.receiver_id),
                notifications: [notificationDetail]
            });
            return newNotification.notifications;
        }
        else {
            await this.notificationRepository.updateOne({
                receiver_id: new Types.ObjectId(notification.receiver_id)
            }, {
                $push: {
                    notifications: notificationDetail
                }
            });
            return newNotification.notifications;
        }
    }
}