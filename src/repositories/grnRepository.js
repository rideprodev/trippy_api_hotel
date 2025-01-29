import models from "../models";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";
import logger from "../services/logger";
import utility from "../services/utility";
import { Op } from "sequelize";
import config from "../config";
const {
  HotelBookingGroup,
  HotelBooking,
  HotelBookingDetail,
  Setting,
  HotelBookingLog,
  HotelBidding,
  Hotel,
  PayBackRequest,
  Transaction,
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
      const token = await Setting.findOne({
        where: { key: "4f0f3b74542a1bfd35ad8f7531eb2376c9631ccb" },
      });
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
      const cutOffTime = bodyData?.cutOffTime ? bodyData.cutOffTime : 60000;
      const _request_data = {
        rooms: bodyData.rooms,
        hotel_codes: bodyData.hotelCode.splice(0, 100),
        rates: "comprehensive",
        currency: bodyData.currency,
        client_nationality: bodyData.clientNationality,
        checkin: bodyData.checkIn,
        checkout: bodyData.checkOut,
        cutoff_time: cutOffTime,
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
      if (_response !== undefined && _response?.status) {
        this.genrateGrnLogger(
          req,
          _response?.status,
          _response?.message,
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
      let bookingGroup = {};
      const bodyData = req.body;
      const userData = req.user;
      // const transactionData = req.transaction;
      const revalidateResponse = bodyData.reavalidateResponse;

      //  Set Holder Data
      const holder = {
        title: "Mr.",
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
      // console.log(_request_data);
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
          price: bodyData.totalPrice,
          status: _response?.data?.status ? _response?.data?.status : "failed",
          totalRooms: bodyData.totalRooms,
          totalMember: bodyData.totalMember,
          totalAdult: bodyData.totalAdult,
          totalChildren: bodyData.totalChildren,
          currency: _response?.data.currency
            ? _response.data.currency
            : bodyData.transactionCurrency,
          searchPayload: JSON.stringify(bodyData.searchPayload),
        };
        bookingGroup = await HotelBookingGroup.create(bookingGroupData);
        console.log("================================");
        console.log("group created", bookingGroup.id);
        console.log(
          bodyData.commission,
          bodyData.commissionAmount,
          bodyData.totalPrice,
          _response?.data?.price?.total,
          bodyData.price
        );
        console.log("================================");
        if (bookingGroup.id) {
          let nonRefundable = null,
            underCancellation = null,
            cancelByDate = null,
            expirationDate = null,
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
                const cancelDate =
                  _response.data.hotel.booking_items[0]?.cancellation_policy
                    ?.cancel_by_date;
                cancelByDate = utility.getDateAfterBeforeFromDate(
                  cancelDate,
                  config.app.CancellationDaysDifference,
                  "YYYY-MM-DDTH:m:s"
                );
                expirationDate = utility.getDateAfterBeforeFromDate(
                  cancelDate,
                  1,
                  "YYYY-MM-DDTH:m:s"
                );
              }
            }
          }
          // ---------- platform payment status -----------
          let platformPaymentStatus = "pending";

          let bookingData = {
            userId: userData.id,
            bookingGroupId: bookingGroup.id,
            hotelCode: bodyData.hotelCode,
            cityCode: bodyData.cityCode,
            checkIn: bodyData.checkIn,
            checkOut: bodyData.checkOut,
            currency: bodyData.transactionCurrency,
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
            platformStatus: _response?.data?.status,
            platformPaymentStatus,
            nonRefundable: nonRefundable,
            underCancellation: underCancellation,
            expirationDate,
            cancelByDate,
            cancellationPolicy: cancellationPolicy,
            searchId: bodyData.searchId,
            reavalidateResponse: JSON.stringify(bodyData.reavalidateResponse),
          };
          // console.log(bookingData);
          const booking = await HotelBooking.create(bookingData);
          console.log("================================");
          console.log("booking created", booking.id);
          console.log("================================");
          if (booking) {
            await bookingGroup.update({ bookingId: booking.id });
            const hotelDetail = {
              bookingGroupId: bookingGroup.id,
              paxes: JSON.stringify(bodyData.bookingItems),
            };
            await HotelBookingDetail.create(hotelDetail);
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
          if (
            _response?.data?.booking_id &&
            (_response.data.status === "pending" ||
              _response.data.status === "confirmed")
          ) {
            await HotelBookingLog.create({
              userId: userData.id,
              groupId: bookingGroup.id,
              bookingId: booking.id,
              transactionId: null,
              cardId: bodyData.cardId,
              paymentStatus: "booked",
            });

            console.log("================================");
            console.log("Booking Log Updated");
            console.log("================================");
            try {
              const sendmail = requestHandler.sendEmail(
                userData.email,
                "hotelBooking",
                `Your reservation at- ${bodyData.hotelName} is confirmed - TB-${bookingGroup.currentReference}`,
                {
                  name: `${userData.firstName} ${userData.lastName}`,
                  email: userData.email,
                  hotel_name: bodyData.hotelName,
                  full_address: bodyData.fullAddress,
                  image_url: bodyData.imageUrl,
                  check_in: bodyData.checkIn,
                  check_out: bodyData.checkOut,
                  room_type: bodyData.roomType,
                  total_members: bodyData.totalMember,
                  cancellation_date:
                    utility.convertDateFromTimezone(cancelByDate),
                  total_price: bodyData.totalPrice,
                  booking_id: `TB-${bookingGroup.currentReference}`,
                  booking_date: utility.convertDateFromTimezone(
                    null,
                    null,
                    "YYYY-MM-DD"
                  ),
                  service_tax: revalidateResponse.serviceChages,
                  total_rooms: bodyData.totalRooms,
                  supplier_price: revalidateResponse?.hotel?.rate?.price_details
                    ?.net[1]
                    ? revalidateResponse?.hotel?.rate?.price_details?.net[1]
                        .amount
                    : 0,
                  vat: revalidateResponse?.hotel?.rate?.price_details?.net[0]
                    ? revalidateResponse?.hotel?.rate?.price_details?.net[0]
                        .amount
                    : 0,
                  currency: revalidateResponse?.hotel?.rate?.currency,
                }
              );
            } catch (err) {}
            console.log("================================");
            console.log("Booking Confirm");
            console.log("================================");
          } else {
            //  client remove this mail
            // try {
            //   const sendmail = requestHandler.sendEmail(
            //     userData.email,
            //     "hotelBookingFailed",
            //     `Your Reservation has been failed`,
            //     {
            //       name: `${userData.firstName} ${userData.lastName}`,
            //       hotel_name: bodyData.hotelName,
            //       full_address: bodyData.fullAddress,
            //     }
            //   );
            // } catch (err) {}
          }
        }
        if (_response?.data) {
          _response.data.bookingGroupData = bookingGroup;
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
      const userData = req.user;
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
          _response.data?.booking_status === "confirmed" &&
          _response.data.booking_type === "B"
        ) {
          await bookingObject.update({
            status: _response?.data?.booking_status,
          });
          await HotelBooking.update(
            {
              status: _response?.data?.booking_status,
              paymentStatus: _response?.data?.payment_status,
            },
            {
              where: {
                id: bookingObject?.bookingId,
              },
            }
          );
        } else if (
          _response.data?.booking_status === "confirmed" &&
          _response.data.booking_type === "C"
        ) {
          await bookingObject.update({ status: "cancelled" });
          const bookingData = await HotelBooking.findOne({
            where: {
              id: bookingObject?.bookingId,
            },
          });
          await bookingData.update({
            status: "cancelled",
            platformStatus: "cancelled",
            paymentStatus: _response?.data?.payment_status,
            cancelledDate: _response?.data?.cancellation_details?.cancel_date,
            refundAmout: _response?.data?.cancellation_details?.refund_amount,
            cancellationCharge:
              _response.data?.cancellation_details?.cancellation_charge,
          });
          await HotelBidding.update(
            {
              status: "cancelled",
            },
            {
              where: {
                groupId: bookingObject?.bookingId,
              },
            }
          );

          // check for the refund
          const daysDifference = utility.dateDifference(
            bookingData.cancelByDate,
            await utility.getCurrentDateTime(),
            "days"
          );
          if (
            bookingData.platformPaymentStatus === "paid" &&
            parseInt(daysDifference) <= 0
          ) {
            const HotelBookingLogData = await HotelBookingLog.findOne({
              where: {
                groupId: bookingObject?.id,
                bookingId: bookingObject?.bookingId,
                transactionId: { [Op.ne]: null },
              },
              order: [["id", "DESC"]],
            });
            if (HotelBookingLogData && HotelBookingLogData.transactionId > 0) {
              const checkRequest = await PayBackRequest.findOne({
                where: {
                  bookingGroupId: bookingObject?.id,
                  bookingId: bookingObject?.bookingId,
                  userId: bookingObject?.userId,
                  transictionId: HotelBookingLogData.transactionId,
                },
              });
              if (checkRequest && checkRequest.id) {
                console.log("Already exist");
              } else {
                try {
                  const request_data = await requestHandler.createPayBack(
                    bookingObject?.id,
                    bookingObject?.bookingId,
                    bookingObject?.userId,
                    HotelBookingLogData.transactionId
                  );
                  if (request_data.success === true) {
                    const hotelData = await Hotel.findOne({
                      attributes: ["hotelName"],
                      where: {
                        hotelCode: bookingData.hotelCode,
                      },
                    });
                    const transactionData = await Transaction.findOne({
                      attributes: ["currency", "total"],
                      where: { id: HotelBookingLogData.transactionId },
                    });
                    try {
                      const fullName = `${userData?.firstName} ${userData?.lastName}`;
                      await requestHandler.sendEmail(
                        userData?.email,
                        "hotelRefundStatus",
                        `TrippyBid Refund Request raised`,
                        {
                          name: fullName,
                          status: "raised",
                          currency: "AUD",
                          amount: transactionData?.total,
                          hotel_name: hotelData.hotelName,
                        }
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } catch (error) {}
              }
            }
          }
        } else if (
          _response.data?.booking_status === "failed" ||
          _response.data?.booking_status === "rejected"
        ) {
          await bookingObject.update({
            status: _response.data?.booking_status,
          });
          await HotelBooking.update(
            {
              status: _response.data?.booking_status,
            },
            {
              where: {
                id: bookingObject?.bookingId,
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
      const userData = req.user;
      if (bookingObject.status !== "cancelled") {
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
          console.log("================================");
          console.log("cancellation status", _response.data?.status);
          console.log("================================");
          if (
            _response.data.status === "confirmed" ||
            _response.data.status === "pending"
          ) {
            console.log("================================");
            console.log(
              "Booking Cancellation Confirm/pending Refund Intialize",
              _response.data.status
            );
            console.log("================================");
            // refund intiate

            const bookingLog = await HotelBookingLog.findOne({
              where: {
                bookingId: bookingObject?.bookingId,
                transactionId: { [Op.ne]: null },
              },
            });

            await bookingObject.update({ status: "pending" });
            const updatebooking = await HotelBooking.findOne({
              where: {
                id: bookingObject?.bookingId,
              },
            });
            await updatebooking.update({ status: "pending" });
            try {
              const hotelData = await Hotel.findOne({
                attributes: ["hotelName", "address"],
                where: { hotelCode: updatebooking.hotelCode },
              });
              const sendmail = requestHandler.sendEmail(
                userData.email,
                "hotelBookingCancelled",
                `Your reservation at- ${hotelData.hotelName} has been cancelled- TB-${bookingObject.currentReference}`,
                {
                  name: `${userData.firstName} ${userData.lastName}`,
                  hotel_name: hotelData.hotelName,
                  full_address: hotelData.address,
                  booking_id: `TB-${bookingObject.currentReference}`,
                  email: userData.email,
                  total_price: bookingObject.price,
                  currency: _response?.data?.booking_price?.currency,
                  cancellation_date: utility.convertDateFromTimezone(
                    _response?.data?.cancel_date
                  ),
                  booking_date: utility.convertDateFromTimezone(
                    bookingObject.createdAt
                  ),
                  check_in: bookingObject.checkIn,
                  check_out: bookingObject.checkOut,
                  total_members: bookingObject.totalMember,
                  total_rooms: bookingObject.totalRooms,
                  room_type: updatebooking.roomType,
                }
              );
            } catch (err) {}

            await HotelBookingLog.create({
              userId: userData.id,
              groupId: bookingObject.id,
              bookingId: bookingObject?.bookingId,
              transactionId: bookingLog?.transactionId,
              paymentStatus: "cancelled",
            });
            await HotelBidding.update(
              {
                status: "cancelled",
              },
              {
                where: {
                  groupId: bookingObject.id,
                },
              }
            );
            const checkMainBooking = await HotelBooking.findOne({
              where: {
                bookingGroupId: bookingObject.id,
                platformStatus: "rejected",
              },
            });
            if (checkMainBooking) {
              const apiEndPoint = GRN_Apis.bookingCancel(
                checkMainBooking.bookingReference
              );
              const _response_cancel =
                await requestHandler.fetchResponseFromHotel(
                  apiEndPoint,
                  await this.getSessionToken(),
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
                await checkMainBooking.update({
                  status: "cancelled",
                  platformStatus: "cancelled",
                  paymentStatus: _response_cancel?.data?.payment_status,
                  cancelledDate:
                    _response_cancel?.data?.cancellation_details?.cancel_date,
                  refundAmout:
                    _response_cancel?.data?.cancellation_details?.refund_amount,
                  cancellationCharge:
                    _response_cancel.data?.cancellation_details
                      ?.cancellation_charge,
                });
              }
            }
            this.bookingStatus(req);
          }
        }
        return _response;
      } else {
        return { message: "Booking is already cancelled" };
      }
    } catch (error) {
      throw Error(error);
    }
  },
};
