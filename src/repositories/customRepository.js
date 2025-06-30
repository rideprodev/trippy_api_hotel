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
import { x } from "joi";
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
   * Get All Places Where (Hotels) - Enhanced with Fuzzy Search
   * @param {object} req
   */
  async getAllPlacesHotel(req, res) {
    try {
      const { name } = req.query;
      
      // Input validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return { hotels: [] };
      }
      
      const _response = {};

      // First get potential matches using database LIKE search
      const searchTerm = name.replace(/\./g, "").trim();
      const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 1);
      
      // For multi-word searches, use AND logic to find hotels containing all words
      let whereCondition;
      if (searchWords.length > 1) {
        // Build AND conditions for each word
        const andConditions = searchWords.map(word => ({
          hotelName: {
            [Op.like]: `%${word}%`
          }
        }));
        whereCondition = { [Op.and]: andConditions };
      } else {
        // Single word or phrase search
        whereCondition = {
          [Op.or]: [
            {
              hotelName: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            {
              $col: Sequelize.where(
                Sequelize.fn("replace", Sequelize.col("hotel_name"), ".", ""),
                { [Op.like]: `%${searchTerm}%` }
              )
            }
          ]
        };
      }
      
      const potentialHotels = await Hotel.findAll({
        where: whereCondition,
        group: ["hotelCode"],
        attributes: ["hotelCode", "hotelName", "cityCode", "countryCode"],
        include: [
          {
            attributes: ["cityName"],
            model: HotelCity,
            as: "cityData",
          },
          {
            attributes: ["countryName"],
            model: HotelCountry,
            as: "countryData",
          },
        ],
        limit: 200, // Get more potential matches for fuzzy search
      });

      // Configure Fuse.js for fuzzy search
      const fuseOptions = {
        keys: ['hotelName'],
        threshold: 0.4, // Lower = more strict, higher = more fuzzy
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        includeScore: true,
        includeMatches: true,
        ignoreLocation: true, // Allow matches anywhere in the string
        findAllMatches: true // Find all matching words
      };

      // If we have potential matches, apply fuzzy search for better ranking
      let searchResults;
      if (potentialHotels.length > 0) {
        const fuse = new Fuse(potentialHotels, fuseOptions);
        const fuseResults = fuse.search(searchTerm);
        
        // If fuzzy search returns results with good scores, use them
        if (fuseResults.length > 0) {
          // For multi-word searches, be more permissive with scoring
          const scoreThreshold = searchWords.length > 1 ? 0.7 : 0.6;
          searchResults = fuseResults.filter(result => result.score <= scoreThreshold);
          
          // If no good fuzzy matches, fall back to database results
          if (searchResults.length === 0) {
            searchResults = potentialHotels.map((item, index) => ({
              item: item,
              score: 0.1 // Low score for exact matches
            }));
          }
        } else {
          // Convert database results to Fuse.js format for consistent handling
          searchResults = potentialHotels.map((item, index) => ({
            item: item,
            score: 0.1 // Low score for exact matches
          }));
        }
      } else {
        searchResults = [];
      }

      // Sort by relevance score and limit results
      const sortedResults = searchResults
        .sort((a, b) => a.score - b.score)
        .slice(0, 30)
        .map(result => result.item);

      _response.hotels = sortedResults.map((x) => {
        return {
          hotelCode: x.hotelCode,
          hotelName: x.hotelName,
          cityCode: x.cityCode,
          cityName: x?.cityData?.cityName ? x.cityData.cityName : null,
          countryName: x?.countryData?.countryName
            ? x.countryData.countryName
            : null,
        };
      });
      
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Places Where (Cities) - Enhanced with Fuzzy Search
   * @param {object} req
   */
  async getAllPlacesCity(req, res) {
    try {
      const { name } = req.query;
      
      // Input validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return { city: [] };
      }
      
      const _response = {};

      // First get potential matches using database LIKE search
      const searchTerm = name.replace(/\./g, "").trim();
      const potentialCities = await HotelCity.findAll({
        where: {
          [Op.or]: [
            {
              cityName: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            {
              $col: Sequelize.where(
                Sequelize.fn("replace", Sequelize.col("city_name"), ".", ""),
                { [Op.like]: `%${searchTerm}%` }
              )
            }
          ]
        },
        group: ["cityCode"],
        include: {
          attributes: ["countryName"],
          model: HotelCountry,
          as: "countryData",
        },
        attributes: ["cityCode", "cityName", "countryCode"],
        limit: 200, // Get more potential matches for fuzzy search
        order: [[sequelize.fn("length", sequelize.col("cityName")), "ASC"]],
      });

      // Configure Fuse.js for fuzzy search on cities
      const fuseOptions = {
        keys: ['cityName'],
        threshold: 0.3, // Slightly more strict for city names
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        includeScore: true,
        includeMatches: true
      };

      // If we have potential matches, apply fuzzy search for better ranking
      let searchResults;
      if (potentialCities.length > 0) {
        const fuse = new Fuse(potentialCities, fuseOptions);
        const fuseResults = fuse.search(searchTerm);
        
        // If fuzzy search returns results with good scores, use them
        if (fuseResults.length > 0) {
          // Filter out poor matches (score > 0.5 means poor match for cities)
          searchResults = fuseResults.filter(result => result.score <= 0.5);
          
          // If no good fuzzy matches, fall back to database results
          if (searchResults.length === 0) {
            searchResults = potentialCities.map((item, index) => ({
              item: item,
              score: 0.1 // Low score for exact matches
            }));
          }
        } else {
          // Convert database results to Fuse.js format for consistent handling
          searchResults = potentialCities.map((item, index) => ({
            item: item,
            score: 0.1 // Low score for exact matches
          }));
        }
      } else {
        // If no database matches, try a broader search for fuzzy matching
        console.log(`No direct matches for '${searchTerm}', trying broader search...`);
        const broaderCities = await HotelCity.findAll({
          group: ["cityCode"],
          include: {
            attributes: ["countryName"],
            model: HotelCountry,
            as: "countryData",
          },
          attributes: ["cityCode", "cityName", "countryCode"],
          limit: 2000, // Get more cities for fuzzy matching
          order: [["cityCode", "ASC"]],
        });
        
        if (broaderCities.length > 0) {
          const fuse = new Fuse(broaderCities, {
            ...fuseOptions,
            threshold: 0.4, // More permissive for broader search
          });
          const fuseResults = fuse.search(searchTerm);
          searchResults = fuseResults;
        } else {
          searchResults = [];
        }
      }

      // Sort by relevance score and city name length
      const sortedResults = searchResults
        .sort((a, b) => {
          // Primary sort: relevance score (lower is better)
          if (Math.abs(a.score - b.score) > 0.01) {
            return a.score - b.score;
          }
          // Secondary sort: shorter city names first (same relevance)
          return (a.item.cityName?.length || 0) - (b.item.cityName?.length || 0);
        })
        .slice(0, 20)
        .map(result => result.item);

      _response.city = sortedResults.map((x) => {
        return {
          cityCode: x.cityCode,
          cityName: x?.cityName ? x.cityName : null,
          countryName: x?.countryData?.countryName
            ? x.countryData.countryName
            : null,
        };
      });
      
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Places Where (Locations) - Enhanced with Fuzzy Search
   * @param {object} req
   */
  async getAllPlacesLocation(req, res) {
    try {
      const { name } = req.query;
      
      // Input validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return { location: [] };
      }
      
      const _response = {};

      // First get potential matches using database LIKE search
      const searchTerm = name.replace(/\./g, "").trim();
      const potentialLocations = await HotelLocation.findAll({
        where: {
          [Op.or]: [
            {
              locationName: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            {
              $col: Sequelize.where(
                Sequelize.fn("replace", Sequelize.col("location_name"), ".", ""),
                { [Op.like]: `%${searchTerm}%` }
              )
            }
          ]
        },
        attributes: ["locationCode", "locationName", "countryCode"],
        group: ["locationCode"],
        include: [
          {
            attributes: ["cityCode"],
            model: HotelLocationCityMap,
            as: "locationMapData",
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
        limit: 200, // Get more potential matches for fuzzy search
        order: [[sequelize.fn("length", sequelize.col("locationName")), "ASC"]],
      });

      // Filter locations that have mapping data
      const validLocations = potentialLocations.filter((x) => x.locationMapData);

      // Configure Fuse.js for fuzzy search on locations
      const fuseOptions = {
        keys: ['locationName'],
        threshold: 0.3, // Slightly more strict for location names
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        includeScore: true,
        includeMatches: true
      };

      // If we have potential matches, apply fuzzy search for better ranking
      let searchResults;
      if (validLocations.length > 0) {
        const fuse = new Fuse(validLocations, fuseOptions);
        const fuseResults = fuse.search(searchTerm);
        
        // If fuzzy search returns results with good scores, use them
        if (fuseResults.length > 0) {
          // Filter out poor matches (score > 0.5 means poor match for locations)
          searchResults = fuseResults.filter(result => result.score <= 0.5);
          
          // If no good fuzzy matches, fall back to database results
          if (searchResults.length === 0) {
            searchResults = validLocations.map((item, index) => ({
              item: item,
              score: 0.1 // Low score for exact matches
            }));
          }
        } else {
          // Convert database results to Fuse.js format for consistent handling
          searchResults = validLocations.map((item, index) => ({
            item: item,
            score: 0.1 // Low score for exact matches
          }));
        }
      } else {
        searchResults = [];
      }

      // Sort by relevance score and location name length
      const sortedResults = searchResults
        .sort((a, b) => {
          // Primary sort: relevance score (lower is better)
          if (Math.abs(a.score - b.score) > 0.01) {
            return a.score - b.score;
          }
          // Secondary sort: shorter location names first (same relevance)
          return (a.item.locationName?.length || 0) - (b.item.locationName?.length || 0);
        })
        .slice(0, 15)
        .map(result => result.item);

      _response.location = sortedResults.map((x) => {
        return {
          locationCode: x.locationCode,
          locationName: x.locationName,
          cityCode: x?.locationMapData?.cityCode
            ? x.locationMapData.cityCode
            : null,
          cityName: x?.locationMapData?.cityData?.cityName
            ? x.locationMapData.cityData.cityName
            : null,
          countryName: x?.locationMapData?.cityData?.countryData?.countryName
            ? x.locationMapData.cityData.countryData.countryName
            : null,
        };
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
      console.log(`🏙️ Fetching city data for cityCode: ${cityCode}`);
      const result = await sequelize.query(
        `SELECT hotel_cities.city_name AS cityName, hotel_countries.country_name AS countryName FROM hotel_cities LEFT JOIN hotel_countries ON hotel_cities.country_code = hotel_countries.country_code WHERE hotel_cities.city_code=${cityCode} GROUP BY hotel_cities.city_code`,
        { type: sequelize.QueryTypes.SELECT }
      );
      console.log(`✅ City data fetched: ${result.length} records`);
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
