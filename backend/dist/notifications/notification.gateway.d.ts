import { OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";
import { TokenPayload } from "src/auth/interface/tokenPayload.interface";
import { NotificationService } from "./notification.service";
import { NotificationDto } from "./dto/notification.dto";
import { User } from "src/utils/schema/user.schema";
export interface socketMetaPayload extends TokenPayload {
    socketId: string;
}
export declare class NotificationGateway implements OnModuleInit {
    private readonly notificationService;
    private readonly jwtService;
    server: Server;
    socketMap: Map<string, socketMetaPayload>;
    constructor(notificationService: NotificationService, jwtService: JwtService);
    onModuleInit(): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    emitNotification(client: Socket, user: User, notification: NotificationDto): Promise<{
        message: string;
    }>;
}
