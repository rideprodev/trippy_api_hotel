import models from "../models";
const {
  HotelBidding,
  HotelBiddingPrices,
  User,
  UserPersonalInformation,
  HotelBookingGroup,
  Hotel,
  HotelCountry,
  HotelCity,
  HotelImage,
} = models;
import { Op, Sequelize } from "sequelize";
import requestHandler from "../services/requestHandler";
import bookingRepository from "./bookingRepository";

export default {
  /**
   * Get All Biddings
   * @param {Object} req
   * @param {Object} where
   */
  async getAllBiddings(req, where = {}) {
    try {
      const queryData = req.query;
      where = where;

      let limit = null,
        offset = null;
      if (queryData.name) {
        where = {
          ...where,
          [Op.or]: [
            { roomType: { [Op.like]: `%${queryData.name}%` } },
            { checkIn: { [Op.like]: `%${queryData.name}%` } },
            { checkOut: { [Op.like]: `%${queryData.name}%` } },
            { hotelCode: { [Op.like]: `%${queryData.name}%` } },
            { biddingPrice: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      const _biddingData = await HotelBidding.findAndCountAll({
        where: where,
        include: [
          {
            attributes: ["firstName", "lastName"],
            model: User,
            as: "userData",
          },
          {
            attributes: ["id", "bookingId", "bookingName", "bookingComments"],
            model: HotelBookingGroup,
            as: "bookingGroupData",
          },
        ],
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });

      for (let i = 0; i < _biddingData.rows?.length; i++) {
        const element = _biddingData.rows[i];
        if (element?.hotelCode) {
          element.dataValues.hotelData = await Hotel.findOne({
            attributes: ["hotelCode", "hotelName", "countryCode"],
            where: { hotelCode: element?.hotelCode },
          });
          element.dataValues.image = await HotelImage.findOne({
            attributes: ["imageUrl"],
            where: {
              mainImage: "Y",
              hotelCode: element?.hotelCode,
            },
          });
        }
      }

      return _biddingData;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get One Biddings
   * @param {Object} req
   * @param {Object} where
   */
  async getOneBidding(where = {}) {
    try {
      const _biddingData = await HotelBidding.findOne({
        where: where,
        include: [
          {
            attributes: ["firstName", "lastName"],
            model: User,
            as: "userData",
          },
          {
            attributes: ["id", "bookingId", "bookingName", "bookingComments"],
            model: HotelBookingGroup,
            as: "bookingGroupData",
          },
          {
            attributes: ["createdAt", "latestPrice"],
            model: HotelBiddingPrices,
            as: "biddingPriceData",
          },
        ],
      });

      if (_biddingData?.hotelCode) {
        _biddingData.dataValues.hotelData = await Hotel.findOne({
          attributes: ["hotelCode", "hotelName", "countryCode", "cityCode"],
          where: { hotelCode: _biddingData?.hotelCode },
        });
        _biddingData.dataValues.image = await HotelImage.findOne({
          attributes: ["imageUrl"],
          where: {
            mainImage: "Y",
            hotelCode: _biddingData?.hotelCode,
          },
        });
      }
      if (_biddingData?.dataValues?.hotelData?.cityCode) {
        _biddingData.dataValues.cityData = await HotelCity.findOne({
          attributes: ["cityCode", "cityName"],
          where: { cityCode: _biddingData?.dataValues?.hotelData.cityCode },
        });
      }
      if (_biddingData?.dataValues?.hotelData?.countryCode) {
        _biddingData.dataValues.countryData = await HotelCountry.findOne({
          attributes: ["countryCode", "countryName"],
          where: { countryCode: _biddingData.dataValues.hotelData.countryCode },
        });
      }

      return _biddingData;
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * update the price in place my bid
   * @param {Object} bodyData
   */
  async updateLatestPrice(bodyData) {
    const priceData = {
      userId: bodyData.userId,
      biddingId: bodyData.biddingId,
      latestPrice: bodyData.latestPrice,
    };
    return await HotelBiddingPrices.create(priceData);
  },

  /**
   * update the price in place my bid and latest price throgh sceduler
   * @param {Object} bodyData
   */
  async updatelatestPriceThroghScheduler(bodyData) {
    try {
      const currentDate = new Date();
      const where = [
        Sequelize.where(
          Sequelize.fn("STR_TO_DATE", Sequelize.col("created_at"), "%Y-%m-%d"),
          Op.eq,
          Sequelize.fn("STR_TO_DATE", currentDate, "%Y-%m-%d")
        ),
        { user_id: bodyData.userId },
        { bidding_id: bodyData.biddingId },
        { latest_price: bodyData.latestPrice },
      ];
      const priceLog = await HotelBiddingPrices.findOne({
        where: where,
      });
      if (priceLog && +priceLog.latestPrice >= +bodyData.latestPrice) {
        await priceLog.update({
          latestPrice: bodyData.latestPrice,
        });
      } else {
        await HotelBiddingPrices.create({
          userId: bodyData.userId,
          biddingId: bodyData.biddingId,
          latestPrice: bodyData.latestPrice,
        });
      }
      return await HotelBidding.update(
        { latestPrice: bodyData.latestPrice },
        { where: { id: bodyData.biddingId } }
      );
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Place my bid
   * @param {Object} req
   */
  async placeMyBid(req) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      bodyData.userId = userData.id;
      const hotelName = bodyData.reavalidateResponse.hotel.name;
      bodyData.reavalidateResponse = JSON.stringify(
        bodyData.reavalidateResponse
      );
      const bookingGroupData =
        await bookingRepository.getOneHotelUserWiseBooking(
          req,
          {
            id: bodyData.groupId,
          },
          { status: "active" }
        );
      //  need to get the expairation date backend
      const _response = await HotelBidding.create(bodyData);
      bodyData.biddingId = _response.id;
      await this.updateLatestPrice(bodyData);

      try {
        const sendmail = requestHandler.sendEmail(
          userData.email,
          "bidRegister",
          `Your Bid for- ${hotelName}, has been registered!`,
          {
            name: `${userData.firstName} ${userData.lastName}`,
            hotel_name: hotelName,
            priority: bodyData.priority,
            bookingGroupData: bookingGroupData,
          }
        );
      } catch (err) {}
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get all Bidding
   * @param {Object} req
   */
  async getMyBidding(req) {
    try {
      const userData = req.user;
      const { id } = req.params;
      return await HotelBidding.findOne({
        where: { id: id, userId: userData.id },
        include: {
          attributes: ["latestPrice", "createdAt"],
          order: [["id", "DESC"]],
          model: BiddingPrices,
          as: "biddingData",
        },
      });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Update My Biddings
   * @param {Object} req
   */
  async updateMyBidding(req) {
    try {
      const bodyData = req.body;
      const biddingObject = req.biddingObject;
      return await biddingObject.update(bodyData);
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Update My Biddings
   * @param {Object} req
   */
  async updateBiddingStatus(biddingObject, status, id = null) {
    try {
      if (biddingObject) {
        return await biddingObject.update({ status });
      } else {
        return await HotelBidding.update({ status }, { where: { id: id } });
      }
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Update Biddings Where
   * @param {Object} req
   */
  async updateBiddingWhere(data, where) {
    try {
      const update = await HotelBidding.update(data, { where: where });
      // console.log(update, data, where);
      return update;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get All Bidding
   *
   * @param {Object} where
   */
  async getAllBidding(where, order = ["id", "DESC"]) {
    return await HotelBidding.findAll({
      where,
      include: { model: User, as: "userData" },
      order: [order],
    });
  },

  /**
   * Find Hotel list where the date for bidding
   * @param {Object} req
   */
  async checkBiddingAvailiblityForSearch(req) {
    try {
      const bodyData = req.body;
      const userData = req.user;
      const where = {
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        status: "active",
        userId: userData.id,
      };

      const _biddingData = await HotelBidding.findAll({
        where: where,
        attributes: ["hotelCode", "roomType"],
        include: {
          attributes: ["id", "totalRooms", "totalMember", "status"],
          model: HotelBookingGroup,
          as: "bookingGroupData",
          where: {
            totalRooms: bodyData.totalRooms,
            totalMember: bodyData.totalMember,
          },
        },
        order: [["id", "DESC"]],
      });
      return _biddingData;
    } catch (error) {
      throw Error(error);
    }
  },

  async updateExpiredBidding() {
    const currentDate = new Date();
    const where = [
      Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("expairation_at"),
          "%Y-%m-%d"
        ),
        Op.lt,
        Sequelize.fn("STR_TO_DATE", currentDate, "%Y-%m-%d")
      ),
    ];
    return await HotelBidding.update({ status: "expired" }, { where: where });
  },

  /**
   * Get All Bidding for scheduler
   *
   * @param {Object} where
   */
  async getAllBiddingForCurentPriceBook(where = []) {
    const FilterDate = new Date();

    const biddingWhere = [
      Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("HotelBidding.expairation_at"),
          "%Y-%m-%d"
        ),
        Op.gte,
        Sequelize.fn("STR_TO_DATE", FilterDate, "%Y-%m-%d")
      ),
      ...where,
    ];

    const bookingWhere = [
      Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("bookingGroupData.check_in"),
          "%Y-%m-%d"
        ),
        Op.gt,
        Sequelize.fn("STR_TO_DATE", FilterDate, "%Y-%m-%d")
      ),
    ];

    return await HotelBidding.findAll({
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
        "createdAt",
      ],
      where: biddingWhere,
      include: [
        {
          attributes: [
            "bookingId",
            "currentReference",
            "searchPayload",
            "totalRooms",
            "bookingName",
            "totalMember",
            "createdAt",
            "bookingComments",
          ],
          model: HotelBookingGroup,
          as: "bookingGroupData",
          where: bookingWhere,
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
  },
};
