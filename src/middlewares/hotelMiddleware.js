import repositories from "../repositories";
import utility from "../services/utility";
const { hotelRepository } = repositories;

export default {
  /**
   * Check airport exist
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchHotelsCodes(req, res, next) {
    try {
      const bodyData = req.body;
      const getAllHotelCodes = await hotelRepository.getAllHotels();
      //   utility.getError(
      //     res,
      //     "Unauthorized user access.",
      //     HttpStatus.UNAUTHORIZED
      //   );
      next();
    } catch (error) {
      next(error);
    }
  },
};
