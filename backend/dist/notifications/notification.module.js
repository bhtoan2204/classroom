"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_gateway_1 = require("./notification.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const notification_schema_1 = require("../utils/schema/notification.schema");
const notification_service_1 = require("./notification.service");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const ws_jwt_strategy_1 = require("../utils/strategies/ws-jwt.strategy");
const user_schema_1 = require("../utils/schema/user.schema");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Notification', schema: notification_schema_1.NotificationSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        providers: [notification_gateway_1.NotificationGateway, notification_service_1.NotificationService, ws_jwt_strategy_1.WsJwtStrategy]
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map