import { createClient } from "redis";
import config from "../config";
// import logger from "./logger";

const client = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.error('Redis server refused connection');
      return new Error('Redis server refused connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error('Redis retry time exhausted');
      return new Error('Redis retry time exhausted');
    }
    if (options.attempt > 10) {
      console.error('Redis max retry attempts reached');
      return new Error('Redis max retry attempts reached');
    }
    return Math.min(options.attempt * 100, 3000);
  }
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.error("Redis client error:", err.message);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

// Connect to Redis, but don't block the application if it fails
client.connect().catch(err => {
  console.error("Failed to connect to Redis:", err.message);
  console.log("Application will continue without Redis caching");
});

export default client; 