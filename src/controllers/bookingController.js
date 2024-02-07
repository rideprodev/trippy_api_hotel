import repositories from "../repositories";
import utility from "../services/utility";

const { bookingRepository } = repositories;

export default {
  /**
   * Get All Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllBooking(req, res, next) {
    try {
      const booking = await bookingRepository.getAllHotelBooking(req);
      utility.getResponse(res, booking, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
  /**
   * Get One Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getOneBooking(req, res, next) {
    try {
      const bookingObject = req.bookingObject;
      utility.getResponse(res, bookingObject, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get All Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllUserWiseBooking(req, res, next) {
    try {
      const booking = await bookingRepository.getAllHotelBooking(req, {
        userId: req.user.id,
      });
      utility.getResponse(res, booking, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
