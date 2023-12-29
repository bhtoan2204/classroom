import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { AbstractDocument } from "../../utils/database/abstract.schema";

export type NotificationDocument = Notification & Document;

enum NotificationType {
    GRADE_REVIEW = 'grade_review',
    MARK_FINAL = 'mark_final',
}

class NotificationDetail {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    sender_id: Types.ObjectId;

    @Prop({ required: true, nullable: true })
    sender_avatar: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, enum: NotificationType })
    type: string;

    @Prop({ required: true })
    url_id: string;

    @Prop({ default: false })
    is_read: boolean;
}

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class Notification extends AbstractDocument {
    @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
    receiver_id: Types.ObjectId;

    @Prop({ type: [NotificationDetail], default: [] })
    notifications: NotificationDetail[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);