import models from "../models";
const {
  Hotel,
  HotelCity,
  HotelCountry,
  HotelLocation,
  HotelCurrency,
  HotelLocationCityMap,
  sequelize,
} = models;
import { Op, Sequelize } from "sequelize";
import Fuse from "fuse.js";

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
  async getAllPlaces(req, res) {
    try {
      let { name } = req.query;
      name = `${name.replace(/\./g, "")}`;
      const splitName = `${name}`.substring(0, 2);
      const whereCity = {
        cityName: { [Op.like]: `${splitName}%` },
      };
      const whereHotel = {
        hotelName: { [Op.like]: `${name}%` },
      };
      const city = await HotelCity.findAll({
        attributes: ["cityCode", "cityName", "countryCode"],
        limit: 1000,
        where: whereCity,
      });

      const cityList = city.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryCode: city.countryCode,
      }));

      const fuse = new Fuse(cityList, {
        keys: ["cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      const cityNames = name
        ? fuse.search(name).map((result) => result.item)
        : cityList;

      const cityCodes = cityNames.map((city) => city.cityCode);

      const cityMaps = await HotelLocationCityMap.findAll({
        where: { cityCode: cityCodes },
        limit: 15,
      });

      const locationCodes = cityMaps.map((map) => map.locationCode);
      //console.log("Location Codes:", locationCodes);

      const location = await HotelLocation.findAll({
        where: { locationCode: locationCodes },
        attributes: ["locationCode", "locationName", "countryCode"],
        limit: 15,
      });
      const hotels = await Hotel.findAll({
        where: whereHotel,
        attributes: ["hotelCode", "hotelName", "cityCode", "countryCode"],
        limit: 15,
      });

      const response = {
        hotels: hotels,
        location: location,
        city: cityNames,
      };

      return response;
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
        `SELECT hotel_cities.city_name AS cityName, hotel_countries.country_name AS countryName FROM hotel_cities LEFT JOIN hotel_countries ON hotel_cities.country_code = hotel_countries.country_code WHERE hotel_cities.city_code=${cityCode} GROUP BY hotel_cities.city_code`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
