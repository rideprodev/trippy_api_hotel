import { Op, Sequelize } from "sequelize";
import models from "../models";
import schedulerRepository from "./schedulerRepository";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";
import grnRepository from "./grnRepository";
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
  HotelImage,
  UserPersonalInformation,
  PayBackRequest,
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
            Sequelize.where(
              Sequelize.col("userData.first_name"),
              Op.like,
              `%${queryData.name}%`
            ),
            Sequelize.where(
              Sequelize.col("userData.last_name"),
              Op.like,
              `%${queryData.name}%`
            ),
          ],
        };
      }

      const includes = [
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
            "roomType",
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
        attributes: [
          "id",
          "userId",
          "currentReference",
          "checkIn",
          "checkOut",
          "bookingDate",
          "currency",
          "price",
          "status",
          "totalRooms",
          "totalMember",
        ],
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
   * Get All Hotel Booking
   * @param {Object} req
   */
  async getAllHotelBookingUser(req, where = {}) {
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
            Sequelize.where(
              Sequelize.col("userData.first_name"),
              Op.like,
              `%${queryData.name}%`
            ),
            Sequelize.where(
              Sequelize.col("userData.last_name"),
              Op.like,
              `%${queryData.name}%`
            ),
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
            "roomType",
            "reavalidateResponse",
            "status",
            "platformStatus",
          ],
          model: HotelBooking,
          as: "booking",
          required: false,
          include: {
            attributes: ["hotelCode", "hotelName"],
            model: Hotel,
            as: "hotelData",
            include: [
              {
                attributes: ["cityCode", "cityName"],
                model: HotelCity,
                as: "cityData",
              },
              {
                attributes: ["countryCode", "countryName"],
                model: HotelCountry,
                as: "countryData",
              },
              {
                attributes: ["imageUrl"],
                model: HotelImage,
                as: "image",
                where: { mainImage: "Y" },
                required: false,
              },
            ],
          },
        },
        {
          attributes: [
            "id",
            "hotelCode",
            "latestPrice",
            "biddingPrice",
            "minBid",
            "maxBid",
            "priority",
            "localPriority",
            "expairationAt",
            "status",
            "roomType",
            "bookingId",
          ],
          model: HotelBidding,
          as: "biddingData",
          required: false,
          include: [
            {
              attributes: ["status", "platformStatus"],
              model: HotelBooking,
              as: "biddingBookingData",
              required: false,
            },
            {
              attributes: ["hotelCode", "hotelName"],
              model: Hotel,
              as: "hotelData",
              include: {
                attributes: ["imageUrl"],
                model: HotelImage,
                as: "image",
                where: { mainImage: "Y" },
                required: false,
              },
            },
          ],
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
        attributes: [
          "id",
          "userId",
          "bookingId",
          "bookingName",
          "bookingComments",
          "currentReference",
          "checkIn",
          "checkOut",
          "bookingDate",
          "currency",
          "price",
          "status",
          "totalRooms",
          "totalMember",
          "totalAdult",
          "totalChildren",
          "searchPayload",
          "createdAt",
          "updatedAt",
        ],
        include: includes,
        order: [["id", "DESC"]],
        distinct: true,
        where: where,
        offset: offset,
        limit: limit,
      });
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
  async getOneHotelUserWiseBooking(req, where = {}, biddingWhere = {}) {
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
              "status",
              "createdAt",
              "updatedAt",
            ],
            model: User,
            as: "userData",
          },
          {
            model: HotelBooking,
            as: "booking",
            attributes: [
              "hotelCode",
              "roomType",
              "platformPaymentStatus",
              "price",
              "currency",
              "commission",
              "commissionAmount",
              "totalPrice",
              "cancelByDate",
              "cancelByDate",
              "cancelledDate",
              "cancellationCharge",
            ],
            include: {
              attributes: [
                "hotelCode",
                "hotelName",
                "countryCode",
                "address",
                "StarCategory",
              ],
              model: Hotel,
              as: "hotelData",
              include: [
                {
                  attributes: ["cityCode", "cityName"],
                  model: HotelCity,
                  as: "cityData",
                },
                {
                  attributes: ["countryCode", "countryName"],
                  model: HotelCountry,
                  as: "countryData",
                },
                {
                  attributes: ["imageUrl"],
                  model: HotelImage,
                  as: "image",
                  where: { mainImage: "Y" },
                  required: false,
                },
              ],
            },
          },
          {
            model: HotelBooking,
            as: "bookings",
            include: {
              attributes: ["hotelCode", "hotelName"],
              model: Hotel,
              as: "hotelData",
              include: {
                attributes: ["imageUrl"],
                model: HotelImage,
                as: "image",
                where: { mainImage: "Y" },
                required: false,
              },
            },
          },
          {
            attributes: [
              "id",
              "hotelCode",
              "latestPrice",
              "biddingPrice",
              "minBid",
              "maxBid",
              "priority",
              "localPriority",
              "expairationAt",
              "status",
              "roomType",
              "bookingId",
            ],
            model: HotelBidding,
            as: "biddingData",
            where: biddingWhere,
            required: false,
            include: [
              {
                attributes: ["status", "platformStatus"],
                model: HotelBooking,
                as: "biddingBookingData",
                required: false,
              },
              {
                attributes: ["hotelCode", "hotelName"],
                model: Hotel,
                as: "hotelData",
                include: {
                  attributes: ["imageUrl"],
                  model: HotelImage,
                  as: "image",
                  where: { mainImage: "Y" },
                  required: false,
                },
              },
              {
                attributes: ["status", "platformStatus"],
                model: HotelBooking,
                as: "biddingBookingData",
                required: false,
              },
            ],
          },
          {
            attributes: ["id", "status"],
            model: PayBackRequest,
            as: "payBackRequestData",
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
        order: [
          [Sequelize.col("biddingData.priority"), "ASC"],
          [Sequelize.col("bookingLogs.id"), "DESC"],
        ],
      });
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
            `Payment Successfully for booking Number - TB-${bookingObject?.currentReference}`,
            {
              name: fullName,
              booking_id: bookingObject?.currentReference,
              total_price: bodyData.price,
              currency: "AUD",
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
        return {
          isPendingBidding: biddingPrices?.isPendingBidding,
          latestPrice: biddingPrices?.updateLatestPrice
            ? biddingPrices.updateLatestPrice
            : [],
        };
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
          { total_rooms: FilterDate.totalRooms },
          { total_member: FilterDate.totalMember },
          { total_adult: FilterDate.totalAdult },
          { total_children: FilterDate.totalChildren },
          { currency: FilterDate.currency },
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
          "currency",
          "price",
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
              "localPriority",
              "expairationAt",
              "latestPrice",
            ],
            where: biddingWhere,
            model: HotelBidding,
            as: "biddingData",
            required: true,
          },
          {
            model: HotelBooking,
            as: "booking",
            attributes: [
              "hotelCode",
              "roomType",
              "platformPaymentStatus",
              "cancelByDate",
              "biddingId",
              "createdAt",
            ],
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
              attributes: ["contry", "nationality", "currencyCode"],
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
        platformStatus: { [Op.ne]: "rejected" },
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

  /**
   * Update the action Accept or Reject
   * @param {Object} req
   */
  async UpdateTheActionAcceptOrReject(req) {
    try {
      const bodyData = req.body;
      const bookingGroupObject = req.bookingObject;
      const booking = req.booking;
      let transactionId = 0,
        cardId = 0;

      //  update logs
      const bookingLog = await HotelBookingLog.findAll({
        where: {
          groupId: booking.bookingGroupId,
          bookingId: booking.id,
        },
      });
      // console.log(bookingLog);
      for (let i = 0; i < bookingLog.length; i++) {
        const element1 = bookingLog[i];
        cardId = element1.cardId;
        if (element1.transactionId > 0) {
          transactionId = element1.transactionId;
        }
      }
      const logRequest = {
        userId: booking.userId,
        groupId: booking.bookingGroupId,
      };
      if (cardId > 0) {
        logRequest.cardId = cardId;
      }
      if (transactionId > 0) {
        logRequest.transactionId = transactionId;
      }

      if (bodyData.action === "reject") {
        const GRNtoken = await grnRepository.getSessionToken();
        const apiEndPoint = GRN_Apis.bookingCancel(booking.bookingReference);
        const _response_cancel = await requestHandler.fetchResponseFromHotel(
          apiEndPoint,
          GRNtoken,
          { cutoff_time: 60000 }
        );
        if (
          _response_cancel.data.status === "confirmed" ||
          _response_cancel.data.status === "pending"
        ) {
          console.log("================================");
          console.log(
            "Booking Cancellation Confirm/pending Refund Intialize",
            _response_cancel.data.status
          );
          await booking.update({
            status: "cancelled",
            platformStatus: "cancelled",
            paymentStatus: _response_cancel?.data?.payment_status,
            cancelledDate:
              _response_cancel?.data?.cancellation_details?.cancel_date,
            refundAmout:
              _response_cancel?.data?.cancellation_details?.refund_amount,
            cancellationCharge:
              _response_cancel.data?.cancellation_details?.cancellation_charge,
          });
          //update the logs
          HotelBookingLog.create({
            ...logRequest,
            bookingId: booking.id,
            paymentStatus: "cancelled",
          });

          if (booking.biddingId) {
            const biddingDetail = await HotelBidding.findOne({
              where: {
                id: booking.biddingId,
              },
            });
            if (biddingDetail) {
              await biddingDetail.update({ status: "rejected" });
              await HotelBidding.update(
                { status: "active" },
                {
                  where: {
                    [Op.and]: [
                      {
                        localPriority: { [Op.gt]: biddingDetail.localPriority },
                      },
                      { priority: { [Op.lt]: 999990 } },
                    ],
                    status: "pending",
                  },
                }
              );
            }
          }
          return true;
        } else {
          return false;
        }
      } else {
        // cancell all accept reject booking
        const acceptRejectBookings = await HotelBooking.findAll({
          where: {
            bookingGroupId: req.params.bookingId,
            platformStatus: "confirmed",
            biddingId: { [Op.ne]: null },
          },
        });
        if (acceptRejectBookings.length > 0) {
          await acceptRejectBookings.filter(async (x) => {
            await HotelBooking.update(
              { platformStatus: "cancelled" },
              { where: { id: x.id } }
            );
            //update the logs
            HotelBookingLog.create({
              ...logRequest,
              bookingId: x.id,
              paymentStatus: "cancelled",
            });
          });
        }
        // cancel main booking
        const mainBooking = await HotelBooking.findOne({
          where: {
            bookingGroupId: req.params.bookingId,
            platformStatus: "confirmed",
            biddingId: { [Op.eq]: null },
          },
        });
        if (mainBooking) {
          await mainBooking.update({ platformStatus: "rejected" });
          // //update the logs
          HotelBookingLog.create({
            ...logRequest,
            bookingId: mainBooking.id,
            paymentStatus: "cancelled",
          });
        }
        await booking.update({ platformStatus: "confirmed" });
        await bookingGroupObject.update({
          bookingId: bodyData.bookingId,
          currentReference: booking.bookingReference,
          price: booking.totalPrice,
        });

        if (booking.biddingId) {
          const biddingDetail = await HotelBidding.findOne({
            where: {
              id: booking.biddingId,
            },
          });
          if (biddingDetail) {
            await HotelBidding.update(
              { status: "cancelled", priority: 999999 },
              {
                where: {
                  [Op.and]: [
                    { localPriority: { [Op.gt]: biddingDetail.localPriority } },
                    { priority: { [Op.lt]: 999990 } },
                  ],
                },
              }
            );
          }
        }
        return true;
      }
    } catch (error) {
      throw Error(error);
    }
  },
};
