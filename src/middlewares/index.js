import authMiddleware from "./authMiddleware";
import resourceAccessMiddleware from "./resourceAccessMiddleware";
import validateMiddleware from "./validateMiddleware";
import hotelMiddleware from "./hotelMiddleware";
import cacheMiddleware from "./cacheMiddleware";
import performanceMiddleware from "./performanceMiddleware";
import timeoutMiddleware from "./timeoutMiddleware";

export default {
  authMiddleware,
  cacheMiddleware,
  hotelMiddleware,
  performanceMiddleware,
  resourceAccessMiddleware,
  timeoutMiddleware,
  validateMiddleware,
};
