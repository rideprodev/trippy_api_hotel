import loggers from "./logger";
import repositories from "../repositories";

const { errorLogger } = loggers;
const { schedulerRepository } = repositories;

export default {
  /**
   * Send Upcoming Booking Notification to student
   */
  async AutoPayment(req, res, next) {
    try {
      await schedulerRepository.autoPayment(req);
    } catch (error) {
      errorLogger.error(JSON.stringify(error));
    }
  },
};
