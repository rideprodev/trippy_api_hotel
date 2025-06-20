import redisClient from "../services/redis";
import utility from "../services/utility";
import config from "../config";
import controllers from "../controllers";

const cacheMiddleware = async (req, res, next) => {
  const key = JSON.stringify(req.body);
  const ttlSeconds = (config.redis.cacheTTLMinutes || 10) * 60;

  try {
    // Check if Redis is connected
    if (!redisClient.isReady) {
      console.log("Redis not available, proceeding without cache");
      return next();
    }

    const data = await redisClient.get(key);
    if (data !== null) {
      const result = JSON.parse(data);
      
      // Send cached response immediately
      res.status(result.statusCode).json(result.body);
      
      // Trigger background update for fresh data
      setTimeout(async () => {
        try {
          console.log("Background cache update triggered for key:", key.substring(0, 50) + "...");
          
          // Create a mock response object for the background update
          const mockRes = {
            statusCode: 200,
            json: function(body) {
              if (this.statusCode === 200) {
                const valueToCache = {
                  statusCode: this.statusCode,
                  body: body,
                };
                // Update cache with fresh data
                redisClient.set(key, JSON.stringify(valueToCache), {
                  EX: ttlSeconds,
                }).catch(err => {
                  console.error("Background Redis set error:", err);
                });
              }
            }
          };
          
          // Call the original controller logic in background
          await controllers.grnController.search(req, mockRes, () => {});
        } catch (err) {
          console.error("Background cache update error:", err);
        }
      }, 100); // Small delay to ensure response is sent first
      
    } else {
      const originalJson = res.json;
      res.json = function (body) {
        if (res.statusCode === 200) {
          const valueToCache = {
            statusCode: res.statusCode,
            body: body,
          };
          // Cache for configured minutes
          redisClient.set(key, JSON.stringify(valueToCache), {
            EX: ttlSeconds,
          }).catch(err => {
            console.error("Redis set error (non-blocking):", err);
          });
        }
        originalJson.apply(res, arguments);
      };
      next();
    }
  } catch (err) {
    console.error("Redis error, proceeding without cache:", err);
    next();
  }
};

export default {
  cacheMiddleware,
}; 