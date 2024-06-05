import repositories from "../repositories";
import utility from "../services/utility";
const {
  hotelRepository,
  userRepository,
  transactionRepository,
  bookingRepository,
  biddingRepository,
} = repositories;
import models from "../models";
import { Op } from "sequelize";
const { UserMember, UserPersonalInformation, Setting } = models;

export default {
  /**
   * fetch the hotel codes accrding the condition
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchHotelsCodes(req, res, next) {
    try {
      const bodyData = req.body;
      const hotelCodes = [];
      if (bodyData.hotelCode && bodyData.hotelCode !== "") {
        req.body.hotelCode = `${bodyData.hotelCode}`.split(",");
        next();
      } else {
        const where = {
          cityCode: bodyData.cityCode,
          StarCategory: { [Op.gt]: 0 },
        };
        if (bodyData?.StarCategory?.length > 0) {
          where.StarCategory = bodyData.StarCategory;
        }
        if (bodyData?.propertyType?.length > 0) {
          where.accommodationTypeSubName = bodyData.propertyType;
        }
        const getAllHotelCodes = await hotelRepository.fetchAll(
          where,
          bodyData.limit,
          bodyData.offset
        );
        if (getAllHotelCodes.rows.length > 0) {
          for (let index = 0; index < getAllHotelCodes.rows.length; index++) {
            const element = getAllHotelCodes.rows[index];
            hotelCodes.push(element.hotelCode);
          }
          req.body.hotelCode = hotelCodes;
          req.body.count = getAllHotelCodes.count;
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
   * Check the members is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async checkMemberExist(req, res, next) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      let members = [];
      if (bodyData.isUserTravelled === "true") {
        const userInformation = await UserPersonalInformation.findOne({
          attributes: ["title", "nationality", "type"],
          where: { userId: userData.id },
        });
        userData.dataValues.id = userData.id;
        userData.dataValues.title = userInformation.title;
        userData.dataValues.nationality = userInformation.nationality;
        userData.dataValues.type = userInformation.type;
        members = [...members, userData.dataValues];
      }
      let membersId = [];
      for (let index = 0; index < bodyData.bookingItems.length; index++) {
        const e = bodyData.bookingItems[index];
        for (let i = 0; i < e.rooms.length; i++) {
          const element = e.rooms[i];
          membersId = [...membersId, ...element.paxes];
        }
      }

      if (membersId.length > 0) {
        const onlyMember = membersId.filter((x) => x !== userData.id);
        if (onlyMember.length > 0) {
          const memberData = await UserMember.findAll({
            where: { id: onlyMember },
          });
          for (let j = 0; j < memberData.length; j++) {
            const jelement = memberData[j].dataValues;
            members = [...members, jelement];
          }
        }
      }

      if (members.length === +bodyData.totalMember) {
        req.members = members;
        next();
      } else {
        utility.getError(res, "MEMBER_NOT_FOUND");
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
   * Check the booking is exist or not
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async isbookingExist(req, res, next) {
    try {
      const bookingObject = await bookingRepository.getOneHotelBooking(req, {
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
  async checkTransactionComplete(req, res, next) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      let commission = 0,
        commissionAmount = 0,
        totalPrice = parseFloat(bodyData.price);
      const result = await transactionRepository.findOneTransaction({
        userId: userData.id,
        id: bodyData.transactionId,
        hotelBookingId: null,
      });

      if (result && result.status === "complete") {
        if (userData.commission === "relevant") {
          const comissionPercent = await Setting.findOne({
            where: { key: "b05970e2431ae626c0f4a0f67c56848bdf22811d" },
          });
          commission = parseFloat(comissionPercent.value);
          commissionAmount = (parseFloat(bodyData.price) * commission) / 100;
          totalPrice = parseFloat(bodyData.price) + commissionAmount;
        }
        req.transaction = result;
        bodyData.commission = commission;
        bodyData.commissionAmount = `${commissionAmount.toFixed(2)}`;
        bodyData.totalPrice = `${totalPrice.toFixed(2)}`;
        bodyData.transactionAmount = result.total;
        bodyData.transactionCurrency = result.currency;
        next();
      } else {
        utility.getError(res, "Payment is not done please done payment first");
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
        const bookingData = await bookingRepository.getActiveBooking({
          bookingGroupId: bodyData.groupId,
          checkIn: bodyData.checkIn,
          checkOut: bodyData.checkOut,
          status: "confirmed",
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
              if (bookingData.roomType === bodyData.roomType) {
                utility.getError(
                  res,
                  "Can't bid on the same room you booked !"
                );
              } else {
                next();
              }
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
   * Check Booking is refundable or not
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
};
