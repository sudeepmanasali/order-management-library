import { createClient, RedisClientType } from "redis";
import AppLogger from "./AppLogger.js";
import { REDIS_CONNECTION_STATUS } from "./Constants.js";

const logger = AppLogger.getLogger("redis-manager");


export default class RedisManager {
  private static _redisClient: RedisClientType;
  private static readonly MAX_RETRIES = 10;
  private static readonly RECONNECT_DELAY = 5000;

  static async initRedisInstance(url: string): Promise<void> {
    try {

      RedisManager._redisClient = createClient({ url }) as RedisClientType;

      RedisManager._redisClient.on(REDIS_CONNECTION_STATUS.CONNECT, (args) => {
        logger.info("Redis connected successfully...!");
        console.log(args);

      });

      RedisManager._redisClient.on(REDIS_CONNECTION_STATUS.END, (args) => {
        logger.info("Redis disconnected successfully...!");
        console.log(args);

      });

      RedisManager._redisClient.on(REDIS_CONNECTION_STATUS.ERROR, (args) => {
        logger.error("Redis client error,  connection failed...!");
        console.log(args);

      });

      await RedisManager.connect();

    } catch (err) {
      logger.error("Error in connecting redis client...!", err);
      throw err;
    }
  }

  static async connect(): Promise<void> {
    try {
      if (!RedisManager.isRedisconnected()) {
        await RedisManager._redisClient.connect();
      }

    } catch (err) {
      logger.error("Failed to connect Redis instance...", err);
      setTimeout(() => RedisManager.reconnectRedisClient(3), RedisManager.RECONNECT_DELAY);
    }
  }

  static async reconnectRedisClient(retryAttempt: number): Promise<void> {
    if (retryAttempt <= RedisManager.MAX_RETRIES) {
      try {
        logger.warn(`Trying to reconnect to redis `);
        await RedisManager.connect();
      } catch (error) {
        logger.error('Failed to reconnect to redis client', error);
      }
    }
  }

  static isRedisconnected(): boolean {
    return RedisManager._redisClient.isOpen;
  }

  static get redisClient(): RedisClientType {
    return RedisManager._redisClient;
  }
}