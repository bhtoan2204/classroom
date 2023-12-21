"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const config_1 = require("@nestjs/config");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            elasticsearch_1.ElasticsearchModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const isProduction = configService.get('NODE_ENV') === 'production';
                    if (isProduction) {
                        return {
                            cloud: {
                                id: configService.get('ELASTICSEARCH_NODE'),
                            },
                            auth: {
                                username: configService.get('ELASTICSEARCH_USERNAME'),
                                password: configService.get('ELASTICSEARCH_PASSWORD'),
                            },
                        };
                    }
                    else {
                        return {
                            node: configService.get('ELASTICSEARCH_NODE'),
                            auth: {
                                username: configService.get('ELASTICSEARCH_USERNAME'),
                                password: configService.get('ELASTICSEARCH_PASSWORD'),
                            },
                        };
                    }
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [search_service_1.SearchService],
        exports: [elasticsearch_1.ElasticsearchModule, search_service_1.SearchService],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map