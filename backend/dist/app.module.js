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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const teacher_module_1 = require("./teacher/teacher.module");
const student_module_1 = require("./student/student.module");
const admin_module_1 = require("./admin/admin.module");
const notification_module_1 = require("./notifications/notification.module");
const route_module_1 = require("./route/route.module");
const validateSchema_config_1 = require("./utils/config/validateSchema.config");
const database_module_1 = require("./database/database.module");
let AppModule = class AppModule {
    static { AppModule_1 = this; }
    configService;
    static port;
    constructor(configService) {
        this.configService = configService;
        AppModule_1.port = configService.get('PORT') || 8080;
    }
    static getBaseUrl(app) {
        let baseUrl = app.getHttpServer().address().address;
        if (baseUrl == '0.0.0.0' || baseUrl == '::') {
            return (baseUrl = 'localhost');
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: validateSchema_config_1.validateSchemaConfig,
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            mail_module_1.MailModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            teacher_module_1.TeacherModule,
            student_module_1.StudentModule,
            admin_module_1.AdminModule,
            notification_module_1.NotificationModule,
            passport_1.PassportModule.register({ session: true }),
            route_module_1.RouteModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map