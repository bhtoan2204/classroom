import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "src/utils/schema/notification.schema";
import { NotificationDto } from "./dto/notification.dto";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { MarkFinalNotificationDto } from "./dto/markFinal.dto";
import { ClassUser } from "src/utils/schema/classUser.schema";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private notificationRepository: Model<NotificationDocument>,
        @InjectModel(User.name) private userRepository: Model<UserDocument>,
        @InjectModel(ClassUser.name) private classUserRepository: Model<ClassUser>,
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
        const notification = await this.notificationRepository.findOne({
            receiver_id: currentUser._id
        });
        if (!notification) {
            throw new Error("Notification not found");
        }
        const notificationIndex = notification.notifications.findIndex(notification => notification._id.toString() === notificationId);

        if (notificationIndex === -1) {
            throw new Error("Notification not found");
        }

        await this.notificationRepository.updateOne({
            receiver_id: currentUser._id
        }, {
            $set: {
                [`notifications.${notificationIndex}.is_read`]: true
            }
        });

        return notification.notifications;
    }

    async createNotification(currentUser: User, notification: NotificationDto) {
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
            type: 'grade_review',
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

    async markFinalNotifications(currentUser: User, notification: MarkFinalNotificationDto) {
        const sender = await this.userRepository.findOne({ _id: currentUser._id });

        const classUser = await this.classUserRepository.findOne({ class_id: new Types.ObjectId(notification.class_id) });
        if (!classUser) {
            throw new Error("Class not found");
        }
        const studentIds = classUser.students;

        const notificationDetail = {
            _id: new Types.ObjectId(),
            sender_id: currentUser._id,
            sender_avatar: sender.avatar,
            title: notification.title,
            content: notification.content,
            type: 'mark_final',
            url_id: notification.id,
            is_read: false
        };

        studentIds.forEach(async student => {
            const newNotification = await this.notificationRepository.findOne({
                receiver_id: new Types.ObjectId(student.user_id)
            });
            if (!newNotification) {
                await this.notificationRepository.create({
                    receiver_id: new Types.ObjectId(student.user_id),
                    notifications: [notificationDetail]
                });
            }
            else {
                await this.notificationRepository.updateOne({
                    receiver_id: new Types.ObjectId(student.user_id)
                }, {
                    $push: {
                        notifications: notificationDetail
                    }
                });
            }
        });

        return studentIds;
    }
}