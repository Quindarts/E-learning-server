import * as redis from "redis";
import dotenv from "dotenv";
dotenv.config();

enum RedisStatus {
  CONNECT = "connect",
  ERROR = "error",
}
const REDIS_CONFIG = {
  url: process.env.KV_URL,
};

const redisClient = redis.createClient(REDIS_CONFIG);

const handleEventRedisStatus = (status: string) => {
  redisClient.on(status, () => {
    console.log(`> ${status} to Redis cache`);
  });
};

handleEventRedisStatus(RedisStatus.CONNECT);
handleEventRedisStatus(RedisStatus.ERROR);

export default redisClient;
