import { Op } from "sequelize";
import models from "../models";
const {
  User,
  HotelBookingGroup,
  HotelBooking,
  HotelBookingDetail,
  Hotel,
  HotelCity,
  HotelCountry,
  HotelBookingLog,
} = models;

export default {
  /**
   * Get All Hotel Booking
   * @param {Object} req
   */
  async getAllHotelBooking(req, where = {}) {
    try {
      const queryData = req.query;
      let limit = null,
        offset = null;

      if (queryData.name) {
        where = {
          ...where,
          [Op.or]: [
            { hotelCode: { [Op.like]: `%${queryData.name}%` } },
            { cityCode: { [Op.like]: `%${queryData.name}%` } },
            { checkIn: { [Op.like]: `%${queryData.name}%` } },
            { checkOut: { [Op.like]: `%${queryData.name}%` } },
            { price: { [Op.like]: `%${queryData.name}%` } },
            { status: { [Op.like]: `%${queryData.name}%` } },
            { paymentStatus: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.status && queryData.status === "current") {
        where = {
          ...where,
          checkIn: { [Op.gte]: new Date() },
        };
      } else if (queryData.status && queryData.status === "past") {
        where = {
          ...where,
          checkIn: { [Op.lt]: new Date() },
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      const _hotels = await HotelBookingGroup.findAndCountAll({
        attributes: {
          exclude: ["updatedAt", "searchPayload"],
        },
        where: where,
        include: [
          {
            attributes: ["firstName", "lastName"],
            model: User,
            as: "userData",
          },
          {
            attributes: ["hotelCode", "cityCode"],
            model: HotelBooking,
            as: "booking",
          },
          {
            attributes: ["createdAt", "paymentStatus", "transactionId"],
            model: HotelBookingLog,
            as: "bookingLogs",
          },
        ],
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
      for (let i = 0; i < _hotels.rows.length; i++) {
        const element = _hotels.rows[i];
        if (element?.booking?.hotelCode) {
          element.dataValues.hotelData = await Hotel.findOne({
            attributes: ["hotelCode", "hotelName", "countryCode"],
            where: { hotelCode: element.booking.hotelCode },
          });
        }
        if (element?.booking?.cityCode) {
          element.dataValues.cityData = await HotelCity.findOne({
            attributes: ["cityCode", "cityName"],
            where: { cityCode: element.booking.cityCode },
          });
        }
        if (element?.dataValues?.hotelData?.countryCode) {
          element.dataValues.countryData = await HotelCountry.findOne({
            attributes: ["countryCode", "countryName"],
            where: { countryCode: element.dataValues.hotelData.countryCode },
          });
        }
      }
      return _hotels;
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Get One Hotel Booking
   * @param {Object} req
   */
  async getOneHotelBooking(req, where = {}) {
    try {
      const booking = await HotelBookingGroup.findOne({
        where: where,
        attributes: {
          exclude: [],
        },
        include: {
          attributes: ["price", "currency"],
          model: HotelBooking,
          as: "booking",
        },
      });
      return booking;
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Get One Hotel Booking
   * @param {Object} req
   */
  async getOneHotelUserWiseBooking(req, where = {}) {
    try {
      const _hotel = await HotelBookingGroup.findOne({
        where: where,
        attributes: {
          exclude: [],
        },
        include: [
          {
            attributes: ["firstName", "lastName"],
            model: User,
            as: "userData",
          },
          {
            model: HotelBooking,
            as: "booking",
            attributes: ["hotelCode"],
          },
          {
            model: HotelBooking,
            as: "bookings",
          },
          {
            attributes: ["roomNumber", "paxes", "ages"],
            model: HotelBookingDetail,
            as: "bookingDetils",
          },
        ],
      });
      for (let i = 0; i < _hotel.bookings.length; i++) {
        const element = _hotel.bookings[i];
        if (element?.hotelCode) {
          element.dataValues.hotelData = await Hotel.findOne({
            attributes: ["hotelCode", "hotelName", "countryCode"],
            where: { hotelCode: element.hotelCode },
          });
        }
        if (element?.cityCode) {
          element.dataValues.cityData = await HotelCity.findOne({
            attributes: ["cityCode", "cityName"],
            where: { cityCode: element.cityCode },
          });
        }
        if (element.dataValues?.hotelData?.countryCode) {
          element.dataValues.countryData = await HotelCountry.findOne({
            attributes: ["countryCode", "countryName"],
            where: { countryCode: element.dataValues.hotelData.countryCode },
          });
        }
      }
      for (let i = 0; i < _hotel.bookingDetils.length; i++) {
        const element = _hotel.bookingDetils[i];
        element.paxes = `${element.paxes}`.split(",");
        element.ages = `${element.ages}`.split(",");
      }
      if (_hotel?.booking?.hotelCode) {
        const hotelData = await Hotel.findOne({
          attributes: [
            "hotelCode",
            "hotelName",
            "countryCode",
            "address",
            "StarCategory",
          ],
          where: { hotelCode: _hotel.booking.hotelCode },
        });
        _hotel.booking.dataValues = hotelData.dataValues;
      }
      return _hotel;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Active Hotel
   * @param {Object} req
   */
  async getActiveBooking(where = {}) {
    try {
      const booking = await HotelBooking.findOne({
        where: where,
      });
      return booking;
    } catch (error) {
      throw Error(error);
    }
  },
};
