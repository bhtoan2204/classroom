import { OnModuleInit, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TokenPayload } from "src/auth/interface/tokenPayload.interface";
import { NotificationService } from "./notification.service";
import { NotificationDto } from "./dto/notification.dto";
import { WsJwtAuthGuard } from "src/utils/guard/authenticate/ws-jwt-auth.guard";
import { WsCurrentUser } from "src/utils/decorator/current-user.decorator";
import { User } from "src/utils/schema/user.schema";
import { MarkFinalNotificationDto } from "./dto/markFinal.dto";

export interface socketMetaPayload extends TokenPayload {
    socketId: string;
}

@WebSocketGateway({
    namespace: 'notification',
    cors: { origin: '*', },
})
export class NotificationGateway implements OnModuleInit {
    @WebSocketServer() server: Server;
    socketMap = new Map<string, string[]>();

    constructor(
        private readonly notificationService: NotificationService,
        private readonly jwtService: JwtService,) { }


    async onModuleInit() {
        this.server.on('connection', async (socket) => {
            try {
                const token = socket.handshake.headers.authorization.split(' ')[1];
                if (!token) throw new UnauthorizedException('Token not found');
                const payload = await this.jwtService.verifyAsync(token) as TokenPayload;
                if (!payload) throw new UnauthorizedException('Token not found');
                const socketId = socket.id;
                if (this.socketMap.has(payload._id)) {
                    const socketIds = this.socketMap.get(payload._id);
                    socketIds.push(socketId);
                    this.socketMap.set(payload._id, socketIds);
                }
                else {
                    this.socketMap.set(payload._id, [socketId]);
                }
                console.log('New Connection:', payload._id, socketId);
                return socketId;
            }
            catch (error) {
                console.error('Error handling connection:', error.message);
                socket.disconnect(true);
            }
        });
    }

    async handleDisconnect(client: Socket) {
        try {
            const token = client.handshake.headers.authorization.split(' ')[1];
            if (!token) throw new UnauthorizedException('Token not found');
            const payload = await this.jwtService.verifyAsync(token) as TokenPayload;
            if (!payload) throw new UnauthorizedException('Token not found');
            const socketId = client.id;
            if (this.socketMap.has(payload._id)) {
                const socketIds = this.socketMap.get(payload._id);
                const index = socketIds.indexOf(socketId);
                if (index > -1) {
                    socketIds.splice(index, 1);
                }
                this.socketMap.set(payload._id, socketIds);
            }
            console.log('Disconnected:', payload._id, socketId);
        }
        catch (error) {
            console.error('Error handling disconnection:', error.message);
            client.disconnect(true);
        }
    }

    @SubscribeMessage('newNotification')
    @UseGuards(WsJwtAuthGuard)
    async emitNotification(@ConnectedSocket() client: Socket, @WsCurrentUser() user: User, @MessageBody() notification: NotificationDto) {
        try {
            await this.notificationService.createNotification(user, notification);
            const receiverId = notification.receiver_id;
            const receiverSocketIds = this.socketMap.get(receiverId);
            if (!receiverSocketIds) {
                console.log('No socket found for user:', receiverId);
                return;
            }
            for (const socketId of receiverSocketIds) {
                client.to(socketId).emit('onNotification', notification);
            }
        }
        catch (error) {
            client.disconnect(true);
            throw error;
        }
    }

    @SubscribeMessage('multipleNotifications')
    @UseGuards(WsJwtAuthGuard)
    async emitMultipleNotifications(@ConnectedSocket() client: Socket, @WsCurrentUser() user: User, @MessageBody() notifications: MarkFinalNotificationDto) {
        try {
            const studentIds = await this.notificationService.markFinalNotifications(user, notifications);

            studentIds.forEach(async student => {
                const user_id = student.user_id.toString();
                const receiverSocketIds = this.socketMap.get(user_id);
                if (receiverSocketIds) {
                    for (const socketId of receiverSocketIds) {
                        client.to(socketId).emit('onNotification', notifications);
                    }
                }
            });
        }
        catch (error) {
            client.disconnect(true);
            throw error;
        }
    }
}