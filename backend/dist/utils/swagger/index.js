"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("./constants");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(constants_1.SWAGGER_API_NAME)
        .setDescription(constants_1.SWAGGER_API_DESCRIPTION)
        .setVersion(constants_1.SWAGGER_API_CURRENT_VERSION)
        .addBearerAuth()
        .build();
    const options = {
        ignoreGlobalPrefix: true,
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup(constants_1.SWAGGER_API_ROOT, app, document, {
        customfavIcon: 'https://cdn-icons-png.flaticon.com/512/10095/10095455.png',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
        ],
    });
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=index.js.map