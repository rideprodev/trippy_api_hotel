import models from "../models";
const {
  Hotel,
  HotelCity,
  HotelImage,
  HotelDestination,
  HotelCountry,
  Bidding,
  BiddingPrices,
} = models;
import { Op } from "sequelize";
import genrateResponse from "../services/responseGenrater";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";

export default {
  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async getSessionToken(req) {
    try {
      // fetch token from settings
      return "63ad347002ca3e1c01eb4a3ed7c89985";
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Hotel Token
   * @param {Object} where
   */
  async fetchAll(where) {
    try {
      return await Hotel.findAll({
        where,
      });
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
      const _request_data = {
        rooms: bodyData.rooms,
        hotel_codes: ["1848138"], //bodyData.hotelCode,
        rates: "comprehensive",
        currency: bodyData.currency,
        client_nationality: bodyData.client_nationality,
        checkin: bodyData.checkIn,
        checkout: bodyData.checkOut,
      };
      const _response = await requestHandler.fetchResponseFromHotel(
        GRN_Apis.search,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      // if (_response !== undefined) {
      //   this.genrateAirlineLogger(
      //     req,
      //     _response.status,
      //     _response.message,
      //     GRN_Apis.search,
      //     false
      //   );
      // }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get airline Token
   * @param {Object} where
   */
  async refetch(req) {
    try {
      const { hcode } = req.query;
      const { serchId } = req.params;
      const apiEndPoint = GRN_Apis.search;
      apiEndPoint.url = `${apiEndPoint.url}/${serchId}${
        hcode ? `?hcode=${hcode}` : ""
      }`;
      apiEndPoint.method = "get";
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken()
      );
      // console.log(_response);
      // if (_response !== undefined) {
      //   this.genrateAirlineLogger(
      //     req,
      //     _response.status,
      //     _response.message,
      //     apiEndPoint,
      //     false
      //   );
      // }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get airline Token
   * @param {Object} where
   */
  async revalidate(req) {
    try {
      const bodyData = req.body;
      const _request_data = {
        group_code: bodyData.group_code,
        rate_key: bodyData.rate_key,
      };
      const apiEndPoint = GRN_Apis.search;
      apiEndPoint.url = `${apiEndPoint.url}/${bodyData.search_id}/rates/auto?action=recheck`;
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      // if (_response !== undefined) {
      //   this.genrateAirlineLogger(
      //     req,
      //     _response.status,
      //     _response.message,
      //     apiEndPoint,
      //     false
      //   );
      // }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get airline Token
   * @param {Object} where
   */
  async booking(req) {
    try {
      const bodyData = req.body;
      const membersData = req.members;
      let holder = {};

      //  Set Holder Data
      const holderData = membersData.filter((x) => x.id == bodyData.holder);
      if (holderData.length > 0) {
        const holderInfo = holderData[0];
        holder = {
          title: holderInfo.title,
          name: holderInfo.firstName,
          surname: holderInfo.lastName,
          email: holderInfo.email,
          phone_number: holderInfo.phoneNumber,
          client_nationality: holderInfo.nationality,
          pan_number: "CBJKK3320T",
        };

        //  Set Booking Items
        for (let index = 0; index < bodyData.booking_items.length; index++) {
          const e = bodyData.booking_items[index];
          for (let i = 0; i < e.rooms.length; i++) {
            e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
              const paxesData = membersData.filter((item) => item.id === x)[0];
              return {
                title: paxesData.title,
                name: paxesData.firstName,
                surname: paxesData.lastName,
                type: paxesData.type === "ADT" ? "AD" : "CH",
                age: e.rooms[i].ages[k],
              };
            });
            delete e.rooms[i].ages;
            // console.log(e.rooms[i]);
          }
        }

        // console.log(bodyData.booking_items[0].rooms[0].paxes);

        // Request Data
        const _request_data = {
          search_id: bodyData.search_id,
          hotel_code: bodyData.hotel_code,
          city_code: bodyData.city_code,
          group_code: bodyData.group_code,
          checkout: bodyData.checkout,
          checkin: bodyData.checkin,
          booking_comments: bodyData.booking_comments,
          booking_items: bodyData.booking_items,
          payment_type: "AT_WEB",
          agent_reference: "",
          holder: holder,
        };
        // console.log(_request_data);
        const _response = await requestHandler.fetchResponseFromHotel(
          GRN_Apis.booking,
          await this.getSessionToken(),
          _request_data
        );

        // console.log(_response, "_response");

        if (_response !== undefined) {
          // this.genrateAirlineLogger(
          //   req,
          //   _response.status,
          //   _response.message,
          //   GRN_Apis.booking,
          //   false
          // );
          // need to add condition
          // const bookingData = {};
          // const booking = await HotelBooking.create(bookingData);
        }
        return _response;
      } else {
        return "holderNotFound";
      }
    } catch (error) {
      throw Error(error);
    }
  },

  async updateLatestPrice(bodyData) {
    const priceData = {
      userId: bodyData.userId,
      biddingId: bodyData.biddingId,
      latestPrice: bodyData.latestPrice,
    };
    return await BiddingPrices.create(priceData);
  },

  async placeMyBid(req) {
    try {
      const bodyData = req.body;
      bodyData.userId = req.user.id;
      bodyData.membersId = JSON.stringify(bodyData.membersId);
      const _response = await Bidding.create(bodyData);
      bodyData.biddingId = _response.id;
      await this.updateLatestPrice(bodyData);
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
