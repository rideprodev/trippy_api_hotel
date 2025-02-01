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
import spellchecker from "simple-spellchecker";
const dictionary = spellchecker.getDictionarySync("en-US");

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
  async getAllPlacesHotel(req, res) {
    try {
      let { name } = req.query;
      name = `${name.replace(/\./g, "")}`;
      let hotels = [];
      const searchWhere = [];

      // ------------- Hotel Start ------------
      const uselessWordsArray = [
        "a",
        "at",
        "be",
        "can",
        "cant",
        "could",
        "couldnt",
        "do",
        "does",
        "how",
        "i",
        "in",
        "is",
        "many",
        "much",
        "of",
        "on",
        "or",
        "should",
        "shouldnt",
        "so",
        "such",
        "the",
        "them",
        "they",
        "to",
        "us",
        "we",
        "what",
        "who",
        "why",
        "with",
        "wont",
        "would",
        "wouldnt",
        "you",
      ];
      const expStr = uselessWordsArray.join("|");
      const newname = name
        .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const searchSplite = `${newname}`.split(" ");
      for (let index = 0; index < searchSplite.length; index++) {
        let element = searchSplite[index];
        const splitName = `${element}`.substring(0, 2);
        let isSuggesstion = false;
        if (dictionary.spellCheck(element) === false) {
          const suggestions = dictionary.getSuggestions(element, 1);
          if (suggestions.length > 0) {
            element = suggestions[0];
            isSuggesstion = true;
          }
        }

        if (isSuggesstion !== true) {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `${splitName}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `%${element}` }
            ),
          });
        } else {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
              { [Op.like]: `${splitName}%` }
            ),
          });
        }
      }

      searchWhere.push({
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
          { [Op.like]: `${name}%` }
        ),
      });

      const whereHotelElementWords = [
        {
          [Op.or]: searchWhere,
        },
      ];

      const hotelsElement = await Hotel.findAll({
        where: whereHotelElementWords,
        attributes: ["hotelCode", "hotelName"],
        limit: 2000,
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

      const hotelList = hotelsElement.map((hotel) => ({
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        cityCode: hotel.cityData.cityCode,
        cityName: hotel.cityData.cityName,
        countryName: hotel.countryData.countryName,
      }));

      const fuseHotel = new Fuse(hotelList, {
        keys: ["hotelName", "cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      await searchSplite.map((x) => {
        const fuseData = fuseHotel.search(x).map((result) => result.item);
        if (fuseData.length > 0) {
          hotels = [...hotels, ...fuseData];
        }
        return;
      });

      const uniqueHotels = hotels.reduce((acc, curr) => {
        if (!acc.find((item) => item.hotelCode === curr.hotelCode)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const hotel =
        uniqueHotels.length > 0
          ? uniqueHotels.slice(0, 20)
          : hotels.slice(0, 20);

      const response = {
        lenght: hotel.length,
        hotels: hotel,
      };
      return response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Plcaes Where
   * @param {object} req
   */
  async getAllPlacesCity(req, res) {
    try {
      let { name } = req.query;
      name = `${name.replace(/\./g, "")}`;
      let cities = [];
      const searchWhere = [];

      // ------------- City Start ------------

      const uselessWordsArray = [
        "a",
        "at",
        "be",
        "can",
        "cant",
        "could",
        "couldnt",
        "do",
        "does",
        "how",
        "i",
        "in",
        "is",
        "many",
        "much",
        "of",
        "on",
        "or",
        "should",
        "shouldnt",
        "so",
        "such",
        "the",
        "them",
        "they",
        "to",
        "us",
        "we",
        "what",
        "who",
        "why",
        "with",
        "wont",
        "would",
        "wouldnt",
        "you",
        "hotel",
      ];
      const expStr = uselessWordsArray.join("|");
      const newname = name
        .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const searchSplite = `${newname}`.split(" ");
      for (let index = 0; index < searchSplite.length; index++) {
        let element = searchSplite[index];
        let splitName = `${element}`.substring(0, 2);
        let isSuggesstion = false;
        if (dictionary.spellCheck(element) === false) {
          const suggestions = dictionary.getSuggestions(element, 1);
          if (suggestions.length > 0) {
            element = suggestions[0];
            isSuggesstion = true;
          }
        }

        if (isSuggesstion !== true) {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `${splitName}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `%${element}` }
            ),
          });
        } else {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
              { [Op.like]: `${splitName}%` }
            ),
          });
        }
      }

      searchWhere.push({
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
          { [Op.like]: `${name}%` }
        ),
      });

      const whereHotelElementWords = [
        {
          [Op.or]: searchWhere,
        },
      ];
      // fetching city data start
      const cityElement = await HotelCity.findAll({
        attributes: ["cityCode", "cityName"],
        limit: 3000,
        where: whereHotelElementWords,
        include: {
          attributes: ["countryName"],
          model: HotelCountry,
          as: "countryData",
        },
      });

      const cityList = cityElement.map((city) => ({
        cityCode: city.cityCode,
        cityName: city.cityName,
        countryName: city.countryData.countryName,
      }));

      const fuseCity = new Fuse(cityList, {
        keys: ["cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      await searchSplite.map((x) => {
        const fuseData = fuseCity.search(x).map((result) => result.item);
        if (fuseData.length > 0) {
          cities = [...cities, ...fuseData];
        }
        return;
      });

      const uniqueCities = cities.reduce((acc, curr) => {
        if (
          !acc.find(
            (item) =>
              item.cityCode === curr.cityCode &&
              item.countryName === curr.countryName
          )
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);
      const cityNames =
        uniqueCities.length > 0 ? uniqueCities.slice(0, 3) : cities.slice(0, 3);
      // ------------- City End ------------
      // ------------- Location Start ------------
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

      const locationList = locationCityMaps.map((loc) => ({
        locationCode: loc.locationCode,
        cityCode: loc.cityCode,
        cityName: loc.cityData.cityName,
        countryName: loc.cityData.countryData.countryName,
        locationName: loc.locationData.locationName,
      }));

      const uniqueLocations = locationList.reduce((acc, curr) => {
        if (
          !acc.find(
            (item) =>
              item.cityCode === curr.cityCode &&
              item.locationCode === curr.locationCode
          )
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const fuseLocation = new Fuse(uniqueLocations, {
        keys: ["locationName", "cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      let locationData = [];
      await searchSplite.map((x) => {
        const fuseData = fuseLocation.search(x).map((result) => result.item);
        if (fuseData.length > 0) {
          locationData = [...locationData, ...fuseData];
        }
        return;
      });

      const locationName = locationData.slice(0, 10);
      // ------------- Location End ------------

      const response = {
        city: cityNames,
        location: locationName,
      };
      return response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Plcaes Where
   * @param {object} req
   */
  async getAllPlacesLocation(req, res) {
    try {
      let { name } = req.query;
      name = `${name.replace(/\.,/g, "")}`;
      let locations = [];
      const searchWhere = [];

      // ------------- Location Start ------------
      const uselessWordsArray = [
        "a",
        "at",
        "be",
        "can",
        "cant",
        "could",
        "couldnt",
        "do",
        "does",
        "how",
        "i",
        "in",
        "is",
        "many",
        "much",
        "of",
        "on",
        "or",
        "should",
        "shouldnt",
        "so",
        "such",
        "the",
        "them",
        "they",
        "to",
        "us",
        "we",
        "what",
        "who",
        "why",
        "with",
        "wont",
        "would",
        "wouldnt",
        "you",
        "hotel",
      ];
      const expStr = uselessWordsArray.join("|");
      const newname = name
        .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const searchSplite = `${newname}`.split(" ");

      for (let index = 0; index < searchSplite.length; index++) {
        let element = searchSplite[index];
        let splitName = "";
        if (dictionary.spellCheck(element) === false) {
          const suggestions = dictionary.getSuggestions(element, 1);
          if (suggestions.length > 0) {
            element = suggestions[0];
          } else {
            splitName = `${element}`.substring(0, 2);
          }
        }

        if (splitName !== "") {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
              { [Op.like]: `${splitName}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
              { [Op.like]: `${element}%` }
            ),
          });
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
              { [Op.like]: `%${element}` }
            ),
          });
        } else {
          searchWhere.push({
            $col: Sequelize.where(
              Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
              { [Op.like]: `%${element}%` }
            ),
          });
        }
      }

      // ------------- Location End ------------
      searchWhere.push({
        $col: Sequelize.where(
          Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
          { [Op.like]: `${name}%` }
        ),
      });

      const whereLocationElementWords = [
        {
          [Op.or]: searchWhere,
        },
      ];

      const locationElement = await HotelLocation.findAll({
        where: whereLocationElementWords,
        attributes: ["locationCode", "locationName"],
        limit: 3000,
        group: ["locationCode"],
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

      const locationElementList = locationElement.map((loc) => ({
        locationCode: loc.locationCode,
        cityCode: loc.locationMapData.cityCode,
        cityName: loc.locationMapData.cityData.cityName,
        countryName: loc.locationMapData.cityData.countryData.countryName,
        locationName: loc.locationName,
      }));

      const fuseLocation = new Fuse(locationElementList, {
        keys: ["locationName", "cityName"],
        minMatchCharLength: 2,
        threshold: 0.3,
      });

      await searchSplite.map((x) => {
        const fuseData = fuseLocation.search(x).map((result) => result.item);
        if (fuseData.length > 0) {
          locations = [...locations, ...fuseData];
        }
        return;
      });

      const uniqueLocations = locations.reduce((acc, curr) => {
        if (
          !acc.find(
            (item) =>
              item.cityCode === curr.cityCode &&
              item.countryName === curr.countryName
          )
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const location =
        uniqueLocations.length > 0
          ? uniqueLocations.slice(0, 20)
          : locations.slice(0, 20);

      const response = {
        length: location.length,
        location: location,
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
