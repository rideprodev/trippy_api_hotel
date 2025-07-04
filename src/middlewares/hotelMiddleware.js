import repositories from "../repositories";
import utility from "../services/utility";
const {
  hotelRepository,
  userRepository,
  bookingRepository,
  biddingRepository,
} = repositories;
import models from "../models";
import { Op } from "sequelize";
import config from "../config";
const { HotelLocationCityMap, Setting, Cards } = models;

export default {
  /**
   * fetch the hotel codes accrding the condition
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchHotelsCodes(req, res, next) {
    try {
      req.startTiming('fetchHotelsCodes');
      const bodyData = req.body;
      if (bodyData.hotelCode && bodyData.hotelCode !== "") {
        req.body.hotelCode = `${bodyData.hotelCode}`.split(",");
        req.endTiming('fetchHotelsCodes');
        next();
      } else if (bodyData.locationCode && bodyData.locationCode !== "") {
        req.startTiming('locationCodeQuery');
        const hotelData = await HotelLocationCityMap.findAll({
          attributes: ["hotelCode"],
          where: { locationCode: bodyData.locationCode },
        });
        req.endTiming('locationCodeQuery');
        if (hotelData.length > 0) {
          const hotelCodes = hotelData.map((x) => `${x.hotelCode}`);
          req.body.hotelCode = hotelCodes;
          req.endTiming('fetchHotelsCodes');
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      } else {
        req.startTiming('cityCodeQuery');
        const where = {
          cityCode: bodyData.cityCode,
          [Op.or]: [
            {
              [Op.and]: [
                { StarCategory: { [Op.gte]: 3 } },
                { StarCategory: { [Op.lte]: 5 } },
              ],
            },
            { accommodationTypeSubName: "Apartment" },
            { accommodationTypeSubName: "Hotel" },
            { accommodationTypeSubName: "Villa" },
            { accommodationTypeSubName: "Resort" },
            { accommodationTypeSubName: "All-inclus" },
            { accommodationTypeSubName: "Inn" },
            { accommodationTypeSubName: "Aparthotel" },
          ],
        };
        const getAllHotelCodes = await hotelRepository.fetchTopAll(where);
        req.endTiming('cityCodeQuery');
        console.log("totalHotel=>", getAllHotelCodes.length);
        if (getAllHotelCodes.length > 0) {
          req.hotelCode = getAllHotelCodes.map((x) => `${x.hotelCode}`);
          req.endTiming('fetchHotelsCodes');
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * checking the requet is processable or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkApiProcessable(req, res, next) {
    try {
      req.startTiming('checkApiProcessable');
      const bodyData = req.body;
      if (bodyData.hotelCode && bodyData.hotelCode !== "") {
        utility.getResponse(res, [], "RETRIVED");
      } else if (bodyData.locationCode && bodyData.locationCode !== "") {
        req.startTiming('locationCodeQueryV1');
        const hotelData = await HotelLocationCityMap.findAll({
          attributes: ["hotelCode"],
          where: { locationCode: bodyData.locationCode },
        });
        req.endTiming('locationCodeQueryV1');
        if (hotelData.length > 0) {
          const hotelCodes = hotelData.map((x) => `${x.hotelCode}`);
          req.body.hotelCode = hotelCodes;
          req.endTiming('checkApiProcessable');
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      } else {
        req.startTiming('cityCodeQueryV1');
        const where = {
          cityCode: bodyData.cityCode,
          [Op.or]: [
            {
              [Op.and]: [
                { StarCategory: { [Op.gte]: 3 } },
                { StarCategory: { [Op.lte]: 5 } },
              ],
            },
            { accommodationTypeSubName: "Hotel" },
            { accommodationTypeSubName: "All-inclus" },
            { accommodationTypeSubName: "Aparthotel" },
          ],
        };
        const getAllHotelCodes = await hotelRepository.fetchAll(where, 8);
        req.endTiming('cityCodeQueryV1');
        if (getAllHotelCodes.length > 0) {
          req.hotelCode = getAllHotelCodes.map((x) => `${x.hotelCode}`);
          bodyData.cutOffTime = 3000;
          req.endTiming('checkApiProcessable');
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Check the bidding is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isBiddingExist(req, res, next) {
    try {
      const biddingObject = await biddingRepository.getOneBidding({
        id: req.params.id,
        status: "active",
      });
      if (biddingObject) {
        req.biddingObject = biddingObject;
        next();
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check the bidding is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isBiddingExistactMatched(req, res, next) {
    try {
      const biddingObject = await biddingRepository.getOneBidding({
        id: req.params.id,
        status: { [Op.or]: ["active", "inactive"] },
      });
      if (biddingObject) {
        req.biddingObject = biddingObject;
        next();
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check the booking is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isbookingExistUserWise(req, res, next) {
    try {
      const userData = req.user;
      const bookingObject = await bookingRepository.getOneHotelBooking({
        id: req.params.bookingId,
        userId: userData.id,
      });
      if (bookingObject) {
        req.bookingObject = bookingObject;
        next();
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check the booking is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isbookingExist(req, res, next) {
    try {
      const bookingObject = await bookingRepository.getOneHotelBooking({
        id: req.params.bookingId,
      });
      if (bookingObject) {
        req.bookingObject = bookingObject;
        next();
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Check the booking is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isbookingCancelled(req, res, next) {
    try {
      const bookingObject = req.bookingObject;
      if (bookingObject.status === "confirmed") {
        next();
      } else {
        utility.getError(res, "Can not cacelled unconfirmed booking!");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check the booking is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isCardExist(req, res, next) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      const cardInfo = await Cards.findOne({
        where: { id: bodyData.cardId, userId: userData.id },
      });
      if (cardInfo) {
        req.card = cardInfo;
        next();
      } else {
        utility.getError(
          res,
          "Card Not availiable please check and select another!"
        );
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * check the user exist o not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isUserExist(req, res, next) {
    try {
      const { userId } = req.query;
      const UserObject = await userRepository.findOne({ id: userId });
      if (UserObject) {
        next();
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check Transaction Complete
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkUserRelevance(req, res, next) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      let commission = 0,
        commissionAmount = 0,
        totalPrice = parseFloat(bodyData.price);
      // const result = await transactionRepository.findOneTransaction({
      //   userId: userData.id,
      //   id: bodyData.transactionId,
      //   hotelBookingId: null,
      // });

      // if (result && result.status === "complete") {
      if (userData.commission === "relevant") {
        const comissionPercent = await Setting.findOne({
          where: { key: "b05970e2431ae626c0f4a0f67c56848bdf22811d" },
        });
        commission = parseFloat(comissionPercent.value);
        commissionAmount = (parseFloat(bodyData.price) * commission) / 100;
        totalPrice = parseFloat(bodyData.price) + commissionAmount;
      } else if (userData.commission === "irrelevant") {
        commission = parseFloat(userData.commissionValue);
        commissionAmount = (parseFloat(bodyData.price) * commission) / 100;
        totalPrice = parseFloat(bodyData.price) + commissionAmount;
      }
      // req.transaction = result;
      bodyData.commission = commission;
      bodyData.commissionAmount = `${commissionAmount.toFixed(2)}`;
      bodyData.totalPrice = `${totalPrice.toFixed(2)}`;
      bodyData.transactionAmount = parseFloat(bodyData.price);
      bodyData.transactionCurrency = bodyData.currency;
      next();
      // } else {
      //   utility.getError(res, "Payment is not done please done payment first");
      // }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check Card Exist
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkCardExist(req, res, next) {
    try {
      const bodyData = req.body;
      const card = await Cards.findOne({
        where: {
          id: bodyData.cardId,
          status: "active",
        },
      });
      if (card) {
        next();
      } else {
        utility.getError(res, "Card is not valid please add befor transaction");
      }
    } catch (error) {
      s;
      next(error);
    }
  },

  /**
   * Check Bidding Possible
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkBiddingExist(req, res, next) {
    try {
      const bodyData = req.body;
      const biddingData = await biddingRepository.getOneBidding({
        hotelCode: bodyData.hotelCode,
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        room_type: bodyData.roomType,
        status: "active",
      });
      if (biddingData) {
        utility.getError(res, "Already have a bid of this hotel !");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check Bidding Possible
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkBiddingPossible(req, res, next) {
    try {
      const bodyData = req.body;
      bodyData.isGrouped = true;
      if (
        bodyData?.groupId &&
        +bodyData?.groupId > 0 &&
        bodyData.checkIn &&
        bodyData.checkOut
      ) {
        const bookingData = await bookingRepository.getOneActiveBooking({
          bookingGroupId: bodyData.groupId,
          checkIn: bodyData.checkIn,
          checkOut: bodyData.checkOut,
          status: "confirmed",
          platformStatus: "confirmed",
        });
        if (bookingData) {
          bodyData.isGrouped = false;
          req.booking = bookingData;
          next();
        } else {
          utility.getError(
            res,
            "Booking is not availible please book a hotel first"
          );
        }
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check Booking only availiable for accept and reject
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isbookingForAcceptExist(req, res, next) {
    try {
      const bodyData = req.body;

      const bookingData = await bookingRepository.getOneActiveBooking({
        id: bodyData.bookingId,
        bookingGroupId: req.params.bookingId,
        status: "confirmed",
        platformStatus: "pending",
      });
      if (bookingData) {
        req.booking = bookingData;
        next();
      } else {
        utility.getError(
          res,
          "Booking is not availible please contact the administrator!"
        );
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Check Booking is refundable or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkbookingRefundable(req, res, next) {
    try {
      const bodyData = req.body;
      const bookingData = req.booking;
      if (bookingData) {
        if (
          bookingData.checkIn === bodyData.checkIn &&
          bookingData.checkOut === bodyData.checkOut
        ) {
          if (
            bookingData.nonRefundable === "false" &&
            bookingData.underCancellation === "false"
          ) {
            if (bookingData.hotelCode === bodyData.hotelCode) {
              // if (bookingData.roomType === bodyData.roomType) {
              //   utility.getError(
              //     res,
              //     "Can't bid on the same room you booked !"
              //   );
              // } else {
              next();
              // }
            } else {
              next();
            }
          } else {
            utility.getError(
              res,
              "Can't bid because the non-cancellation room you booked !"
            );
          }
        } else {
          utility.getError(res, "Can only bid on the same dates you booked !");
        }
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check bidding is for search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkBiddingCounting(req, res, next) {
    try {
      const bodyData = req.body;
      const count = await biddingRepository.getAllBidding(
        {
          groupId: bodyData.groupId,
        },
        ["localPriority", "DESC"]
      );
      if (count.length < config.app.biddingLimitOnBooking) {
        bodyData.priority = count.length === 0 ? 1 : count[0].localPriority + 1;
        bodyData.localPriority = bodyData.priority;
        next();
      } else {
        utility.getError(res, "Maximum of 10 bid can be serve in a booking!");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check bidding is for search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkBiddingForSearch(req, res, next) {
    try {
      const biddingData =
        await biddingRepository.checkBiddingAvailiblityForSearch(req);
      req.biddings = biddingData;
      next();
    } catch (error) {
      next(error);
    }
  },

  async checkBookingForSearch(req, res, next) {
    try {
      const bookingData =
        await bookingRepository.checkBookingAvailiblityForSearch(req);
      req.bookings = bookingData;
      next();
    } catch (err) {
      next(err);
    }
  },

  /**
   * Check Bidding Priority
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkPriorityPosition(req, res, next) {
    try {
      const bodyData = req.body;
      const bookingData = await bookingRepository.getOneActiveBooking({
        bookingGroupId: req.params.groupId,
        status: "confirmed",
        platformStatus: "confirmed",
      });
      if (bookingData && bodyData.postions.length > 0) {
        let checkPriorityPermitted = false;
        for (let index = 0; index < bodyData.postions.length; index++) {
          const element = bodyData.postions[index];
          if (element.priority > 999990) {
            checkPriorityPermitted = true;
          }
        }
        if (checkPriorityPermitted === false) {
          next();
        } else {
          utility.getError(res, "not permitted for this position!");
        }
      } else {
        utility.getError(
          res,
          "Please check the booking either cancelled or not biddable."
        );
      }
    } catch (error) {
      next(error);
    }
  },
};
