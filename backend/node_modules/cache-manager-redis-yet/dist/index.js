"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClusterInsStore = exports.redisClusterStore = exports.redisInsStore = exports.redisStore = exports.avoidNoCacheable = exports.NoCacheableError = void 0;
const redis_1 = require("redis");
require("@redis/client");
require("@redis/bloom");
require("@redis/graph");
require("@redis/json");
require("@redis/search");
require("@redis/time-series");
class NoCacheableError {
    constructor(message) {
        this.message = message;
        this.name = 'NoCacheableError';
    }
}
exports.NoCacheableError = NoCacheableError;
const avoidNoCacheable = (p) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield p;
    }
    catch (e) {
        if (!(e instanceof NoCacheableError))
            throw e;
    }
});
exports.avoidNoCacheable = avoidNoCacheable;
const getVal = (value) => JSON.stringify(value) || '"undefined"';
function builder(redisCache, name, reset, keys, options) {
    const isCacheable = (options === null || options === void 0 ? void 0 : options.isCacheable) || ((value) => value !== undefined && value !== null);
    return {
        get(key) {
            return __awaiter(this, void 0, void 0, function* () {
                const val = yield redisCache.get(key);
                if (val === undefined || val === null)
                    return undefined;
                else
                    return JSON.parse(val);
            });
        },
        set(key, value, ttl) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!isCacheable(value))
                    throw new NoCacheableError(`"${value}" is not a cacheable value`);
                const t = ttl === undefined ? options === null || options === void 0 ? void 0 : options.ttl : ttl;
                if (t !== undefined && t !== 0)
                    yield redisCache.set(key, getVal(value), { PX: t });
                else
                    yield redisCache.set(key, getVal(value));
            });
        },
        mset(args, ttl) {
            return __awaiter(this, void 0, void 0, function* () {
                const t = ttl === undefined ? options === null || options === void 0 ? void 0 : options.ttl : ttl;
                if (t !== undefined && t !== 0) {
                    const multi = redisCache.multi();
                    for (const [key, value] of args) {
                        if (!isCacheable(value))
                            throw new NoCacheableError(`"${getVal(value)}" is not a cacheable value`);
                        multi.set(key, getVal(value), { PX: t });
                    }
                    yield multi.exec();
                }
                else
                    yield redisCache.mSet(args.map(([key, value]) => {
                        if (!isCacheable(value))
                            throw new Error(`"${getVal(value)}" is not a cacheable value`);
                        return [key, getVal(value)];
                    }));
            });
        },
        mget: (...args) => redisCache
            .mGet(args)
            .then((x) => x.map((x) => x === null || x === undefined
            ? undefined
            : JSON.parse(x))),
        mdel(...args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield redisCache.del(args);
            });
        },
        del(key) {
            return __awaiter(this, void 0, void 0, function* () {
                yield redisCache.del(key);
            });
        },
        ttl: (key) => __awaiter(this, void 0, void 0, function* () { return redisCache.pTTL(key); }),
        keys: (pattern = '*') => keys(pattern),
        reset,
        isCacheable,
        name,
        get client() {
            return redisCache;
        },
    };
}
// TODO: past instance as option
function redisStore(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const redisCache = (0, redis_1.createClient)(options);
        yield redisCache.connect();
        return redisInsStore(redisCache, options);
    });
}
exports.redisStore = redisStore;
/**
 * redisCache should be connected
 */
function redisInsStore(redisCache, options) {
    const reset = () => __awaiter(this, void 0, void 0, function* () {
        yield redisCache.flushDb();
    });
    const keys = (pattern) => redisCache.keys(pattern);
    return builder(redisCache, 'redis', reset, keys, options);
}
exports.redisInsStore = redisInsStore;
// TODO: coverage
function redisClusterStore(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const redisCache = (0, redis_1.createCluster)(options);
        yield redisCache.connect();
        return redisClusterInsStore(redisCache, options);
    });
}
exports.redisClusterStore = redisClusterStore;
// TODO: coverage
/**
 * redisCache should be connected
 */
function redisClusterInsStore(redisCache, options) {
    const reset = () => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(redisCache.getMasters().map((node) => __awaiter(this, void 0, void 0, function* () {
            if (node.client) {
                const client = yield node.client;
                yield client.flushDb();
            }
        })));
    });
    const keys = (pattern) => __awaiter(this, void 0, void 0, function* () {
        return (yield Promise.all(redisCache.getMasters().map((node) => __awaiter(this, void 0, void 0, function* () {
            if (node.client) {
                const client = yield node.client;
                return yield client.keys(pattern);
            }
            return [];
        })))).flat();
    });
    return builder(redisCache, 'redis-cluster', reset, keys, options);
}
exports.redisClusterInsStore = redisClusterInsStore;
//# sourceMappingURL=index.js.map