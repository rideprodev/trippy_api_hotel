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

      // ------------- Hotel Start ------------
      const whereHotel2Word = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
          {
            [Op.like]: `${splitName}%`,
          }
        ),
      };
      const whereHotelFullWord = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
          {
            [Op.like]: `%${name}%`,
          }
        ),
      };
      const hotels = await Hotel.findAll({
        where: whereHotel2Word,
        attributes: ["hotelCode", "hotelName", "cityCode", "countryCode"],
        limit: 100,
      });
      const hotels1 = await Hotel.findAll({
        where: whereHotelFullWord,
        attributes: ["hotelCode", "hotelName", "cityCode", "countryCode"],
        limit: 15,
      });
      const hotelList = hotels.map((hotel) => ({
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        cityCode: hotel.cityCode,
        countryCode: hotel.countryCode,
      }));
      const hotel1List = hotels1.map((hotel) => ({
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        cityCode: hotel.cityCode,
        countryCode: hotel.countryCode,
      }));
      const hotel = [...hotelList, ...hotel1List];

      const uniqueHotels = hotel.reduce((acc, curr) => {
        if (!acc.find((item) => item.hotelCode === curr.hotelCode)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const fuseHotel = new Fuse(uniqueHotels, {
        keys: ["hotelName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      const hotelNames = name
        ? fuseHotel.search(name).map((result) => result.item)
        : hotel;
      // ------------- Hotel End ------------
      // ------------- City Start ------------
      const whereCity2Words = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
          { [Op.like]: `${splitName}%` }
        ),
      };
      const whereCityFullWords = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
          { [Op.like]: `%${name}%` }
        ),
      };
      // fetching city data start
      const city = await HotelCity.findAll({
        attributes: ["cityCode", "cityName", "countryCode"],
        limit: 1000,
        where: whereCity2Words,
      });
      const city1 = await HotelCity.findAll({
        attributes: ["cityCode", "cityName", "countryCode"],
        limit: 100,
        where: whereCityFullWords,
      });

      const cityList = city.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryCode: city.countryCode,
      }));

      const city1List = city1.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryCode: city.countryCode,
      }));

      const cities = [...cityList, ...city1List];

      const uniqueCities = cities.reduce((acc, curr) => {
        if (!acc.find((item) => item.cityCode === curr.cityCode)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const fuseCity = new Fuse(uniqueCities, {
        keys: ["cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      const cityNames = name
        ? fuseCity.search(name).map((result) => result.item)
        : cities;
      // ------------- City End ------------
      // ------------- Location Start ------------
      const whereLocation2Words = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
          { [Op.like]: `${splitName}%` }
        ),
      };
      const whereLocationFullWords = {
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
          { [Op.like]: `%${name}%` }
        ),
      };
      const cityCodes = cityNames.map((city) => city.cityCode);

      const cityMaps = await HotelLocationCityMap.findAll({
        where: { cityCode: cityCodes },
        limit: 15,
      });

      const locationCodes = cityMaps.map((map) => map.locationCode);

      const location = await HotelLocation.findAll({
        where: { locationCode: locationCodes },
        attributes: ["locationCode", "locationName", "countryCode"],
        limit: 15,
      });
      const location2Word = await HotelLocation.findAll({
        where: whereLocation2Words,
        attributes: ["locationCode", "locationName", "countryCode"],
        limit: 100,
      });
      const locationFullWord = await HotelLocation.findAll({
        where: whereLocationFullWords,
        attributes: ["locationCode", "locationName", "countryCode"],
        limit: 15,
      });

      const locationList = location.map((loc) => ({
        locationCode: loc.locationCode,
        locationName: loc.locationName,
        countryCode: loc.countryCode,
      }));
      const location1List = location2Word.map((loc) => ({
        locationCode: loc.locationCode,
        locationName: loc.locationName,
        countryCode: loc.countryCode,
      }));
      const location2List = locationFullWord.map((loc) => ({
        locationCode: loc.locationCode,
        locationName: loc.locationName,
        countryCode: loc.countryCode,
      }));

      const locations = [...locationList, ...location1List, ...location2List];

      const uniqueLocations = locations.reduce((acc, curr) => {
        if (!acc.find((item) => item.cityCode === curr.cityCode)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const fuseLocation = new Fuse(uniqueLocations, {
        keys: ["locationName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      const locationNames = name
        ? fuseLocation.search(name).map((result) => result.item)
        : locations;
      // ------------- Location End ------------

      const response = {
        hotels: hotelNames,
        location: locationNames,
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
