import repositories from "../repositories";
import utility from "../services/utility";
import httpStatus from "http-status";

const { biddingRepository, grnRepository } = repositories;

export default {
  /**
   * Get All Bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllBidding(req, res, next) {
    try {
      const { biddingId } = req.params;
      const where = {};
      if (req.user.userType === "admin" && biddingId === "all") {
        const bidding = await biddingRepository.getAllBiddings(req);
        utility.getResponse(res, bidding, "RETRIVED");
      } else if (biddingId > 0) {
        where.id = biddingId;
        const bidding = await biddingRepository.getOneBidding(req, where);
        utility.getResponse(res, bidding, "RETRIVED");
      } else {
        utility.getResponse(res, null, "UNAUTHORISED_ACCESS");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get All User Bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getUserWiseBidding(req, res, next) {
    try {
      const { userId } = req.query;
      const bidding = await biddingRepository.getAllBiddings(req, {
        userId: userId,
      });
      utility.getResponse(res, bidding, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Place the bid
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async placeMyBid(req, res, next) {
    try {
      req.body.search_id = req.body.bookingClassReference;
      req.body.group_code = req.body.groupCode;
      req.body.rate_key = req.body.sorceCode;
      const revalidate = await grnRepository.revalidate(req);
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
        const result = await biddingRepository.placeMyBid(req);
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
   * update the bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateBidding(req, res, next) {
    try {
      const response = await biddingRepository.updateMyBidding(req);
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
