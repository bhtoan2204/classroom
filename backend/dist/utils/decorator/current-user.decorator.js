"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsCurrentUser = exports.getWsCurrentUserByContext = exports.CurrentUser = exports.getCurrentUserByContext = void 0;
const common_1 = require("@nestjs/common");
const getCurrentUserByContext = (context) => {
    return context.switchToHttp().getRequest().user;
};
exports.getCurrentUserByContext = getCurrentUserByContext;
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, context) => (0, exports.getCurrentUserByContext)(context));
const getWsCurrentUserByContext = (context) => {
    return context.switchToWs().getData().user;
};
exports.getWsCurrentUserByContext = getWsCurrentUserByContext;
exports.WsCurrentUser = (0, common_1.createParamDecorator)((_data, context) => (0, exports.getCurrentUserByContext)(context));
//# sourceMappingURL=current-user.decorator.js.map