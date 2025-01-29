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
        attributes: ["hotelCode", "hotelName"],
        limit: 100,
        include: [
          {
            attributes: ["cityCode", "cityName"],
            model: HotelCity,
            as: "cityData",
          },
          {
            attributes: ["countryName"],
            model: HotelCountry,
            as: "countryData",
          },
        ],
      });
      const hotels1 = await Hotel.findAll({
        where: whereHotelFullWord,
        attributes: ["hotelCode", "hotelName", "cityCode", "countryCode"],
        limit: 15,
        include: [
          {
            attributes: ["cityCode", "cityName"],
            model: HotelCity,
            as: "cityData",
          },
          {
            attributes: ["countryName"],
            model: HotelCountry,
            as: "countryData",
          },
        ],
      });
      const hotelList = hotels.map((hotel) => ({
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        cityCode: hotel.cityData.cityCode,
        cityName: hotel.cityData.cityName,
        countryName: hotel.countryData.countryName,
      }));
      const hotel1List = hotels1.map((hotel) => ({
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        cityCode: hotel.cityData.cityCode,
        cityName: hotel.cityData.cityName,
        countryName: hotel.countryData.countryName,
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
        attributes: ["cityCode", "cityName"],
        limit: 1000,
        where: whereCity2Words,
        include: {
          attributes: ["countryName"],
          model: HotelCountry,
          as: "countryData",
        },
      });
      const city1 = await HotelCity.findAll({
        attributes: ["cityCode", "cityName"],
        limit: 100,
        where: whereCityFullWords,
        include: {
          attributes: ["countryName"],
          model: HotelCountry,
          as: "countryData",
        },
      });

      const cityList = city.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryName: city.countryData.countryName,
      }));

      const city1List = city1.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryName: city.countryData.countryName,
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

      let cityData = name
        ? fuseCity.search(name).map((result) => result.item)
        : cities;
      const cityNames = cityData.slice(0, 3);
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

      const locationCityMaps = await HotelLocationCityMap.findAll({
        attributes: ["locationCode", "cityCode"],
        where: { cityCode: cityCodes },
        limit: 100,
        group: ["locationCode"],
        include: [
          {
            attributes: ["cityName"],
            model: HotelCity,
            as: "cityData",
            include: {
              attributes: ["countryName"],
              model: HotelCountry,
              as: "countryData",
            },
          },
          {
            attributes: ["locationName"],
            model: HotelLocation,
            as: "locationData",
          },
        ],
      });

      const location2Word = await HotelLocation.findAll({
        where: whereLocation2Words,
        attributes: ["locationCode", "locationName"],
        limit: 1000,
        include: [
          {
            attributes: ["cityCode"],
            model: HotelLocationCityMap,
            as: "locationMapData",
            required: true,
            include: {
              attributes: ["cityName"],
              model: HotelCity,
              as: "cityData",
              include: {
                attributes: ["countryName"],
                model: HotelCountry,
                as: "countryData",
              },
            },
          },
        ],
      });

      const locationFullWord = await HotelLocation.findAll({
        where: whereLocationFullWords,
        attributes: ["locationCode", "locationName", "countryCode"],
        limit: 15,
        include: [
          {
            attributes: ["cityCode"],
            model: HotelLocationCityMap,
            as: "locationMapData",
            required: true,
            include: {
              attributes: ["cityName"],
              model: HotelCity,
              as: "cityData",
              include: {
                attributes: ["countryName"],
                model: HotelCountry,
                as: "countryData",
              },
            },
          },
        ],
      });

      const locationList = locationCityMaps.map((loc) => ({
        locationCode: loc.locationCode,
        cityCode: loc.cityCode,
        cityName: loc.cityData.cityName,
        countryName: loc.cityData.countryData.countryName,
        locationName: loc.locationData.locationName,
      }));

      const location1List = location2Word.map((loc) => ({
        locationCode: loc.locationCode,
        cityCode: loc.locationMapData.cityCode,
        cityName: loc.locationMapData.cityData.cityName,
        countryName: loc.locationMapData.cityData.countryData.countryName,
        locationName: loc.locationName,
      }));

      const location2List = locationFullWord.map((loc) => ({
        locationCode: loc.locationCode,
        cityCode: loc.locationMapData.cityCode,
        cityName: loc.locationMapData.cityData.cityName,
        countryName: loc.locationMapData.cityData.countryData.countryName,
        locationName: loc.locationName,
      }));

      const locations = [...location1List, ...location2List];

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

      const locationData = name
        ? fuseLocation.search(name).map((result) => result.item)
        : locations;

      const fuseLocationSlice = locationData.slice(0, 30);
      const locationNames = [...locationList, ...fuseLocationSlice];
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
