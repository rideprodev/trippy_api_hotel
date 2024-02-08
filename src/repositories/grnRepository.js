import models from "../models";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";
import logger from "../services/logger";
const { HotelBooking, HotelBookingDetail } = models;

export default {
  /**
   * Genrate Logger
   * @param {Object} req
   * @param {Object} status
   * @param {Object} message
   * @param {Object} apiEndUrl
   */
  async genrateGrnLogger(req, status, message, apiEndUrl) {
    try {
      const userName = req.user
        ? `${req.user.firstName} ${req.user.lastName}`
        : "Guest";
      const userId = req.user ? req.user.id : "0";

      logger.grnLogger.info(
        `${new Date()} - ${JSON.stringify(
          apiEndUrl
        )} Called get status:${status} ${
          message && message != "" ? `and message :  ${message}` : ""
        } form the User : "${userName}" and Id : ${userId}`
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  /**
   * Get Hotel Token
   * @param {Object} req
   */
  async getSessionToken() {
    try {
      // fetch token from settings
      return "63ad347002ca3e1c01eb4a3ed7c89985";
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Search
   * @param {Object} req
   */
  async search(req) {
    try {
      const bodyData = req.body;
      const _request_data = {
        rooms: bodyData.rooms,
        hotel_codes: bodyData.hotelCode,
        rates: "comprehensive",
        currency: bodyData.currency,
        client_nationality: bodyData.clientNationality,
        checkin: bodyData.checkIn,
        checkout: bodyData.checkOut,
      };
      const _response = await requestHandler.fetchResponseFromHotel(
        GRN_Apis.search,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          GRN_Apis.search
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Refetch
   * @param {Object} req
   */
  async refetch(req) {
    try {
      const { searchId, hotelCode } = req.body;
      const apiEndPoint = GRN_Apis.refetch(searchId, hotelCode);
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken()
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Revalidate
   * @param {Object} req
   */
  async revalidate(req) {
    try {
      const { searchId, groupCode, rateKey } = req.body;
      const _request_data = {
        group_code: groupCode,
        rate_key: rateKey,
      };
      const apiEndPoint = GRN_Apis.revalidate(searchId);
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Bookings
   * @param {Object} req
   */
  async booking(req) {
    try {
      const bodyData = req.body;
      const membersData = req.members;
      const userData = req.user;
      bodyData.roomsData = bodyData.bookingItems;
      //  Set Holder Data
      const holder = {
        title: `${userData.UserPersonalInformation.title}.`,
        name: userData.firstName,
        surname: userData.lastName,
        email: userData.email,
        phone_number: `${userData.phoneNumberCountryCode}${userData.phoneNumber}`,
        client_nationality: userData.UserPersonalInformation.nationality,
      };
      if (
        userData.UserPersonalInformation.panNumber &&
        userData.UserPersonalInformation.panNumber != ""
      ) {
        holder["pan_number"] = userData.UserPersonalInformation.panNumber;
      }
      // Need to check the indian user pan card mandatary

      //  Set Booking Items
      for (let index = 0; index < bodyData.bookingItems.length; index++) {
        const e = bodyData.bookingItems[index];
        for (let i = 0; i < e.rooms.length; i++) {
          e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
            const paxesData = membersData.filter((item) => item.id === x)[0];
            return {
              id: paxesData.id,
              title: `${paxesData.title}.`,
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
        search_id: bodyData.searchId,
        hotel_code: bodyData.hotelCode,
        city_code: bodyData.cityCode,
        group_code: bodyData.groupCode,
        checkout: bodyData.checkOut,
        checkin: bodyData.checkIn,
        booking_name: bodyData.bookingName,
        booking_comments: bodyData.bookingComments,
        booking_items: bodyData.bookingItems,
        payment_type: "AT_WEB",
        agent_reference: "",
        holder: holder,
      };
      // return _request_data;
      const _response = await requestHandler.fetchResponseFromHotel(
        GRN_Apis.booking,
        await this.getSessionToken(),
        _request_data
      );

      // console.log(_response, "_response");

      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          GRN_Apis.booking,
          false
        );
        // need to add condition
        if (
          _response?.data?.booking_id &&
          _response.data.status === "pending" &&
          _response.data.status === "confirmed"
        ) {
          let bookingData = {
            userId: userData.id,
            hotelCode: bodyData.hotelCode,
            cityCode: bodyData.cityCode,
            checkIn: bodyData.checkIn,
            checkOut: bodyData.checkOut,
            totalRooms: bodyData.totalRooms,
            totalMember: bodyData.totalMember,
            isUserTravelled: bodyData.isUserTravelled,
            bookingId: _response.data.booking_id,
            bookingDate: _response.data.booking_date,
            bookingReference: _response.data.booking_reference,
            price: _response.data.price.total,
            status: _response.data.status,
            paymentStatus: _response.data.payment_status,
            nonRefundable: _response.data.non_refundable,
            searchId: _response.data.search_id,
            searchPayload: JSON.stringify(bodyData.searchPayload),
          };
          if (_response.data.non_refundable === "false") {
            if (
              _response.data.hotel.booking_items[0]?.cancellation_policy
                .under_cancellation === "false"
            ) {
              bookingData = {
                ...bookingDate,
                cancelByDate:
                  _response.data.hotel.booking_items[0]?.cancellation_policy
                    ?.cancel_by_date,
                underCancellation:
                  _response.data.hotel.booking_items[0]?.non_refundable,
              };
            } else {
              bookingData = {
                ...bookingDate,
                underCancellation:
                  _response.data.hotel.booking_items[0]?.non_refundable,
              };
            }
          }
          const booking = await HotelBooking.create(bookingData);
          if (booking) {
            for (let i = 1; i <= bodyData.bookingItems.length; i++) {
              const elementI = bodyData.bookingItems[i - 1];
              for (let j = 0; j < elementI.rooms.length; j++) {
                const elementJ = elementI.rooms[j];
                const paxesIds = [];
                const ages = [];
                for (let k = 0; k < elementJ.paxes.length; k++) {
                  const elementK = elementJ.paxes[k];
                  paxesIds.push(elementK.id);
                  ages.push(elementK.age);
                }
                const hotelDetail = {
                  bookingId: booking.id,
                  roomNumber: i,
                  paxes: paxesIds.toString(","),
                  ages: ages.toString(","),
                };
                await HotelBookingDetail.create(hotelDetail);
              }
            }
          }
        }
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * bookingStatus
   * @param {Object} req
   */
  async bookingStatus(req) {
    try {
      console.log("status called");
      const bookingObject = req.bookingObject;
      const apiEndPoint = GRN_Apis.bookingStatus(
        bookingObject.bookingReference
      );
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken()
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
        if (
          _response.data.booking_status === "confirmed" &&
          _response.data.booking_type === "B"
        ) {
          await bookingObject.update({ status: _response.data.booking_status });
        } else if (
          _response.data.booking_status === "confirmed" &&
          _response.data.booking_type === "C"
        ) {
          await bookingObject.update({
            status: "cancelled",
            cancelledDate: _response.data.cancellation_details?.cancel_date,
            refundAmout: _response.data.cancellation_details?.refund_amount,
            cancellationCharge:
              _response.data.cancellation_details?.cancellation_charge,
          });
        }
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * bookingStatus
   * @param {Object} req
   */
  async bookingCancel(req) {
    try {
      const bookingObject = req.bookingObject;
      const apiEndPoint = GRN_Apis.bookingCancel(
        bookingObject.bookingReference
      );
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken()
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
        if (_response.data.status === "confirmed") {
          console.log("cancelled");
          await this.bookingStatus(req);
        }
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
