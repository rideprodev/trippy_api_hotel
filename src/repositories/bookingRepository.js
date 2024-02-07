import { Op } from "sequelize";
import models from "../models";
const { User, HotelBooking, HotelBookingDetail } = models;

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

      return await HotelBooking.findAndCountAll({
        where: where,
        include: {
          attributes: ["firstName", "lastName"],
          model: User,
          as: "userData",
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
   * Get One Hotel Booking
   * @param {Object} req
   */
  async getOneHotelBooking(req, where = {}) {
    try {
      const booking = await HotelBooking.findOne({
        where: where,
        attributes: {
          exclude: [],
        },
        include: {
          attributes: ["firstName", "lastName"],
          model: User,
          as: "userData",
        },
      });
      booking.dataValues.hotelDetail = await HotelBookingDetail.findAll({
        where: { bookingId: booking.id },
      });
      return booking;
    } catch (error) {
      throw Error(error);
    }
  },
};
