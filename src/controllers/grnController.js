import hotelHelper from "../helper/hotelHelper";
import repositories from "../repositories";
import utility from "../services/utility";

const { grnRepository } = repositories;

export default {
  /**
   * search the hotels
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async search(req, res, next) {
    try {
      const response = await grnRepository.search(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        const _response = await hotelHelper.setCountryCityName(
          req,
          response.data
        );
        utility.getResponse(res, _response, "RETRIVED", 200, req.body.count);
        // hotelHelper.checkBiddingNotification(req, response.data);
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
      const response = await grnRepository.refetch(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        const _response = await hotelHelper.getAllImages(req, response.data);
        utility.getResponse(res, _response, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get recheck the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async revalidate(req, res, next) {
    try {
      const response = await grnRepository.revalidate(req);
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
   * book the hotel
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async booking(req, res, next) {
    try {
      const response = await grnRepository.booking(req);
      if (response.status !== 200) {
        utility.getError(res, `${response.message} And your refund intiated`);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]} And your refund intiated`
        );
      } else {
        if (
          response.data.status === "pending" ||
          response.data.status === "confirmed"
        ) {
          utility.getResponse(res, response.data, response.data.status);
        } else {
          utility.getError(res, null, response.data.status);
        }
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * check the status
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingStatus(req, res, next) {
    try {
      const response = await grnRepository.bookingStatus(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
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
   * Cancel booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingCancel(req, res, next) {
    try {
      const response = await grnRepository.bookingCancel(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
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
};
