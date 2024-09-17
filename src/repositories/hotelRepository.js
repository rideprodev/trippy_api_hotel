import models from "../models";
const { Hotel, HotelCity, HotelImage, HotelDestination, HotelCountry } = models;
import { Op } from "sequelize";
import genrateResponse from "../services/responseGenrater";

export default {
  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async fetchAllImagesWhereHotel(where) {
    try {
      return await HotelImage.findAll({
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        where,
      });
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async fetchAll(where, limit = 300, offset = 0) {
    try {
      return await Hotel.findAll({
        attributes: ["hotelCode"],
        where,
        offset,
        limit,
        order: [["StarCategory", "DESC"]],
      });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async fetchOneWithoutCount(where, limit = null, offset = 0) {
    try {
      return await Hotel.findOne({
        attributes: ["accommodationTypeSubName", "ChainName"],
        where,
        offset,
        limit,
        order: [["StarCategory", "DESC"]],
      });
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Get airport pages
   * @param {object} req
   */
  async getAllHotels(req) {
    try {
      const queryData = req.query;
      let where = {},
        limit = null,
        offset = null;
      if (queryData.name) {
        where = {
          [Op.or]: [
            { hotelCode: { [Op.like]: `%${queryData.name}%` } },
            { hotelName: { [Op.like]: `%${queryData.name}%` } },
            { cityCode: { [Op.like]: `%${queryData.name}%` } },
            { postalCode: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      const include = [
        { model: HotelCity, as: "city", type: "one", ref: "cityCode" },
        {
          model: HotelDestination,
          as: "destination",
          type: "one",
          ref: "destinationCode",
        },
        { model: HotelCountry, as: "county", type: "one", ref: "countryCode" },
      ];

      const response = await Hotel.findAndCountAll({
        where: where,
        attributes: {
          exclude: ["createdBy", "updatedBy", "createdAt", "updatedAt"],
        },
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
      const _response = await genrateResponse(response, include, true);
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get airport pages
   * @param {object} req
   */
  async getOneHotels(req) {
    try {
      const { hotelId } = req.params;
      let where = { id: hotelId };
      const include = [
        { model: HotelImage, as: "images", type: "many", ref: "hotelCode" },
        { model: HotelCity, as: "city", type: "one", ref: "cityCode" },
        {
          model: HotelDestination,
          as: "destination",
          type: "one",
          ref: "destinationCode",
        },
        { model: HotelCountry, as: "county", type: "one", ref: "countryCode" },
      ];

      const response = await Hotel.findOne({
        where: where,
        attributes: {
          exclude: ["createdBy", "updatedBy", "createdAt", "updatedAt"],
        },
      });
      const _response = await genrateResponse(response, include);
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
