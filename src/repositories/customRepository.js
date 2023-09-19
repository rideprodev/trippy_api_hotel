import models from "../models";
const {
  Hotel,
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

const getObject = (queryData, model = "airports") => {
  if (model === "airports") {
    return {
      model: HotelAirports,
      where: {
        [Op.or]: [
          { airportCode: { [Op.like]: `%${queryData.name}%` } },
          { airportName: { [Op.like]: `%${queryData.name}%` } },
          { cityCode: { [Op.like]: `%${queryData.name}%` } },
          { cityName: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "cities") {
    return {
      model: HotelCity,
      where: {
        [Op.or]: [
          { cityCode: { [Op.like]: `%${queryData.name}%` } },
          { cityName: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
          { destinationCode: { [Op.like]: `%${queryData.name}%` } },
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
  } else if (model === "langauges") {
    return {
      model: HotelLanguage,
      where: {
        [Op.or]: [
          { languageCode: { [Op.like]: `%${queryData.name}%` } },
          { language: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "areas") {
    return {
      model: HotelArea,
      where: {
        [Op.or]: [
          { areaCode: { [Op.like]: `%${queryData.name}%` } },
          { areaName: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
          { countryName: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "destinations") {
    return {
      model: HotelDestination,
      where: {
        [Op.or]: [
          { destinationCode: { [Op.like]: `%${queryData.name}%` } },
          { destinationName: { [Op.like]: `%${queryData.name}%` } },
          { countryCode: { [Op.like]: `%${queryData.name}%` } },
        ],
      },
    };
  } else if (model === "facilities") {
    return {
      model: HotelFacilities,
      where: {
        [Op.or]: [
          { facilityCode: { [Op.like]: `%${queryData.name}%` } },
          { facilityName: { [Op.like]: `%${queryData.name}%` } },
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
          [Op.or]: [{ cityName: { [Op.like]: `%${name}%` } }],
        },
        whereHotel = {
          [Op.or]: [{ hotelName: { [Op.like]: `%${name}%` } }],
        },
        _response = {};

      _response.hotels = await Hotel.findAll({
        where: whereHotel,
        attributes: ["id", "hotelCode", "hotelName", "cityCode"],
        limit: 15,
      });
      _response.location = await HotelCity.findAll({
        where: whereCity,
        attributes: ["cityCode", "cityName"],
        limit: 15,
      });
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
