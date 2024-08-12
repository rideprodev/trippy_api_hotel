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
      const bookingData = await bookingRepository.getOneHotelUserWiseBooking(
        req,
        {
          id: bookingObject.id,
        }
      );
      utility.getResponse(res, bookingData, "RETRIVED");
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
  async getAllAdminUserWiseBooking(req, res, next) {
    try {
      const { userId } = req.query;
      console.log(userId);
      const booking = await bookingRepository.getAllHotelBooking(req, {
        userId,
      });
      utility.getResponse(res, booking, "RETRIVED");
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

  /**
   * Get All Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getOneUserWiseBooking(req, res, next) {
    try {
      const booking = await bookingRepository.getOneHotelUserWiseBooking(req, {
        userId: req.user.id,
        id: req.params.bookingId,
      });
      utility.getResponse(res, booking, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Pay Naow
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async payNow(req, res, next) {
    try {
      const response = await bookingRepository.payNow(req);
      if (response === "Paid") {
        utility.getResponse(res, null, "Payment has been done");
      } else {
        utility.getError(res, "Already paid for this booking");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Card for Pay Now
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateCardOnBooking(req, res, next) {
    try {
      const response = await bookingRepository.updateCardOnBooking(req);
      utility.getResponse(res, null, "Card Updated Successfully");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch the  latest Price
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchLatestPrice(req, res, next) {
    try {
      const response = await bookingRepository.fetchLatestPrice(req);
      utility.getResponse(res, response, "Letest Price Updated!");
    } catch (error) {
      next(error);
    }
  },
};
