import repositories from "../repositories";
import utility from "../services/utility";

const { customRepository } = repositories;

export default {
  /**
   * Get all airport List
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllObjectList(req, res, next) {
    try {
      const airports = await customRepository.getAllObjects(req);
      utility.getResponse(res, airports, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
