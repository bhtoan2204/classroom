import { RedisClientOptions, RedisClientType, RedisClusterOptions, RedisClusterType } from 'redis';
import '@redis/client';
import '@redis/bloom';
import '@redis/graph';
import '@redis/json';
import '@redis/search';
import '@redis/time-series';
import type { Cache, Store, Config } from 'cache-manager';
type Clients = RedisClientType | RedisClusterType;
export type RedisCache<T extends Clients = RedisClientType> = Cache<RedisStore<T>>;
type Name<T extends Clients> = T extends RedisClientType ? 'redis' : T extends RedisClusterType ? 'redis-cluster' : never;
export interface RedisStore<T extends Clients = RedisClientType> extends Store {
    name: Name<T>;
    isCacheable: (value: unknown) => boolean;
    get client(): T;
}
export declare class NoCacheableError implements Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare const avoidNoCacheable: <T>(p: Promise<T>) => Promise<T | undefined>;
export declare function redisStore(options?: RedisClientOptions & Config): Promise<RedisStore<RedisClientType>>;
/**
 * redisCache should be connected
 */
export declare function redisInsStore(redisCache: RedisClientType, options?: Config): RedisStore<RedisClientType>;
export declare function redisClusterStore(options: RedisClusterOptions & Config): Promise<RedisStore<RedisClusterType>>;
/**
 * redisCache should be connected
 */
export declare function redisClusterInsStore(redisCache: RedisClusterType, options: RedisClusterOptions & Config): RedisStore<RedisClusterType>;
export {};
