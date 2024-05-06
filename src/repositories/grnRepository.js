import models from "../models";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";
import logger from "../services/logger";
import utility from "../services/utility";
const {
  HotelBookingGroup,
  HotelBooking,
  HotelBookingDetail,
  Setting,
  Transaction,
  HotelBookingLog,
  Wallet,
  PayBackRequest,
  PayBackLog,
} = models;

export default {
  /**
   * Genrate Logger
   * @param {Object} req
   * @param {Object} status
   * @param {Object} message
   * @param {Object} apiEndUrl
   */
  async genrateGrnLogger(
    req,
    status,
    message,
    apiEndUrl,
    _response,
    bookingId = null
  ) {
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
        } form the User : "${userName}" and Id : ${userId} ${
          bookingId !== null
            ? `with Booking Group-id=${bookingId.groupId} and booking-id=${bookingId.bookingId}`
            : ""
        } ${
          _response != false
            ? `and detail is=> ${JSON.stringify(_response)}`
            : ""
        }`
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
      const token = await Setting.findOne({ where: { key: "grn_access_key" } });
      if (token?.value.length > 5) {
        return token.value;
      } else {
        return false;
      }
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
        hotel_codes: bodyData.hotelCode.splice(0, 100),
        rates: "comprehensive",
        currency: bodyData.currency,
        client_nationality: bodyData.clientNationality,
        checkin: bodyData.checkIn,
        checkout: bodyData.checkOut,
        cutoff_time: 60000,
        purpose_of_travel: 1,
        options: { rate_comments: true },
      };
      const _response = await requestHandler.fetchResponseFromHotel(
        GRN_Apis.search,
        await this.getSessionToken(),
        _request_data,
        false
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          GRN_Apis.search,
          false
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
          apiEndPoint,
          false
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
        cutoff_time: 60000,
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
          apiEndPoint,
          false
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
        title:
          userData.UserPersonalInformation.title === "Mr"
            ? "Mr."
            : userData.UserPersonalInformation.title === "Mstr"
            ? "Mstr."
            : userData.UserPersonalInformation.title === "Mrs"
            ? "Mrs."
            : "Ms.",
        name: userData.firstName,
        surname: userData.lastName,
        email: userData.email,
        phone_number: `${userData.phoneNumberCountryCode}${userData.phoneNumber}`,
        client_nationality: userData.UserPersonalInformation.nationality,
      };
      // if (
      //   userData.UserPersonalInformation.panNumber &&
      //   userData.UserPersonalInformation.panNumber != ""
      // ) {
      //   holder["pan_number"] = userData.UserPersonalInformation.panNumber;
      // }
      // Need to check the indian user pan card mandatary

      //  Set Booking Items
      for (let index = 0; index < bodyData.bookingItems.length; index++) {
        const e = bodyData.bookingItems[index];
        for (let i = 0; i < e.rooms.length; i++) {
          e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
            const paxesData = membersData.filter((item) => item.id === x)[0];
            return {
              id: paxesData.id,
              title:
                paxesData.title === "Mr"
                  ? "Mr."
                  : paxesData.title === "Mstr"
                  ? "Mstr."
                  : paxesData.title === "Mrs"
                  ? "Mrs."
                  : "Ms.",
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
        cutoff_time: 120000,
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
        console.log("================================");
        console.log("entry start", _response?.data?.status);
        console.log("================================");
        const currentDatatime = await utility.getCurrentDateTime();
        const bookingGroupData = {
          userId: userData.id,
          bookingName: bodyData.bookingName,
          bookingComments: bodyData.bookingComments,
          currentReference: _response?.data?.booking_reference
            ? _response?.data?.booking_reference
            : "",
          checkIn: bodyData.checkIn,
          checkOut: bodyData.checkOut,
          bookingDate: _response?.data?.booking_date
            ? _response?.data?.booking_date
            : currentDatatime,
          price: _response?.data?.price?.total
            ? _response?.data?.price?.total
            : bodyData.price,
          status: _response?.data?.status ? _response?.data?.status : "failed",
          totalRooms: bodyData.totalRooms,
          totalMember: bodyData.totalMember,
          isUserTravelled: bodyData.isUserTravelled,
          searchPayload: JSON.stringify(bodyData.searchPayload),
        };
        const bookingGroup = await HotelBookingGroup.create(bookingGroupData);
        console.log("================================");
        console.log("group created", bookingGroup.id);
        console.log("================================");
        if (bookingGroup.id) {
          let nonRefundable = null,
            underCancellation = null,
            cancelByDate = null,
            cancellationPolicy = null;
          if (
            _response?.data?.hotel?.booking_items &&
            _response?.data?.hotel?.booking_items.length > 0 &&
            typeof _response?.data?.hotel?.booking_items[0]?.non_refundable ===
              "boolean"
          ) {
            nonRefundable = `${_response?.data?.hotel?.booking_items[0]?.non_refundable}`;
            cancellationPolicy = JSON.stringify(
              _response.data.hotel.booking_items[0]?.cancellation_policy
            );
            if (
              typeof _response?.data?.hotel?.booking_items[0]
                ?.cancellation_policy?.under_cancellation === "boolean"
            ) {
              underCancellation = `${_response?.data?.hotel?.booking_items[0]?.cancellation_policy?.under_cancellation}`;
              if (underCancellation === "false") {
                cancelByDate =
                  _response.data.hotel.booking_items[0]?.cancellation_policy
                    ?.cancel_by_date;
              }
            }
          }
          let bookingData = {
            userId: userData.id,
            bookingGroupId: bookingGroup.id,
            hotelCode: bodyData.hotelCode,
            cityCode: bodyData.cityCode,
            checkIn: bodyData.checkIn,
            checkOut: bodyData.checkOut,
            commission: bodyData.commission,
            commissionAmount: bodyData.commissionAmount,
            totalPrice: bodyData.totalPrice,
            roomType: bodyData.roomType,
            bookingId: _response?.data?.booking_id
              ? _response?.data?.booking_id
              : "",
            bookingDate: _response?.data?.booking_date
              ? _response?.data?.booking_date
              : currentDatatime,
            bookingReference: _response?.data?.booking_reference
              ? _response?.data?.booking_reference
              : "",
            price: _response?.data?.price?.total
              ? _response?.data?.price?.total
              : bodyData.price,
            status: _response?.data?.status
              ? _response?.data?.status
              : "failed",
            paymentStatus: _response?.data?.payment_status
              ? _response?.data?.payment_status
              : "pending",
            nonRefundable: nonRefundable,
            underCancellation: underCancellation,
            cancelByDate: cancelByDate,
            cancellationPolicy: cancellationPolicy,
            searchId: bodyData.searchId,
          };
          const booking = await HotelBooking.create(bookingData);
          console.log("================================");
          console.log("booking created", booking.id);
          console.log("================================");
          if (booking) {
            await HotelBookingLog.create({
              userId: userData.id,
              groupId: bookingGroup.id,
              bookingId: booking.id,
              transactionId: bodyData.transactionId,
              paymentStatus: "paid",
            });

            console.log("================================");
            console.log("Booking Confirm Log Updated");
            console.log("================================");
            await bookingGroup.update({ bookingId: booking.id });
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
                  bookingGroupId: bookingGroup.id,
                  roomNumber: i,
                  paxes: paxesIds.toString(","),
                  ages: ages.toString(","),
                };
                await HotelBookingDetail.create(hotelDetail);
              }
            }
            console.log("================================");
            console.log("Paxes created");
            console.log("================================");
          }
          this.genrateGrnLogger(
            req,
            _response.status,
            _response.message,
            GRN_Apis.booking,
            { requestData: _request_data, responseData: _response },
            { groupId: bookingGroup.id, bookingId: booking.id }
          );
          await Transaction.update(
            {
              hotelBookingId: booking.id,
            },
            {
              where: { id: bodyData.transactionId },
            }
          );
          console.log("================================");
          console.log(
            "transaction updated on booking Id=",
            booking.id,
            "and transactionId=",
            bodyData.transactionId
          );
          console.log("================================");
          if (
            _response?.data?.booking_id &&
            (_response.data.status === "pending" ||
              _response.data.status === "confirmed")
          ) {
            console.log("================================");
            console.log("Booking Confirm");
            console.log("================================");
          } else {
            console.log("================================");
            console.log("Booking not Confirm Refund Intialize");
            console.log("================================");
            // refund intiate
            const bookignLogs = await HotelBookingLog.create({
              userId: userData.id,
              groupId: bookingGroup.id,
              bookingId: booking.id,
              paymentStatus: "refund-Intiated",
            });
            const transactionRequest = {
              userId: userData.id,
              gatewayMode: "system",
              paymentFor: "wallet",
              paymentType: "adjust",
              total: bodyData.transactionAmount,
              currency: bodyData.transactionCurrency,
              description: `Refund on the booking of ${booking.id}`,
              status: "refund",
            };
            const transactionData = await Transaction.create(
              transactionRequest
            );

            if (transactionData && transactionData.id) {
              await transactionData.update({
                hotelBookingId: booking.id,
              });

              console.log("====== check wallete ========");
              const checkWallet = await Wallet.findOne({
                where: {
                  userId: userData.id,
                },
              });
              // update wallet
              if (checkWallet && checkWallet.balance !== null) {
                const balance =
                  checkWallet.balance + parseFloat(transactionData.total);
                await checkWallet.update({ balance });
              } else {
                await Wallet.create({
                  balance: parseFloat(transactionData.total),
                  userId: userData.id,
                });
              }

              await bookignLogs.update({
                paymentStatus: "refunded",
                transactionId: transactionData.id,
              });
              console.log("================================");
              console.log("Refund Done in transaction Id=", transactionData.id);
              console.log("================================");
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
      const bookingObject = req.bookingObject;
      const apiEndPoint = GRN_Apis.bookingStatus(
        bookingObject.currentReference
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
          apiEndPoint,
          false
        );
        if (
          _response.data.booking_status === "confirmed" &&
          _response.data.booking_type === "B"
        ) {
          await bookingObject.update({ status: _response.data.booking_status });
          await HotelBooking.update(
            { status: _response.data.booking_status },
            {
              where: {
                id: bookingObject.bookingId,
              },
            }
          );
        } else if (
          _response.data.booking_status === "confirmed" &&
          _response.data.booking_type === "C"
        ) {
          await bookingObject.update({ status: "cancelled" });
          await HotelBooking.update(
            {
              status: "cancelled",
              cancelledDate: _response.data.cancellation_details?.cancel_date,
              refundAmout: _response.data.cancellation_details?.refund_amount,
              cancellationCharge:
                _response.data.cancellation_details?.cancellation_charge,
            },
            {
              where: {
                id: bookingObject.bookingId,
              },
            }
          );
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
        bookingObject.currentReference
      );

      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken(),
        { cutoff_time: 60000 }
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint,
          _response
        );
        if (
          _response.data.status === "confirmed" ||
          _response.data.status === "pending"
        ) {
          console.log("================================");
          console.log("Booking Cancellation Confirm/pending Refund Intialize");
          console.log("================================");
          // refund intiate
          const bookignLogs = await HotelBookingLog.create({
            userId: bookingObject.userId,
            groupId: bookingObject.id,
            bookingId: bookingObject.bookingId,
            paymentStatus: "refund-Intiated",
          });
          const payBackRequest = {
            userId: bookingObject?.userId,
            hotelGroupId: bookingObject?.id,
            requestFor: "hotel",
            requestType: "direct",
            total: bookingObject?.booking?.price,
            currency: bookingObject?.booking?.currency,
          };
          const payBackData = await PayBackRequest.create(payBackRequest);
          if (payBackData) {
            await PayBackLog.create({
              userId: bookingObject?.userId,
              requestId: payBackData.id,
            });
          }
          await this.bookingStatus(req);
        }
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
