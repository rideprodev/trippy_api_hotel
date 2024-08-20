import { Op, Sequelize } from "sequelize";
import models from "../models";
import biddingRepository from "./biddingRepository";
import schedulerRepository from "./schedulerRepository";
const {
  User,
  HotelBookingGroup,
  HotelBooking,
  HotelBookingDetail,
  Hotel,
  HotelCity,
  HotelCountry,
  HotelBookingLog,
  HotelBidding,
  HotelBiddingPrices,
  HotelImage,
  UserPersonalInformation,
} = models;

export default {
  /**
   * Get All Hotel Booking
   * @param {Object} req
   */
  async getAllHotelBooking(req, where = {}) {
    try {
      const userData = req.user;
      const queryData = req.query;
      let limit = null,
        offset = null;
      where = { ...where, status: { [Op.ne]: "bidding" } };
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
        where: where,
        include: [
          {
            attributes: ["roomNumber", "paxes", "ages"],
            model: HotelBookingDetail,
            as: "bookingDetils",
          },
          {
            attributes: ["firstName", "lastName"],
            model: User,
            as: "userData",
          },
          {
            attributes: [
              "hotelCode",
              "cityCode",
              "cancelByDate",
              "reavalidateResponse",
            ],
            model: HotelBooking,
            as: "booking",
            where: { status: "confirmed" },
            required: false,
          },
          {
            attributes: [
              "id",
              "hotelCode",
              "latestPrice",
              "biddingPrice",
              "minBid",
              "maxBid",
              "expairationAt",
              "status",
              "roomType",
            ],
            model: HotelBidding,
            as: "biddingData",
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
          element.dataValues.image = await HotelImage.findOne({
            attributes: ["imageUrl"],
            where: {
              mainImage: "Y",
              hotelCode: element.booking.hotelCode,
            },
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
        if (element?.dataValues?.biddingData.length > 0) {
          for (
            let index = 0;
            index < element?.dataValues?.biddingData.length;
            index++
          ) {
            const ele = element?.dataValues?.biddingData[index];
            ele.dataValues.hotelInfo = await Hotel.findOne({
              attributes: ["hotelCode", "hotelName", "countryCode"],
              where: { hotelCode: ele.hotelCode },
            });
            ele.dataValues.image = await HotelImage.findOne({
              attributes: ["imageUrl"],
              where: {
                mainImage: "Y",
                hotelCode: ele.hotelCode,
              },
            });
          }
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
  async getOneHotelBooking(where = {}) {
    try {
      const booking = await HotelBookingGroup.findOne({
        where: where,
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
            attributes: [
              "firstName",
              "lastName",
              "profilePicture",
              "email",
              "phoneNumberCountryCode",
              "phoneNumber",
            ],
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
            model: HotelBidding,
            as: "biddingData",
            include: {
              model: HotelBiddingPrices,
              as: "biddingPriceData",
            },
          },
          {
            attributes: ["roomNumber", "paxes", "ages"],
            model: HotelBookingDetail,
            as: "bookingDetils",
          },
          {
            attributes: [
              "createdAt",
              "bookingId",
              "paymentStatus",
              "cardId",
              "transactionId",
            ],
            model: HotelBookingLog,
            as: "bookingLogs",
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
          element.dataValues.image = await HotelImage.findOne({
            attributes: ["imageUrl"],
            where: {
              mainImage: "Y",
              hotelCode: element.hotelCode,
            },
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
      if (_hotel?.biddingData?.length > 0) {
        for (let i = 0; i < _hotel.biddingData.length; i++) {
          const element = _hotel.biddingData[i];
          if (element?.dataValues?.hotelCode) {
            element.dataValues.hotelData = await Hotel.findOne({
              attributes: ["hotelCode", "hotelName", "countryCode"],
              where: { hotelCode: element?.dataValues?.hotelCode },
            });
            element.dataValues.image = await HotelImage.findOne({
              attributes: ["imageUrl"],
              where: {
                mainImage: "Y",
                hotelCode: element?.dataValues?.hotelCode,
              },
            });
          }
        }
      }
      return _hotel;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get One Active Hotel
   * @param {Object} req
   */
  async getOneActiveBooking(where = {}) {
    try {
      const booking = await HotelBooking.findOne({
        where: where,
      });
      return booking;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Active Hotel
   * @param {Object} req
   */
  async getAllActiveBooking(req) {
    try {
      const bodyData = req.body;
      const userData = req.user;

      // totalRooms: bodyData.totalRooms,
      // totalMember: bodyData.totalMember,

      const where = {
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        userId: userData.id,
        [Op.or]: [{ status: "confirmed" }, { status: "pending" }],
      };
      const booking = await HotelBooking.findAll({
        attributes: ["hotelCode", "roomType"],
        where: where,
      });
      return booking;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Pay Now
   * @param {Object} req
   */
  async payNow(req) {
    try {
      let isPayment = false,
        cardId = null;
      const bookingObject = req.bookingObject;
      const userData = req.user;
      const bodyData = req.body;

      const bookingLog = await HotelBookingLog.findAll({
        where: {
          groupId: bookingObject.id,
          bookingId: bookingObject.bookingId,
        },
      });

      for (let i = 0; i < bookingLog.length; i++) {
        const element = bookingLog[i];
        cardId = element.cardId;
        if (element.transactionId > 0) {
          isPayment = true;
        }
      }
      if (isPayment === false) {
        // update bookingLog;
        await HotelBookingLog.create({
          userId: userData.id,
          groupId: bookingObject.id,
          bookingId: bookingObject?.bookingId,
          cardId: cardId,
          transactionId: bodyData.transactionId,
          paymentStatus: "paid",
        });
        await HotelBooking.update(
          { platformPaymentStatus: "paid" },
          { where: { id: bookingObject?.bookingId } }
        );
        await HotelBidding.update(
          { status: "cancelled" },
          { where: { groupId: bookingObject.id } }
        );
        return "Paid";
      } else {
        return "Already Paid";
      }
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * update card on pay now in booking
   * @param {Object} req
   */
  async updateCardOnBooking(req) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      const bookingData = req.bookingObject;
      return await HotelBookingLog.update(
        {
          cardId: bodyData.cardId,
        },
        {
          where: {
            userId: userData.id,
            groupId: bookingData.id,
          },
        }
      );
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * update card on pay now in booking
   * @param {Object} req
   */
  async fetchLatestPrice(req) {
    try {
      const { bookingId } = req.params;
      const userData = req.user;
      const where = [{ id: bookingId }, { user_id: userData.id }];
      const biddings = await this.getAllBookingForScdulerBidding(where);
      const biddingPrices =
        await schedulerRepository.checkBookingForBiddingSchedule(biddings);
      return biddingPrices?.updateLatestPrice;
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Get All Booking - Bidding for scheduler
   *
   * @param {Object} where
   */
  async getAllBookingForScdulerBidding(where = []) {
    const currentDate = new Date();
    where = [...where, { id: 11 }, { status: "confirmed" }];
    const bookingWhere = [
      Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("HotelBookingGroup.check_in"),
          "%Y-%m-%d"
        ),
        Op.gt,
        currentDate
      ),
      Sequelize.fn("STR_TO_DATE", currentDate, "%Y-%m-%d"),
      ...where,
    ];
    const biddingWhere = [
      Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("biddingData.expairation_at"),
          "%Y-%m-%d"
        ),
        Op.gte,
        Sequelize.fn("STR_TO_DATE", currentDate, "%Y-%m-%d")
      ),
      { status: "active" },
    ];
    return await HotelBookingGroup.findAll({
      attributes: [
        "id",
        "userId",
        "bookingId",
        "currentReference",
        "checkIn",
        "checkOut",
        "isUserTravelled",
        "searchPayload",
        "totalRooms",
        "bookingName",
        "totalMember",
        "createdAt",
        "bookingComments",
      ],
      order: [["id", "DESC"]],
      where: bookingWhere,
      include: [
        {
          attributes: [
            "id",
            "userId",
            "groupId",
            "roomType",
            "checkIn",
            "checkOut",
            "hotelCode",
            "biddingPrice",
            "minBid",
            "maxBid",
            "expairationAt",
            "latestPrice",
          ],
          where: biddingWhere,
          model: HotelBidding,
          as: "biddingData",
          required: true,
        },
        {
          attributes: ["roomNumber", "paxes", "ages"],
          model: HotelBookingDetail,
          as: "bookingDetils",
        },
        {
          attributes: [
            "id",
            "firstName",
            "lastName",
            "profilePicture",
            "email",
            "phoneNumberCountryCode",
            "phoneNumber",
            "commission",
          ],
          model: User,
          as: "userData",
          include: {
            model: UserPersonalInformation,
            as: "UserPersonalInformation",
          },
        },
      ],
    });
  },
};
