"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mongoose_1 = require("@nestjs/mongoose");
const mail_module_1 = require("../mail/mail.module");
const storage_service_1 = require("../storage/storage.service");
const user_schema_1 = require("../utils/schema/user.schema");
const registerOtp_schema_1 = require("../utils/schema/registerOtp.schema");
const resetOtp_schema_1 = require("../utils/schema/resetOtp.schema");
const search_service_1 = require("../elastic/search.service");
const search_module_1 = require("../elastic/search.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'RegisterOtp', schema: registerOtp_schema_1.RegisterOtpSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'ResetOtp', schema: resetOtp_schema_1.ResetOtpSchema }]),
            mail_module_1.MailModule,
            search_module_1.SearchModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, storage_service_1.StorageService, search_service_1.SearchService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map