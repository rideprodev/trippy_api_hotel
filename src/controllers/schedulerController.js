import repositories from "../repositories";
import utility from "../services/utility";

const { schedulerRepository } = repositories;

export default {
  /**
   * make payemnt
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async autoPayemnt(req, res, next) {
    try {
      const response = await schedulerRepository.autoPayment(req);
      utility.getResponse(res, response, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
