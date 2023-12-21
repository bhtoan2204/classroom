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
exports.NotificationGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
const notification_dto_1 = require("./dto/notification.dto");
const ws_jwt_auth_guard_1 = require("../utils/guard/authenticate/ws-jwt-auth.guard");
const current_user_decorator_1 = require("../utils/decorator/current-user.decorator");
const user_schema_1 = require("../utils/schema/user.schema");
let NotificationGateway = class NotificationGateway {
    notificationService;
    jwtService;
    server;
    socketMap = new Map();
    constructor(notificationService, jwtService) {
        this.notificationService = notificationService;
        this.jwtService = jwtService;
    }
    async onModuleInit() {
        this.server.on('connection', async (socket) => {
            try {
                const token = socket.handshake.headers.authorization.split(' ')[1];
                if (!token)
                    throw new common_1.UnauthorizedException('Token not found');
                const payload = await this.jwtService.verifyAsync(token);
                if (!payload)
                    throw new common_1.UnauthorizedException('Token not found');
                const socketId = socket.id;
                this.socketMap.set(socketId, { socketId, ...payload });
                return socketId;
            }
            catch (error) {
                console.error('Error handling connection:', error.message);
                socket.disconnect(true);
            }
        });
    }
    async handleDisconnect(client) {
        const socketId = client.id;
        this.socketMap.delete(socketId);
    }
    async emitNotification(client, user, notification) {
        try {
            const notifications = await this.notificationService.createNotification(user._id, notification);
            const receiverSocket = Array.from(this.socketMap.values()).find((socket) => socket._id === notification.receiver_id);
            if (receiverSocket) {
                this.server.to(receiverSocket.socketId).emit('onNotification', notification);
            }
            else {
                return { message: 'Receiver not online' };
            }
        }
        catch (error) {
            client.disconnect(true);
            throw error;
        }
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newNotification'),
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, current_user_decorator_1.WsCurrentUser)()),
    __param(2, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, user_schema_1.User, notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "emitNotification", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'notification',
        cors: { origin: '*', },
    }),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        jwt_1.JwtService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map