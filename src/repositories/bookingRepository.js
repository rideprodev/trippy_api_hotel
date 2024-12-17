import { Op, Sequelize } from "sequelize";
import models from "../models";
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
      const queryData = req.query;
      let limit = null,
        offset = null;
      const date = new Date();
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

      const includes = [
        {
          attributes: ["paxes"],
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
            "platformPaymentStatus",
            "reavalidateResponse",
          ],
          model: HotelBooking,
          as: "booking",
          required: false,
        },
      ];

      if (queryData.status && queryData.status === "current") {
        where = {
          ...where,
          [Op.or]: [
            {
              [Op.and]: [{ checkIn: { [Op.gt]: date } }, { status: "pending" }],
            },
            {
              [Op.and]: [
                { checkIn: { [Op.gt]: date } },
                { status: "confirmed" },
              ],
            },
            { createdAt: { [Op.eq]: date } },
          ],
        };
        includes.push({
          attributes: [
            "id",
            "hotelCode",
            "latestPrice",
            "biddingPrice",
            "minBid",
            "maxBid",
            "priority",
            "expairationAt",
            "status",
            "roomType",
          ],
          model: HotelBidding,
          as: "biddingData",
        });
      } else if (queryData.status && queryData.status === "completed") {
        where = {
          ...where,
          [Op.and]: [{ checkIn: { [Op.lt]: date } }, { status: "confirmed" }],
        };
      } else if (queryData.status && queryData.status === "cancelled") {
        where = {
          ...where,
          [Op.and]: [{ createdAt: { [Op.ne]: date } }, { status: "cancelled" }],
        };
      } else if (queryData.status && queryData.status === "failed") {
        where = {
          ...where,
          [Op.or]: [
            {
              [Op.and]: [
                { createdAt: { [Op.ne]: date } },
                { status: "failed" },
              ],
            },
            {
              [Op.and]: [
                { createdAt: { [Op.ne]: date } },
                { status: "rejected" },
              ],
            },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      const _hotels = await HotelBookingGroup.findAndCountAll({
        include: includes,
        order: [["id", "DESC"]],
        distinct: true,
        where: where,
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

        if (queryData.status === "current") {
          if (element?.dataValues?.biddingData.length > 0) {
            element.dataValues.biddingData =
              element.dataValues.biddingData.sort(
                (a, b) => a.priority - b.priority
              );
            for (
              let index = 0;
              index < element?.dataValues?.biddingData.length;
              index++
            ) {
              const ele = element?.dataValues?.biddingData[index];
              ele.dataValues.hotelData = await Hotel.findOne({
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
        } else {
          element.dataValues.biddingData = [];
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
            attributes: ["hotelCode", "platformPaymentStatus"],
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
            attributes: ["paxes"],
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
        order: [[Sequelize.col("biddingData.priority"), "ASC"]],
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
        try {
          let fullName = `${userData.firstName} ${userData.lastName}`;
          await requestHandler.sendEmail(
            userData.email,
            "hotelPaymentSuccuess",
            `Payment Successfully for booking Number - ${bookingObject?.currentReference}`,
            {
              name: fullName,
              booking_id: bookingObject?.currentReference,
              total_price: bodyData.price,
              currency: bodyData.currency,
              hotel_name: bodyData.hotelName,
            }
          );
        } catch (err) {}
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
      if (biddings.length > 0) {
        const biddingPrices =
          await schedulerRepository.fetchLatestPriceFromSearchToSchedulet(
            biddings
          );
        return biddingPrices?.updateLatestPrice
          ? biddingPrices.updateLatestPrice
          : [];
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Get All Booking - Bidding for scheduler
   *
   * @param {Object} where
   */
  async getAllBookingForScdulerBidding(where = [], FilterDate = "") {
    try {
      let bookingWhere = [],
        biddingWhere = [];

      if (FilterDate != "" && FilterDate.checkIn != "" && where.length === 0) {
        bookingWhere = [
          Sequelize.where(
            Sequelize.fn(
              "STR_TO_DATE",
              Sequelize.col("HotelBookingGroup.check_in"),
              "%Y-%m-%d"
            ),
            Op.eq,
            Sequelize.fn("STR_TO_DATE", FilterDate.checkIn, "%Y-%m-%d")
          ),
          Sequelize.where(
            Sequelize.fn(
              "STR_TO_DATE",
              Sequelize.col("HotelBookingGroup.check_out"),
              "%Y-%m-%d"
            ),
            Op.eq,
            Sequelize.fn("STR_TO_DATE", FilterDate.checkOut, "%Y-%m-%d")
          ),
          { total_member: FilterDate.totalMember },
          { total_adult: FilterDate.totalAdult },
          { total_children: FilterDate.totalChildren },
          ...where,
        ];
        biddingWhere = { status: "active" };
      } else {
        where = [...where, { status: "confirmed" }];
        FilterDate = new Date();
        bookingWhere = [
          Sequelize.where(
            Sequelize.fn(
              "STR_TO_DATE",
              Sequelize.col("HotelBookingGroup.check_in"),
              "%Y-%m-%d"
            ),
            Op.gt,
            Sequelize.fn("STR_TO_DATE", FilterDate, "%Y-%m-%d")
          ),
          ...where,
        ];
        biddingWhere = [
          Sequelize.where(
            Sequelize.fn(
              "STR_TO_DATE",
              Sequelize.col("biddingData.expairation_at"),
              "%Y-%m-%d"
            ),
            Op.gte,
            Sequelize.fn("STR_TO_DATE", FilterDate, "%Y-%m-%d")
          ),
          { status: "active" },
        ];
      }

      return await HotelBookingGroup.findAll({
        attributes: [
          "id",
          "userId",
          "bookingId",
          "currentReference",
          "checkIn",
          "checkOut",
          "searchPayload",
          "totalRooms",
          "bookingName",
          "totalMember",
          "createdAt",
          "bookingComments",
        ],
        order: [
          ["id", "DESC"],
          [Sequelize.col("biddingData.priority"), "ASC"],
        ],
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
              "priority",
              "expairationAt",
              "latestPrice",
            ],
            where: biddingWhere,
            model: HotelBidding,
            as: "biddingData",
            required: true,
          },
          {
            attributes: ["paxes"],
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
              "commissionValue",
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
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Find Hotel list where the date for bidding
   * @param {Object} req
   */
  async checkBookingAvailiblityForSearch(req) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      const where = {
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        userId: userData.id,
        [Op.or]: [{ status: "pending" }, { status: "confirmed" }],
      };

      const _bookingData = await HotelBooking.findAll({
        where: where,
        attributes: ["hotelCode", "roomType"],
        order: [["id", "DESC"]],
      });
      return _bookingData;
    } catch (error) {
      throw Error(error);
    }
  },
};
