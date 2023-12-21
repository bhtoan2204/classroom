"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const swagger_1 = require("./utils/swagger");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        credentials: true
    });
    app.use(session({
        secret: configService.get('SESSION_SECRET'),
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
        },
    }));
    const logger = new common_1.Logger('Main');
    (0, swagger_1.setupSwagger)(app);
    app.use((0, helmet_1.default)());
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(configService.get('PORT') || 8080);
    const baseUrl = app_module_1.AppModule.getBaseUrl(app);
    const url = `http://${baseUrl}:${app_module_1.AppModule.port}`;
    logger.log(`API Documentation available at ${url}`);
}
bootstrap();
//# sourceMappingURL=main.js.map