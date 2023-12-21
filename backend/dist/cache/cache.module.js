"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalCacheModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
let LocalCacheModule = class LocalCacheModule {
};
exports.LocalCacheModule = LocalCacheModule;
exports.LocalCacheModule = LocalCacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    store: await (0, cache_manager_redis_yet_1.redisStore)({
                        url: configService.get('REDIS_URL'),
                        ttl: 100,
                    }),
                }),
                isGlobal: true,
                inject: [config_1.ConfigService],
            }),
        ],
        exports: [cache_manager_1.CacheModule]
    })
], LocalCacheModule);
//# sourceMappingURL=cache.module.js.map