import models from "../models";
const { Hotel, HotelCity, HotelImage, HotelDestination, HotelCountry } = models;
import { Op } from "sequelize";
import genrateResponse from "../services/responseGenrater";

export default {
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
            { name: { [Op.like]: `%${queryData.name}%` } },
            { code: { [Op.like]: `%${queryData.name}%` } },
            { city: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

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

      const response = await Hotel.findAndCountAll({
        where: where,
        attributes: {
          exclude: ["createdBy", "updatedBy", "createdAt", "updatedAt"],
        },
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
      const _response = await genrateResponse(response, include);
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
