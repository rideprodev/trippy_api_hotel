import models from "../models";
import repositories from "../repositories";
import utility from "../services/utility";
import httpStatus from "http-status";

const { biddingRepository, grnRepository } = repositories;
const { Setting } = models;

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
        const bidding = await biddingRepository.getOneBidding(where);
        utility.getResponse(res, bidding, "RETRIVED");
      } else {
        utility.getResponse(res, null, "UNAUTHORISED_ACCESS");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get All User Bidding Admin Side
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
      const bodyData = req.body;
      req.body.search_id = bodyData.searchId;
      req.body.group_code = bodyData.groupCode;
      req.body.rate_key = bodyData.rateKey;
      const revalidate = await grnRepository.revalidate(req);
      if (revalidate.status !== 200) {
        utility.getError(res, revalidate.message);
      } else if (revalidate.data.errors && revalidate.data.errors.length > 0) {
        utility.getError(
          res,
          `${revalidate.data.errors[0].code} : ${revalidate.data.errors[0].messages[0]}`
        );
      } else if (revalidate?.data?.hotel?.rate?.rate_type !== "bookable") {
        utility.getError(res, "Can't bid because this hotel is full !");
      } else {
        //  Condition for same room booking on the
        // const rooms = revalidate.data.hotel.rate.rooms;
        // const checkRoomAvailiable = rooms.filter(
        //   (x) => x.room_type === bodyData.roomType
        // );
        // console.log(rooms, bodyData.roomType);
        // if (checkRoomAvailiable.length > 0) {
        let nonRefundable = null,
          underCancellation = null;

        if (
          revalidate?.data?.hotel?.rate &&
          typeof revalidate?.data?.hotel?.rate?.non_refundable === "boolean"
        ) {
          nonRefundable = `${revalidate?.data?.hotel?.rate?.non_refundable}`;
          if (
            typeof revalidate?.data?.hotel?.rate?.cancellation_policy
              ?.under_cancellation === "boolean"
          ) {
            underCancellation = `${revalidate?.data?.hotel?.rate?.cancellation_policy?.under_cancellation}`;
          }
        }
        if (nonRefundable === "false" && underCancellation === "false") {
          // need to add user commission

          let commission = 0,
            commissionAmount = 0,
            totalPrice = 0;

          const userData = req.user;
          if (userData.commission === "relevant") {
            const comissionPercent = await Setting.findOne({
              where: { key: "b05970e2431ae626c0f4a0f67c56848bdf22811d" },
            });
            commission = parseFloat(comissionPercent.value);
            commissionAmount =
              (parseFloat(revalidate.data?.hotel?.rate?.price) * commission) /
              100;
            totalPrice =
              parseFloat(revalidate.data?.hotel?.rate?.price) +
              commissionAmount;
            revalidate.data.serviceChages = `${commissionAmount}`;
            revalidate.data.finalAmount = `${parseFloat(totalPrice).toFixed(
              2
            )}`;
          } else {
            revalidate.data.serviceChages = "0";
            totalPrice = totalPrice = `${parseFloat(
              reavalidateResponse.data?.hotel?.rate?.price
            ).toFixed(2)}`;
            revalidate.data.finalAmount = `${parseFloat(
              revalidate.data?.hotel?.rate?.price
            ).toFixed(2)}`;
          }

          req.body.latestPrice = totalPrice;
          const result = await biddingRepository.placeMyBid(req);
          if (result) {
            utility.getResponse(res, null, "ADDED", httpStatus.CREATED);
          } else {
            utility.getError(res, "WENT_WRONG");
          }
        } else {
          utility.getError(
            res,
            "Can't bid, You can't bid on a non-refundable hotel !"
          );
        }
        // } else {
        //   utility.getError(
        //     res,
        //     "Oops! You missed it, All rooms of this type had been booked !"
        //   );
        // }
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

  /**
   * Get All my Bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getMyBiddings(req, res, next) {
    try {
      const { id } = req.user;
      const bidding = await biddingRepository.getAllBiddings(req, {
        userId: id,
      });
      utility.getResponse(res, bidding, "RETRIVED");
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
  async bookingAvaliablity(req, res, next) {
    try {
      const biddingData = req.biddings;
      const bookingData = req.bookings;
      const filterHotelBiddings = biddingData.map((x) => {
        return { hotelCode: x.hotelCode, roomType: x.roomType };
      });

      const filterHotelBookings = bookingData.map((x) => {
        return { hotelCode: x.hotelCode, roomType: x.roomType };
      });
      const _response = {
        biddings: filterHotelBiddings,
        bookings: filterHotelBookings,
      };
      utility.getResponse(res, _response, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
};
