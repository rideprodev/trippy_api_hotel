import models from "../models";
const {
  HotelAirports,
  HotelCity,
  HotelCountry,
  HotelLanguage,
  HotelArea,
  HotelDestination,
  HotelFacilities,
  HotelCurrency,
} = models;
import { Op } from "sequelize";

const getObject = {
  airports: HotelAirports,
  cities: HotelCity,
  countries: HotelCountry,
  langauges: HotelLanguage,
  areas: HotelArea,
  destinations: HotelDestination,
  facilities: HotelFacilities,
  currencies: HotelCurrency,
};

export default {
  /**
   * Get airport pages
   * @param {object} req
   */
  async getAllObjects(req) {
    try {
      const { objectName } = req.params;
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

      return await getObject[objectName].findAndCountAll({
        where: where,
        attributes: {
          exclude: ["createdBy", "updatedBy", "createdAt", "updatedAt"],
        },
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
    } catch (error) {
      throw Error(error);
    }
  },
};
