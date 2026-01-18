"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const AppLogger_js_1 = __importDefault(require("./AppLogger.js"));
const logger = AppLogger_js_1.default.getLogger("redis-manager");
class RedisManager {
    static async initRedisInstance(url) {
        try {
            RedisManager._redisClient = (0, redis_1.createClient)({ url });
            RedisManager._redisClient.on("connect" /* REDIS_CONNECTION_STATUS.CONNECT */, (args) => {
                logger.info("Redis connected successfully...!");
                console.log(args);
            });
            RedisManager._redisClient.on("end" /* REDIS_CONNECTION_STATUS.END */, (args) => {
                logger.info("Redis disconnected successfully...!");
                console.log(args);
            });
            RedisManager._redisClient.on("error" /* REDIS_CONNECTION_STATUS.ERROR */, (args) => {
                logger.error("Redis client error,  connection failed...!");
                console.log(args);
            });
            await RedisManager.connect();
        }
        catch (err) {
            logger.error("Error in connecting redis client...!", err);
            throw err;
        }
    }
    static async connect() {
        try {
            if (!RedisManager.isRedisconnected()) {
                await RedisManager._redisClient.connect();
            }
        }
        catch (err) {
            logger.error("Failed to connect Redis instance...", err);
            setTimeout(() => RedisManager.reconnectRedisClient(3), RedisManager.RECONNECT_DELAY);
        }
    }
    static async reconnectRedisClient(retryAttempt) {
        if (retryAttempt <= RedisManager.MAX_RETRIES) {
            try {
                logger.warn(`Trying to reconnect to redis `);
                await RedisManager.connect();
            }
            catch (error) {
                logger.error('Failed to reconnect to redis client', error);
            }
        }
    }
    static isRedisconnected() {
        return RedisManager._redisClient.isOpen;
    }
    static get redisClient() {
        return RedisManager._redisClient;
    }
}
RedisManager.MAX_RETRIES = 10;
RedisManager.RECONNECT_DELAY = 5000;
exports.default = RedisManager;
