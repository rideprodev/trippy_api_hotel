import repositories from "../repositories";
import utility from "../services/utility";

const { hotelRepository } = repositories;

export default {
  /**
   * Get all airport List
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllHotels(req, res, next) {
    try {
      const airports = await hotelRepository.getAllHotels(req);
      utility.getResponse(res, airports, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
