import models from "../models";
const { Bidding, BiddingPrices, User } = models;
import { Op } from "sequelize";

export default {
  /**
   * Get All Biddings
   * @param {Object} req
   * @param {Object} where
   */
  async getAllBiddings(req, where = {}) {
    try {
      const queryData = req.query;
      where = {
        ...where,
        tripType: "Hotel",
      };

      let limit = null,
        offset = null;
      if (queryData.name) {
        where = {
          ...where,
          [Op.or]: [
            { name: { [Op.like]: `%${queryData.name}%` } },
            { from: { [Op.like]: `%${queryData.name}%` } },
            { to: { [Op.like]: `%${queryData.name}%` } },
            { airlineHotelCode: { [Op.like]: `%${queryData.name}%` } },
            { flightRoomNumber: { [Op.like]: `%${queryData.name}%` } },
            { flightRoomNumber: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      return await Bidding.findAndCountAll({
        where: where,
        include: {
          attributes: ["firstName", "lastName"],
          model: User,
          as: "userData",
        },
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get One Biddings
   * @param {Object} req
   * @param {Object} where
   */
  async getOneBidding(req, where = {}) {
    try {
      return await Bidding.findOne({
        where: { ...where, tripType: "Hotel" },
        attributes: {
          exclude: [],
        },
        include: {
          attributes: ["firstName", "lastName"],
          model: User,
          as: "userData",
        },
      });
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * update the price in place my bid
   * @param {Object} bodyData
   */
  async updateLatestPrice(bodyData) {
    const priceData = {
      userId: bodyData.userId,
      biddingId: bodyData.biddingId,
      latestPrice: bodyData.latestPrice,
    };
    return await BiddingPrices.create(priceData);
  },

  /**
   * Place my bid
   * @param {Object} req
   */
  async placeMyBid(req) {
    try {
      const bodyData = req.body;
      bodyData.userId = req.user.id;
      bodyData.membersId = JSON.stringify(bodyData.membersId);
      const _response = await Bidding.create(bodyData);
      bodyData.biddingId = _response.id;
      await this.updateLatestPrice(bodyData);
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get all Bidding
   * @param {Object} req
   */
  async getMyBidding(req) {
    try {
      const userData = req.user;
      const { id } = req.params;
      return await Bidding.findOne({
        where: { id: id, userId: userData.id },
        include: {
          attributes: ["latestPrice", "createdAt"],
          order: [["id", "DESC"]],
          model: BiddingPrices,
          as: "biddingData",
        },
      });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Update My Biddings
   * @param {Object} req
   */
  async updateMyBidding(req) {
    try {
      const bodyData = req.body;
      if (bodyData.membersId) {
        bodyData.membersId = JSON.stringify(bodyData.membersId);
      }
      const biddingObject = req.biddingObject;
      return await biddingObject.update(bodyData);
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Bidding
   *
   * @param {Object} where
   */
  async getAllBidding(where) {
    return await Bidding.findAll({
      where,
      include: { model: User, as: "userData" },
    });
  },
};
