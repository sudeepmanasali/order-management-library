import { RedisClientType } from "redis";
export default class RedisManager {
    private static _redisClient;
    private static readonly MAX_RETRIES;
    private static readonly RECONNECT_DELAY;
    static initRedisInstance(url: string): Promise<void>;
    static connect(): Promise<void>;
    static reconnectRedisClient(retryAttempt: number): Promise<void>;
    static isRedisconnected(): boolean;
    static get redisClient(): RedisClientType;
}
