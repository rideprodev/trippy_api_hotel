import hotelHelper from "../helper/hotelHelper";
import repositories from "../repositories";
import utility from "../services/utility";
import httpStatus from "http-status";

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

  /**
   * Get all airport List
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getOneHotels(req, res, next) {
    try {
      const airports = await hotelRepository.getOneHotels(req);
      utility.getResponse(res, airports, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airport List
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async search(req, res, next) {
    try {
      const response = await hotelRepository.search(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
        hotelHelper.checkBiddingNotification(req, response.data);
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get refech the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async refetch(req, res, next) {
    try {
      const response = await hotelRepository.refetch(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get refech the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async revalidate(req, res, next) {
    try {
      const response = await hotelRepository.revalidate(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get refech the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async booking(req, res, next) {
    try {
      const response = await hotelRepository.booking(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get refech the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async placeMyBid(req, res, next) {
    try {
      req.body.search_id = req.body.bookingClassReference;
      req.body.group_code = req.body.to;
      req.body.rate_key = req.body.sorceCode;
      const revalidate = await hotelRepository.revalidate(req);
      if (revalidate.status !== 200) {
        utility.getError(res, revalidate.message);
      } else if (revalidate.data.errors && revalidate.data.errors.length > 0) {
        utility.getError(
          res,
          `${revalidate.data.errors[0].code} : ${revalidate.data.errors[0].messages[0]}`
        );
      } else {
        req.body.latestPrice = revalidate.data.hotel.rate.price;
        req.body.biddingInfromation = JSON.stringify(revalidate.data);
        const result = await hotelRepository.placeMyBid(req);
        if (result) {
          utility.getResponse(res, null, "ADDED", httpStatus.CREATED);
        } else {
          utility.getError(res, "WENT_WRONG");
        }
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Place the airline Bid
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateBidding(req, res, next) {
    try {
      const response = await hotelRepository.updateMyBidding(req);
      if (response) {
        utility.getResponse(res, null, "UPDATED");
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },
};
