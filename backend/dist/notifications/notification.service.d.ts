import { Model, Types } from "mongoose";
import { NotificationDocument } from "src/utils/schema/notification.schema";
import { NotificationDto } from "./dto/notification.dto";
import { UserDocument } from "src/utils/schema/user.schema";
export declare class NotificationService {
    private notificationRepository;
    private userRepository;
    constructor(notificationRepository: Model<NotificationDocument>, userRepository: Model<UserDocument>);
    createNotification(currentUser: any, notification: NotificationDto): Promise<{
        sender_id: Types.ObjectId;
        title: string;
        content: string;
        is_read: boolean;
    }[]>;
}
