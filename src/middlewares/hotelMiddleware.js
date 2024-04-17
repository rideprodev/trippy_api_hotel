import repositories from "../repositories";
import utility from "../services/utility";
const { hotelRepository, userRepository, transactionRepository } = repositories;
import models from "../models";
import bookingRepository from "../repositories/bookingRepository";
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
        const getAllHotelCodes = await hotelRepository.fetchAll({
          cityCode: bodyData.cityCode,
        });
        if (getAllHotelCodes.length > 0) {
          for (let index = 0; index < getAllHotelCodes.length; index++) {
            const element = getAllHotelCodes[index];
            hotelCodes.push(element.hotelCode);
          }
          req.body.hotelCode = hotelCodes;
          // console.log(hotelCodes);
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
      const biddingObject = await hotelRepository.getMyBidding(req);
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
        totalPrice = +bodyData.price;
      const result = await transactionRepository.findOneTransaction({
        userId: userData.id,
        id: bodyData.transactionId,
      });

      if (result && result.status === "complete") {
        if (userData.commission === "relevant") {
          const comissionPercent = await Setting.findOne({
            where: { key: "grn_margin" },
          });
          commission = +comissionPercent.value;
          commissionAmount = (+bodyData.price * commission) / 100;
          totalPrice = +bodyData.price + commissionAmount;
        }
        bodyData.commission = commission;
        bodyData.commissionAmount = commissionAmount;
        bodyData.totalPrice = totalPrice;
        if (+result.total === bodyData.totalPrice) {
          if (bodyData.searchPayload.currency === result.currency) {
            next();
          } else {
            utility.getError(
              res,
              `The booking did not go through because the hotel search in ${bodyData.searchPayload.currency} currency and you have paid=${result.currency} currency. Please contact our support`
            );
          }
        } else {
          utility.getError(
            res,
            `The booking did not go through because the payment for this booking is=${bodyData.totalPrice} and you have paid=${result.total}. Please contact our support`
          );
        }
      } else {
        utility.getError(res, "Payment is not done please done payment first");
      }
    } catch (error) {
      next(error);
    }
  },
};
