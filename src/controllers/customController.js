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
      const objectData = await customRepository.getAllObjects(req);
      utility.getResponse(res, objectData, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all places where
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllPlaces(req, res, next) {
    try {
      const places = await customRepository.getAllPlaces(req);
      utility.getResponse(res, places, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
