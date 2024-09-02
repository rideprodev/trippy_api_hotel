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
            revalidate.data.serviceChages = "0";
            totalPrice = totalPrice = `${parseFloat(
              revalidate.data?.hotel?.rate?.price
            ).toFixed(2)}`;
            revalidate.data.finalAmount = `${parseFloat(
              revalidate.data?.hotel?.rate?.price
            ).toFixed(2)}`;
          }

          req.body.latestPrice = totalPrice;
          // req.body.roomType = `${revalidate.data?.hotel?.rate?.rooms[0].room_type}, ${revalidate.data?.hotel?.rate?.boarding_details}`;
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
      let newUpdatedPriority = [],
        updatedPriorities = [];
      const bodyData = req.body;
      const biddingData = await biddingRepository.getAllBidding(
        {
          status: "active",
          groupId: bodyData.groupId,
        },
        ["priority", "ASC"]
      );
      if (biddingData.length > 1) {
        const returnData = (id, priority) => {
          return { id, priority };
        };
        if (+bodyData.currentPosition > +bodyData.newPosition) {
          updatedPriorities = biddingData.map((x) => {
            if (
              +x.priority < +bodyData.newPosition ||
              +x.priority > +bodyData.currentPosition
            ) {
              return returnData(x.id, x.priority);
            } else if (+x.priority == +bodyData.currentPosition) {
              x.priority = +bodyData.newPosition;
              return returnData(x.id, x.priority);
            } else if (
              +x.priority >= +bodyData.newPosition &&
              +x.priority != +bodyData.currentPosition
            ) {
              x.priority = +x.priority + 1;

              return returnData(x.id, x.priority);
            }
          });
        } else {
          updatedPriorities = biddingData.map((x) => {
            if (
              +x.priority > +bodyData.newPosition ||
              +x.priority < +bodyData.currentPosition
            ) {
              return returnData(x.id, x.priority);
            } else if (+x.priority == +bodyData.currentPosition) {
              x.priority = +bodyData.newPosition;
              return returnData(x.id, x.priority);
            } else if (
              +x.priority != +bodyData.currentPosition &&
              +x.priority <= +bodyData.newPosition
            ) {
              x.priority = +x.priority - 1;
              return returnData(x.id, x.priority);
            }
          });
        }

        const updateBiddingData = updatedPriorities.map(
          async (x) =>
            await biddingRepository.updateBiddingWhere(
              { priority: x.priority },
              { id: x.id }
            )
        );

        try {
          await Promise.all(updateBiddingData);
        } catch (err) {
          console.log(err);
        }

        newUpdatedPriority = updatedPriorities.sort(
          (a, b) => a.priority - b.priority
        );
      }

      utility.getResponse(res, newUpdatedPriority, "RETRIVED");
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
        const booking_respose =
          await schedulerRepository.checkbiddingforbooking(biddingData[0]);
        utility.getResponse(res, booking_respose, "RETRIVED");
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
