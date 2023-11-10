import repositories from "../repositories";
import utility from "../services/utility";
const { hotelRepository } = repositories;
import models from "../models";
const { UserMember, UserPersonalInformation } = models;

export default {
  /**
   * Check airport exist
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchHotelsCodes(req, res, next) {
    try {
      const bodyData = req.body;
      const hotelCodes = [];
      if (bodyData.hotelCode !== "") {
        hotelCodes.push(bodyData.hotelCode);
        req.body.hotelCode = hotelCodes;
        next();
      } else {
        const getAllHotelCodes = await hotelRepository.fetchAll({
          cityCode: bodyData.cityCode,
        });
        if (getAllHotelCodes.length > 0) {
          for (let index = 0; index < getAllHotelCodes.length; index++) {
            const element = getAllHotelCodes[index];
            hotelCodes.push(`${element.hotelCode}`.substring(2));
          }
          req.body.hotelCode = hotelCodes;
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      }
    } catch (error) {
      next(error);
    }
  },

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
        userData.dataValues.title = userInformation.title;
        userData.dataValues.nationality = userInformation.nationality;
        userData.dataValues.type = userInformation.type;
        members = [...members, userData.dataValues];
      }
      let membersId = [];
      for (let index = 0; index < bodyData.booking_items.length; index++) {
        const e = bodyData.booking_items[index];
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
   * update hotel information in request
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
};
