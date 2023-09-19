import models from "../models";
const { Hotel, HotelCity, HotelImage, HotelDestination, HotelCountry } = models;
import { Op } from "sequelize";
import genrateResponse from "../services/responseGenrater";

export default {
  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async getSessionToken(req) {
    try {
      // fetch token from settings
      const token = await "Bearer E7C628DE-6FDA-43D1-A125-CBA9BEF557B3-2183";
      return utility.ENCODE(token);
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

  /**
   * Get airline Token
   * @param {Object} where
   */
  async search(req) {
    try {
      const bodyData = req.body;
      return bodyData;
    } catch (error) {
      throw Error(error);
    }
  },
};
