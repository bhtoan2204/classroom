import { Module } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationSchema } from "src/utils/schema/notification.schema";
import { NotificationService } from "./notification.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { WsJwtStrategy } from "src/utils/strategies/ws-jwt.strategy";
import { UserSchema } from "src/utils/schema/user.schema";
import { NotificationController } from "./notification.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [NotificationController],
    providers: [NotificationGateway, NotificationService, WsJwtStrategy]
})
export class NotificationModule { }