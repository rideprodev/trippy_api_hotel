import config from "../config";
import models from "../models";
import repositories from "../repositories";
import schedulerRepository from "../repositories/schedulerRepository";
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
              where: { key: config.app.GRNPercentageKey },
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
            commission = userData?.commissionValue
              ? parseFloat(userData.commissionValue)
              : 0;
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
   * update the bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateBidding(req, res, next) {
    try {
      const bodyData = req.body;
      const biddingObject = req.biddingObject;
      if (biddingObject.status === bodyData.status) {
        utility.getError(res, "Already in same status");
      } else {
        const response = await biddingRepository.updateMyBidding(req);
        utility.getResponse(
          res,
          { id: response.id, status: response.status },
          "UPDATED"
        );
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

  /**
   * Get Change Priority of any bidding
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async changePriority(req, res, next) {
    try {
      const bodyData = req.body;
      const updateBiddingData = bodyData.postions.map(
        async (x) =>
          await biddingRepository.updateBiddingWhere(
            { priority: x.priority, localPriority: x.priority },
            { id: x.id }
          )
      );
      try {
        await Promise.all(updateBiddingData);
      } catch (err) {
        console.log(err);
      }
      utility.getResponse(res, null, "UPDATED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get Book at current price
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookAtCurrentPrice(req, res, next) {
    try {
      const bidData = req.biddingObject;
      const biddingData =
        await biddingRepository.getAllBiddingForCurentPriceBook([
          { id: bidData.id },
        ]);
      if (biddingData.length > 0) {
        const response = await schedulerRepository.checkbiddingforbooking(
          biddingData[0]
        );
        if (response.status !== 200) {
          utility.getError(
            res,
            `${
              response?.message
                ? response.message
                : "Currently this room is sold out!"
            }`
          );
        } else if (
          response.data &&
          response.data.errors &&
          response.data.errors.length > 0
        ) {
          utility.getError(
            res,
            `${response.data.errors[0].code} : ${
              response?.data?.errors[0]?.messages[0]
                ? response?.data?.errors[0]?.messages[0]
                : "Currently this room is sold out!"
            }`
          );
        } else {
          if (
            response.data.status === "pending" ||
            response.data.status === "confirmed"
          ) {
            const BookingResponse = {
              status: response.data.status,
              checkin: response.data.checkin,
              checkout: response.data.checkout,
              booking_date: response.data.booking_date,
              booking_reference: response.data.booking_reference,
              hotel: {
                paxes: response.data.hotel.paxes,
                booking_items: response.data.hotel.booking_items,
                city_name: response.data.hotel.city_name,
                hotel_code: response.data.hotel.hotel_code,
              },
              bookingGroupData: response.data.bookingGroupData,
            };
            utility.getResponse(res, BookingResponse, BookingResponse.status);
          } else {
            utility.getError(res, null, response.data.status);
          }
        }
      } else {
        utility.getError(
          res,
          "This Bidding is not active, or matched in state"
        );
      }
    } catch (error) {
      next(error);
    }
  },
};
