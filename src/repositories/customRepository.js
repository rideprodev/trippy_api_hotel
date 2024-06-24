import models from "../models";
const {
  Hotel,
  HotelCity,
  HotelCountry,
  HotelLocation,
  HotelCurrency,
  sequelize,
} = models;
import { Op, Sequelize } from "sequelize";

const getObject = (queryData, model = "airports") => {
  if (model === "cities") {
    return {
      model: HotelCity,
      where: {
        [Op.or]: [
          { cityCode: { [Op.like]: `%${queryData.name}%` } },
          { cityName: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "countries") {
    return {
      model: HotelCountry,
      where: {
        [Op.or]: [
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
          { countryCode3: { [Op.like]: `%${queryData.name}%` } },
          { countryName: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "destinations") {
    return {
      model: HotelLocation,
      where: {
        [Op.or]: [
          { locationCode: { [Op.like]: `%${queryData.name}%` } },
          { locationName: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "currencies") {
    return {
      model: HotelCurrency,
      where: {
        [Op.or]: [
          { currencyCode: { [Op.like]: `%${queryData.name}%` } },
          { currency: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  }
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
      const object = getObject(queryData, objectName);
      let where = {},
        limit = null,
        offset = null;
      if (queryData.name) {
        where = object.where;
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      return await object.model.findAndCountAll({
        where: where,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
   * Get All Plcaes Where
   * @param {object} req
   */
  async getAllPlaces(req) {
    try {
      const { name } = req.query;
      const whereCity = {
          $col: Sequelize.where(
            Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
            {
              [Op.like]: `%${name.replace(/\./g, "")}%`,
            }
          ),
        },
        whereHotel = {
          $col: Sequelize.where(
            Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
            {
              [Op.like]: `%${name.replace(/\./g, "")}%`,
            }
          ),
        },
        whereLocation = {
          $col: Sequelize.where(
            Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
            {
              [Op.like]: `%${name.replace(/\./g, "")}%`,
            }
          ),
        },
        _response = {};

      _response.hotels = await Hotel.findAll({
        where: whereHotel,
        attributes: ["id", "hotelCode", "hotelName", "cityCode"],
        limit: 15,
      });
      _response.location = await HotelLocation.findAll({
        where: whereLocation,
        attributes: ["locationCode", "locationName"],
        limit: 15,
      });
      _response.city = await HotelCity.findAll({
        where: whereCity,
        attributes: ["cityCode", "cityName"],
        limit: 15,
      });
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  async getAllCountries() {
    try {
      const result = await sequelize.query(
        `SELECT hotel_countries.country_name AS countryName, hotel_currencies.currency_code AS countryCode, hotel_currencies.currency, hotel_currencies.currency_code AS currencyCode FROM hotel_countries LEFT JOIN hotel_currencies ON hotel_currencies.country_code = hotel_countries.country_code;`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async fetchCityData(cityCode) {
    try {
      const result = await sequelize.query(
        `SELECT hotel_cities.city_name AS cityName, hotel_countries.country_name AS countryName FROM hotel_cities LEFT JOIN hotel_countries ON hotel_cities.country_code = hotel_countries.country_code WHERE hotel_cities.city_code=${cityCode} GROUP BY hotel_cities.id`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
