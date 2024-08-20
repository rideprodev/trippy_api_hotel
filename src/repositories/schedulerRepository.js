import models from "../models";
import utility from "../services/utility";
import requestHandler from "../services/requestHandler";
import config from "../config";
import grnRepository from "./grnRepository";
import biddingRepository from "./biddingRepository";
import userRepository from "./userRepository";
import GRN_Apis from "../config/GRN_Apis";
import { Op } from "sequelize";
import bookingRepository from "./bookingRepository";
const {
  User,
  HotelBooking,
  HotelBookingLog,
  HotelBidding,
  Setting,
  HotelBookingDetail,
  UserMember,
  HotelBookingGroup,
  HotelBiddingPrices,
} = models;

export default {
  /**
   * Auto payment scheduler
   * @param {Object}
   */
  async autoPayment() {
    try {
      const expairedBooking = [],
        finalBookings = [],
        payemntForBooking = [];
      let amount = 10;
      const fetchbookings = await HotelBooking.findAll({
        where: {
          status: "confirmed",
          platformPaymentStatus: "pending",
        },
      });

      // Find All Current Dates
      for (let index = 0; index < fetchbookings.length; index++) {
        const element = fetchbookings[index];
        const daysDifference = utility.dateDifference(
          element.checkIn,
          await utility.getCurrentDateTime(),
          "days"
        );
        if (daysDifference > 0) {
          expairedBooking.push(element.id);
        } else {
          finalBookings.push(element);
        }
      }

      if (expairedBooking.length > 0) {
        await HotelBooking.update(
          { status: "cancelled" },
          { where: { id: expairedBooking } }
        );
      }
      // check the latest date on the booking
      for (let index = 0; index < finalBookings.length; index++) {
        const element = finalBookings[index];
        const daysDifference = utility.dateDifference(
          element.cancelByDate,
          await utility.getCurrentDateTime(),
          "days"
        );
        if (daysDifference < -1 && daysDifference > -2) {
          payemntForBooking.push(element);
        }
      }

      if (payemntForBooking.length > 0) {
        for (let j = 0; j < payemntForBooking.length; j++) {
          const element = payemntForBooking[j];
          const cardId = await HotelBookingLog.findOne({
            where: { groupId: element.bookingGroupId },
          });
          if (config.app.environment !== "development") {
            amount = element.totalPrice;
          }
          const _requestTransaction = {
            userId: element.userId,
            paymentFor: "hotel",
            paymentType: "direct",
            description: `Booking Id-${element.id}`,
            amount: amount,
            currency: element.currency,
            cardId: cardId.cardId,
            card: {},
            isAdded: false,
          };

          const transactionData = await requestHandler.sendForPay(
            _requestTransaction
          );

          if (
            transactionData &&
            transactionData.data &&
            transactionData.data.id
          ) {
            // update bookingLog;
            await HotelBookingLog.create({
              userId: element.userId,
              groupId: element.bookingGroupId,
              bookingId: element.id,
              cardId: cardId.cardId,
              transactionId: transactionData.data.id,
              paymentStatus: "paid",
            });
            await HotelBooking.update(
              { platformPaymentStatus: "paid" },
              { where: { id: element.id } }
            );
            await HotelBidding.update(
              { status: "cancelled" },
              { where: { groupId: element.bookingGroupId } }
            );
            const userData = await User.findOne({
              where: { id: element.userId },
            });
            try {
              await requestHandler.sendEmail(
                userData.email,
                "hotelPayment",
                `Payment Done for booking reference - ${element.bookingReference}`,
                {
                  transaction_id: transactionData.data.id,
                  payment_id: transactionData.data.paymentId,
                  booking_id: element.id,
                  total_price: element.total_price,
                  currency: element.currency,
                }
              );
            } catch (err) {}
          } else {
            try {
              await requestHandler.sendEmail(
                userData.email,
                "hotelPayment",
                `Payment Failed for booking reference - ${element.bookingReference}`,
                {
                  transaction_id: null,
                  payment_id: null,
                  booking_id: element.id,
                  total_price: element.total_price,
                  currency: element.currency,
                }
              );
            } catch (err) {}
          }
        }
        return true;
      } else {
        return true;
      }
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Auto booking scheduler
   * @param {Object}
   */
  async autoBookingOnBidding() {
    try {
      await biddingRepository.updateExpiredBidding();
      const AllBookingGroupData =
        await bookingRepository.getAllBookingForScdulerBidding();
      if (AllBookingGroupData.length > 0) {
        let resultResponse = [];
        const chaunkArray = [],
          counts = 10;
        const arrayLenght = AllBookingGroupData.length;
        const numberCount = arrayLenght / counts;
        const floatCount = numberCount % 1 === 0;
        const loopCount =
          floatCount === false
            ? parseInt(numberCount + 1)
            : parseInt(numberCount);
        let start = 0;
        for (let index = 0; index < loopCount; index++) {
          let end = start + counts;
          chaunkArray.push(AllBookingGroupData.slice(start, end));
          start = end;
        }
        const chunkBookingMap = chaunkArray.map(
          async (x) => await this.checkBookingForBiddingSchedule(x)
        );
        try {
          resultResponse = await Promise.all(chunkBookingMap);
        } catch (err) {
          console.log(err);
        }
        return resultResponse;
      } else {
        return "No Booking-Bidding Found";
      }
    } catch (err) {
      console.log(err);
    }
  },

  async checkBookingForBiddingSchedule(bookingGroupData) {
    try {
      const groupObjectData = bookingGroupData;
      let result = [],
        RevalidateResult = [],
        filterRevalidate = [],
        finalForRevalidate = [],
        bookingResult = [],
        cancelledBooking = [],
        commission = 0,
        commissionAmount = 0,
        totalPrice = 0;
      const hotelData = [],
        updateLatestPrice = [],
        sendForRevalidate = [],
        cancellationBid = [];
      const searchPromise = groupObjectData.map(async (x) => {
        const request = {};
        request.body = JSON.parse(x.searchPayload);
        // filter unique hotel codes
        const hotelCode = x.biddingData
          .map((y) => y.hotelCode)
          .filter((item, i, ar) => ar.indexOf(item) === i);
        // filter unique hotel codes with its roomType
        const rooms = hotelCode.map((y) => {
          const roomTypes = x.biddingData.filter((z) => z.hotelCode === y);
          const roomType = roomTypes
            .map((m) => m.roomType)
            .filter((item, i, ar) => ar.indexOf(item) === i);
          return { hotelCode: y, roomType };
        });
        hotelData.push({
          id: x.id,
          commission: x.userData.commission,
          rooms,
          biddingData: x.biddingData,
          bookingGroupData: x,
        });
        request.body.hotelCode = hotelCode;
        return await grnRepository.search(request);
      });
      try {
        result = await Promise.all(searchPromise);
      } catch (err) {
        console.log(err);
      }
      console.log(result);
      if (result.length > 0 && result[0]?.data?.hotels) {
        // get the commission interest
        const currentDatatime = new Date();
        const comissionPercent = await Setting.findOne({
          where: { key: config.app.GRNPercentageKey },
        });
        commission = parseFloat(comissionPercent.value);
        for (let i = 0; i < hotelData.length; i++) {
          const elementi = hotelData[i];
          const newResponse = result[i]?.data?.hotels;
          elementi.newRates = [];
          for (let j = 0; j < elementi.rooms.length; j++) {
            const elementj = elementi.rooms[j];
            const filterHotel = newResponse.filter(
              (h) => h.hotel_code === elementj.hotelCode
            );
            for (let k = 0; k < elementj.roomType.length; k++) {
              const elementk = elementj.roomType[k];
              const newRates = filterHotel[0].rates.filter((r) => {
                if (
                  r.non_refundable === false &&
                  `${r.rooms[0].room_type}, ${r.boarding_details}` == elementk
                ) {
                  return r;
                }
              });
              if (newRates.length > 0) {
                // add the commission on price
                if (elementi.commission === "relevant") {
                  commissionAmount =
                    (parseFloat(newRates[0].price) * commission) / 100;
                  totalPrice = parseFloat(newRates[0].price) + commissionAmount;
                } else {
                  commission = commissionAmount = 0;
                  totalPrice = `${parseFloat(newRates[0].price).toFixed(2)}`;
                }
                elementi.newRates.push({
                  searchId: result[i]?.data?.search_id,
                  hotelCode: elementj.hotelCode,
                  commission,
                  commissionAmount,
                  totalPrice,
                  roomType: `${newRates[0].rooms[0].room_type}, ${newRates[0].boarding_details}`,
                  ...newRates[0],
                });
              }
            }
          }
        }
        // compare the prices
        for (let i = 0; i < hotelData.length; i++) {
          const elementi = hotelData[i];
          elementi.filterBiddingData = [];
          for (let j = 0; j < elementi.newRates.length; j++) {
            const elementj = elementi.newRates[j];
            const filterBiddingData = elementi.biddingData.filter(
              (x) =>
                elementj.hotelCode === x.hotelCode &&
                elementj.roomType === x.roomType
            );
            if (filterBiddingData.length > 0) {
              for (let index = 0; index < filterBiddingData.length; index++) {
                const elementf = filterBiddingData[index];
                if (
                  elementj.totalPrice > elementf.minBid &&
                  elementj.totalPrice < elementf.maxBid
                ) {
                  // console.log(
                  //   "if",
                  //   elementj.totalPrice,
                  //   elementf.minBid,
                  //   elementf.maxBid,
                  //   elementf.id
                  // );
                  sendForRevalidate.push({
                    newRates: elementj,
                    bid: elementf,
                    maxBidAmount: elementf.maxBid,
                    groupObjectData: elementi.bookingGroupData,
                    id: elementi.bookingGroupData.id,
                  });
                  updateLatestPrice.push({
                    biddingId: elementf.id,
                    userId: elementf.userId,
                    latestPrice: elementj.totalPrice,
                  });
                } else {
                  // console.log(
                  //   "else",
                  //   elementj.totalPrice,
                  //   elementf.minBid,
                  //   elementf.maxBid,
                  //   elementf.id
                  // );
                  updateLatestPrice.push({
                    biddingId: elementf.id,
                    userId: elementf.userId,
                    latestPrice: elementj.totalPrice,
                  });
                }
              }
            }
          }
        }
        // Update Latest Prices Hotel
        // console.log(updateLatestPrice);
        const updateLatestPricesHotelPromise = updateLatestPrice.map((x) =>
          biddingRepository.updatelatestPriceThroghScheduler(x)
        );
        // Need to check the same room bid lowest price
        if (sendForRevalidate.length > 0) {
          for (let fr = 0; fr < sendForRevalidate.length; fr++) {
            const elementfr = sendForRevalidate[fr];
            if (finalForRevalidate.length === 0) {
              finalForRevalidate.push(elementfr);
            } else {
              const filterRevalidate = finalForRevalidate.filter((x) => {
                if (
                  x.newRates.hotelCode === elementfr.newRates.hotelCode &&
                  x.newRates.roomType === elementfr.newRates.roomType
                ) {
                  return x;
                }
              });
              if (filterRevalidate.length > 0) {
                // console.log(
                //   filterRevalidate[0].maxBidAmount,
                //   elementfr.maxBidAmount,
                //   filterRevalidate[0].maxBidAmount > elementfr.maxBidAmount
                // );
                if (filterRevalidate[0].maxBidAmount > elementfr.maxBidAmount) {
                  finalForRevalidate = finalForRevalidate.map((m) => {
                    if (filterRevalidate[0].bid.id === m.bid.id) {
                      cancellationBid.push(filterRevalidate[0].bid);
                      return elementfr;
                    } else {
                      return m;
                    }
                  });
                } else {
                  cancellationBid.push(elementfr.bid);
                }
              } else {
                const checkForSameGroupData = finalForRevalidate.filter(
                  (x) => x.id === elementfr.groupObjectData.id
                );
                if (checkForSameGroupData.length > 0) {
                  cancellationBid.push(elementfr.bid);
                } else {
                  finalForRevalidate.push(elementfr);
                }
              }
            }
          }
          //  revalidate the new Rates
          const revalidatePromise = finalForRevalidate.map(async (x) => {
            const revalidate_request = {};
            revalidate_request.body = {
              searchId: x.newRates.searchId,
              groupCode: x.newRates.group_code,
              rateKey: x.newRates.rate_key,
            };
            return await grnRepository.revalidate(revalidate_request);
          });
          try {
            RevalidateResult = await Promise.all(revalidatePromise);
          } catch (err) {
            console.log(err);
          }
          // check bookable or not
          filterRevalidate = RevalidateResult.filter((x, i) => {
            if (x.data.hotel.rate.rate_type === "bookable") {
              return x;
            } else {
              finalForRevalidate = finalForRevalidate.filter((a, b) => {
                if (i !== b) {
                  return a;
                }
              });
            }
          });
          // start booking on thired party
          const GRNtoken = await grnRepository.getSessionToken();
          const bookingPromise = filterRevalidate.map(async (x, i) => {
            const revalidateHotelData = x.data.hotel;
            const requestData = finalForRevalidate[i];
            const biddingObject = requestData.bid;
            const bookingGroupObject = requestData.groupObjectData;
            const userData = bookingGroupObject.userData;
            const bookingDetails = bookingGroupObject.bookingDetils;
            //  create holder booking for this bidding
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
            /*
             * if the booking can be able to for the current rate
             */
            //  set the members for the new booking
            let members = [];
            if (bookingGroupObject.isUserTravelled === "true") {
              const userInformation = userData?.UserPersonalInformation;
              const userMember = {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                title: userInformation.title,
                nationality: userInformation.nationality,
                type: "AD",
              };
              members = [...members, userMember];
            }
            const roomsData = [];
            for (let j = 0; j < bookingGroupObject.totalRooms; j++) {
              const roomInfo = bookingDetails.filter(
                (x) => x.roomNumber == j + 1
              );
              const paxes = `${roomInfo[0].paxes}`.split(",");
              const ages = `${roomInfo[0].ages}`.split(",");
              roomsData.push({
                room_reference:
                  revalidateHotelData?.rate?.rooms[0]?.room_reference,
                paxes: paxes,
                ages: ages,
              });
            }
            let membersId = [];
            //  setting up the booking data
            const bookingItems = [
              {
                room_code: revalidateHotelData?.rate?.room_code,
                rate_key: revalidateHotelData?.rate?.rate_key,
                rooms: roomsData,
              },
            ];
            // console.log(bookingItems[0]);
            for (let index = 0; index < bookingItems.length; index++) {
              const e = bookingItems[index];
              for (let i = 0; i < e.rooms.length; i++) {
                const element = e.rooms[i];
                membersId = [...membersId, ...element.paxes];
              }
            }
            // console.log(membersId);
            if (membersId.length > 0) {
              const onlyMember = membersId.filter((x) => x != userData.id);
              if (onlyMember.length > 0) {
                const memberData = await UserMember.findAll({
                  where: { id: onlyMember },
                });
                for (let j = 0; j < memberData.length; j++) {
                  const jelement = memberData[j].dataValues;
                  members = [...members, jelement];
                }
              }
            }
            const membersData = members;
            // console.log(membersData, membersData);
            //  set the paxes
            for (let index = 0; index < bookingItems.length; index++) {
              const e = bookingItems[index];
              for (let i = 0; i < e.rooms.length; i++) {
                e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
                  const paxesData = membersData.filter(
                    (item) => item.id == x
                  )[0];
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
                    type: e.rooms[i].ages[k] >= 12 ? "AD" : "CH",
                    age: e.rooms[i].ages[k],
                  };
                });
                delete e.rooms[i].ages;
                // console.log(e.rooms[i]);
              }
            }
            const bookingRequest = {
              search_id: x.data.search_id,
              hotel_code: revalidateHotelData.hotel_code,
              city_code: revalidateHotelData.city_code,
              group_code: revalidateHotelData.rate.group_code,
              checkout: bookingGroupObject.checkOut,
              checkin: bookingGroupObject.checkIn,
              booking_name: `${bookingGroupObject.bookingName}-Bid-${biddingObject.id}`,
              booking_comments: bookingGroupObject.bookingComments,
              booking_items: bookingItems,
              payment_type: "AT_WEB",
              agent_reference: "",
              cutoff_time: 120000,
              holder: holder,
            };
            // console.log(bookingRequest);
            return await requestHandler.fetchResponseFromHotel(
              GRN_Apis.booking,
              GRNtoken,
              bookingRequest
            );
          });
          try {
            bookingResult = await Promise.all(bookingPromise);
          } catch (err) {
            console.log(err);
          }
          const saveAndCancelBookingPromise = bookingResult.map(
            async (x, i) => {
              const _response = x;
              const revalidateData = filterRevalidate[i].data;
              const revalidateHotelData = revalidateData.hotel;
              const requestData = finalForRevalidate[i];
              const newRateData = requestData.newRates;
              const bookingGroupObject = requestData.groupObjectData;
              const userData = bookingGroupObject.userData;
              if (
                _response !== undefined &&
                (_response?.data?.status == "pending" ||
                  _response?.data?.status == "confirmed")
              ) {
                let nonRefundable = null,
                  underCancellation = null,
                  cancelByDate = null,
                  cancellationPolicy = null;
                if (
                  _response?.data?.hotel?.booking_items &&
                  _response?.data?.hotel?.booking_items.length > 0 &&
                  typeof _response?.data?.hotel?.booking_items[0]
                    ?.non_refundable === "boolean"
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
                        _response.data.hotel.booking_items[0]
                          ?.cancellation_policy?.cancel_by_date;
                    }
                  }
                }
                let bookingData = {
                  userId: bookingGroupObject.userId,
                  bookingGroupId: bookingGroupObject.id,
                  hotelCode: revalidateHotelData.hotel_code,
                  cityCode: revalidateHotelData.city_code,
                  checkOut: bookingGroupObject.checkOut,
                  checkIn: bookingGroupObject.checkIn,
                  currency: userData.UserPersonalInformation.currencyCode,
                  price: _response?.data?.price?.total
                    ? _response?.data?.price?.total
                    : revalidateHotelData.rate.price,
                  commission: newRateData.commission,
                  commissionAmount: newRateData.commissionAmount,
                  totalPrice: newRateData.totalPrice,
                  roomType: newRateData.roomType,
                  bookingId: _response?.data?.booking_id
                    ? _response?.data?.booking_id
                    : "",
                  bookingDate: _response?.data?.booking_date
                    ? _response?.data?.booking_date
                    : currentDatatime,
                  bookingReference: _response?.data?.booking_reference
                    ? _response?.data?.booking_reference
                    : "",
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
                  searchId: _response?.data?.search_id,
                  reavalidateResponse: JSON.stringify(revalidateData),
                };
                // console.log(bookingData);
                // create the new booking
                const booking = await HotelBooking.create(bookingData);
                // console.log("================================");
                console.log("booking created", booking?.id);
                // console.log("================================");
                if (booking && booking?.id) {
                  requestData.newBookingId = booking.id;
                  requestData.newExpairationDate = cancelByDate;
                  HotelBookingGroup.update(
                    {
                      bookingId: booking.id,
                      currentReference: _response?.data?.booking_reference,
                      bookingDate: _response?.data?.booking_date
                        ? _response?.data?.booking_date
                        : currentDatatime,
                      price: newRateData.totalPrice,
                      status: _response?.data?.status
                        ? _response?.data?.status
                        : "failed",
                    },
                    { where: { id: bookingGroupObject.id } }
                  );
                  try {
                    const sendmail_confirm = requestHandler.sendEmail(
                      userData.email,
                      "hotelBooking",
                      `Your Reservation has been Confirmed - Booking ID: ${bookingGroup.currentReference}`,
                      {
                        name: `${userData.firstName} ${userData.lastName}`,
                        email: userData.email,
                        hotel_name: revalidateHotelData.name,
                        full_address: revalidateHotelData.address,
                        image_url: revalidateHotelData.images.url,
                        check_in: bookingGroupObject.checkIn,
                        check_out: bookingGroupObject.checkOut,
                        room_type: newRateData.roomType,
                        total_members: bookingGroupObject.totalMember,
                        cancellation_date: cancelByDate,
                        total_price: newRateData.totalPrice,
                        booking_id: _response?.data?.booking_reference,
                        booking_date: currentDatatime,
                        service_tax: newRateData.commissionAmount,
                        total_rooms: bookingGroupObject.totalRooms,
                        total_nights: "",
                        price_distribution: newRateData.totalPrice,
                        currency: userData.UserPersonalInformation.currencyCode,
                      }
                    );
                  } catch (err) {}
                }
                const apiEndPoint = GRN_Apis.bookingCancel(
                  bookingGroupObject.currentReference
                );
                return await requestHandler.fetchResponseFromHotel(
                  apiEndPoint,
                  GRNtoken,
                  { cutoff_time: 60000 }
                );
              }
            }
          );
          try {
            cancelledBooking = await Promise.all(saveAndCancelBookingPromise);
          } catch (err) {
            console.log(err);
          }
          const updateDataAndMailPromise = cancelledBooking.map(
            async (x, i) => {
              let transactionId = 0,
                cardId = 0;
              const _response_cancel = x;
              const requestData = finalForRevalidate[i];
              const newRateData = requestData.newRates;
              const bookingGroupObject = requestData.groupObjectData;
              const userData = bookingGroupObject.userData;
              if (_response_cancel !== undefined) {
                console.log("================================");
                console.log(_response_cancel.data.status);
                console.log("================================");
                if (
                  _response_cancel.data.status === "confirmed" ||
                  _response_cancel.data.status === "pending"
                ) {
                  console.log("================================");
                  console.log(
                    "Booking Cancellation Confirm/pending Refund Intialize",
                    _response_cancel.data.status
                  );
                  console.log("================================");
                  try {
                    const sendmail_cancel = requestHandler.sendEmail(
                      userData.email,
                      "hotelBookingCancelled",
                      `Reservation with ID: ${element.currentReference} has been Cancelled`,
                      {
                        name: `${userData.firstName} ${userData.lastName}`,
                        email: userData.email,
                        check_in: bookingGroupObject.checkIn,
                        check_out: bookingGroupObject.checkOut,
                        room_type: newRateData.roomType,
                        total_members: bookingGroupObject.totalMember,
                        total_rooms: bookingGroupObject.totalRooms,
                        cancellation_date:
                          _response_cancel?.data?.cancellation_details
                            ?.cancel_date,
                        booking_id: bookingGroupObject.currentReference,
                        booking_date: bookingGroupObject.createdAt,
                      }
                    );
                  } catch (err) {}
                  HotelBooking.update(
                    {
                      status: "cancelled",
                      cancelledDate: _response_cancel?.data?.cancel_date,
                      refundAmout: parseFloat(
                        parseFloat(
                          _response_cancel?.data?.booking_price?.amount
                        ) -
                          parseFloat(
                            _response_cancel.data?.cancellation_charges?.amount
                          )
                      ).toFixed(2),
                      cancellationCharge: parseFloat(
                        _response_cancel.data?.cancellation_charges?.amount
                      ).toFixed(2),
                    },
                    { where: { id: bookingGroupObject.bookingId } }
                  );
                  //  update logs
                  const bookingLog = await HotelBookingLog.findAll({
                    where: {
                      groupId: bookingGroupObject.id,
                      bookingId: bookingGroupObject.bookingId,
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
                    userId: bookingGroupObject.userId,
                    groupId: bookingGroupObject.id,
                  };
                  if (cardId > 0) {
                    logRequest.cardId = cardId;
                  }
                  if (transactionId > 0) {
                    logRequest.transactionId = transactionId;
                  }
                  // console.log(logRequest
                  HotelBookingLog.bulkCreate([
                    {
                      ...logRequest,
                      bookingId: bookingGroupObject.bookingId,
                      paymentStatus: "cancelled",
                    },
                    {
                      ...logRequest,
                      bookingId: requestData.newBookingId,
                      paymentStatus: "booked",
                    },
                  ]);
                }
                return true;
              }
            }
          );
          // // update the complete biddings
          const updateBiddingsConfimed = bookingResult.map((x, i) => {
            const _response = x;
            const requestData = finalForRevalidate[i];
            const biddingData = requestData.bid;
            const newRateData = requestData.newRates;
            if (
              _response !== undefined &&
              (_response?.data?.status == "pending" ||
                _response?.data?.status == "confirmed")
            ) {
              // console.log(newRateData.totalPrice);
              HotelBidding.update(
                { expairationAt: requestData.newExpairationDate },
                {
                  where: {
                    // id: { [Op.ne]: biddingData.id },
                    groupId: requestData.id,
                  },
                }
              );
              HotelBidding.update(
                { status: "completed", latestPrice: newRateData.totalPrice },
                { where: { id: biddingData.id } }
              );
            }
            return true;
          });
          // cancelled all same or hiteed bit not pror bids
          const updateCancellationBiddings = cancellationBid.map((x) => x.id);
          try {
            await Promise.all(updateDataAndMailPromise);
            await Promise.all(updateBiddingsConfimed);
            if (updateCancellationBiddings.length > 0) {
              await HotelBidding.update(
                { status: "cancelled" },
                { where: { id: updateCancellationBiddings } }
              );
            }
          } catch (err) {
            console.log(err);
          }
          //........
        }
        return {
          cancelledBooking,
          bookingResult,
          filterRevalidate,
          finalForRevalidate,
          cancellationBid,
          sendForRevalidate,
          updateLatestPrice,
          hotelData,
          result,
          groupObjectData,
        };
      } else {
        return "No Any Search Result Found";
      }
    } catch (err) {
      console.log(err);
    }
  },

  async checkbiddingforbooking(biddingData) {
    try {
      const Bidding = biddingData;
      //     // update bidding if the same room was bid but hight price from booking
      // const same_bidding = await HotelBidding.findAll({
      //   where: {
      //     id: { [Op.ne]: element.id },
      //     groupId: element.groupId,
      //     room_type: element.roomType,
      //   },
      // });
      // if (same_bidding.length > 0) {
      //   // check the price higher from the current booking
      // }
      // need to group all simmilar bid and book the lowest one and cancel remaing
      // ---------------------------------------------------------------------

      //  check for expairation
      const currentDate = new Date();
      const unExpiredBidding = [];
      for (let i = 0; i < Bidding.length; i++) {
        const x = Bidding[i].dataValues?.expairationAt
          ? Bidding[i].dataValues
          : Bidding[i];
        if (x.expairationAt < currentDate) {
          await biddingRepository.updateBiddingStatus(null, "expired", x.id);
        } else {
          unExpiredBidding.push(x);
        }
      }
      console.log("unExpiredBidding=>", unExpiredBidding.length);

      if (unExpiredBidding.length > 0) {
        const hotelCodes = unExpiredBidding.map((x) => x.hotelCode);
        console.log(hotelCodes);
      }

      //  searching the latest price
      for (let i = 0; i < unExpiredBidding.length; i++) {
        const request = {},
          element = unExpiredBidding[i];
        let filterRateData = [];
        request.body = JSON.parse(element.bookingGroupData.searchPayload);
        request.body.hotelCode = [element.hotelCode];
        const search_respose = await grnRepository.search(request);
        if (search_respose?.data?.hotels.length > 0) {
          const rateData = search_respose?.data?.hotels[0]?.rates;
          filterRateData = rateData
            .map((x) => {
              return {
                searchId: search_respose?.data?.search_id,
                groupCode: x.group_code,
                rateKey: x.rate_key,
                roomType: `${x.rooms[0].room_type}, ${x.boarding_details}`,
                roomReference: x.rooms[0].room_reference,
                price: x.price,
              };
            })
            .filter((x) => x.roomType === element.roomType);
        }

        console.log("filterRateData =", filterRateData.length);
        //  check the filter room is vailibale or not
        if (filterRateData.length > 0) {
          // get user commission
          const filteredRate = filterRateData[0];
          const revalidate_request = {};
          let commission = 0,
            commissionAmount = 0,
            totalPrice = 0;
          revalidate_request.body = {
            searchId: filteredRate.searchId,
            groupCode: filteredRate.groupCode,
            rateKey: filteredRate.rateKey,
          };
          // revalidate_request.user = userData;
          const reavalidateResponse = await grnRepository.revalidate(
            revalidate_request
          );
          if (reavalidateResponse.data.hotel.rate.rate_type === "bookable") {
            const userData = await userRepository.findOne({
              id: element.userId,
            });
            if (userData.commission === "relevant") {
              const comissionPercent = await Setting.findOne({
                where: { key: "b05970e2431ae626c0f4a0f67c56848bdf22811d" },
              });
              commission = parseFloat(comissionPercent.value);
              commissionAmount =
                (parseFloat(reavalidateResponse.data?.hotel?.rate?.price) *
                  commission) /
                100;
              totalPrice =
                parseFloat(reavalidateResponse.data?.hotel?.rate?.price) +
                commissionAmount;
              reavalidateResponse.data.serviceChages = `${commissionAmount}`;
              reavalidateResponse.data.finalAmount = `${parseFloat(
                totalPrice
              ).toFixed(2)}`;
            } else {
              reavalidateResponse.data.serviceChages = "0";
              totalPrice = `${parseFloat(
                reavalidateResponse.data?.hotel?.rate?.price
              ).toFixed(2)}`;
              reavalidateResponse.data.finalAmount = `${parseFloat(
                reavalidateResponse.data?.hotel?.rate?.price
              ).toFixed(2)}`;
            }
            // check for the booking or update the rate
            if (
              reavalidateResponse.data.finalAmount > element.minBid &&
              reavalidateResponse.data.finalAmount < element.maxBid
            ) {
              console.log(
                "Bidding Hit enter If condition",
                "=",
                reavalidateResponse.data.finalAmount,
                element.minBid,
                element.maxBid
              );
              /*
               * if the booking can be able to for the current rate
               */
              //  set the members for the new booking
              let members = [];
              if (element.bookingGroupData.isUserTravelled === "true") {
                const userInformation = userData?.UserPersonalInformation;
                const userMember = {
                  id: userData.id,
                  title: userInformation.title,
                  nationality: userInformation.nationality,
                  type: "AD",
                };
                members = [...members, userMember];
              }
              const bookingDetails = await HotelBookingDetail.findAll({
                where: { bookingGroupId: element.groupId },
              });
              const roomsData = [];
              for (let j = 0; j < element.bookingGroupData.totalRooms; j++) {
                const roomInfo = bookingDetails.filter(
                  (x) => x.roomNumber == j + 1
                );
                const paxes = roomInfo.map((x) => x.paxes);
                const ages = roomInfo.map((x) => x.ages);
                roomsData.push({
                  room_reference: filteredRate.roomReference,
                  paxes: paxes,
                  ages: ages,
                });
              }
              let membersId = [];
              //  setting up the booking data
              const bookingItems = [
                {
                  room_code: reavalidateResponse.data?.hotel?.rate?.room_code,
                  rate_key: reavalidateResponse.data?.hotel?.rate?.rate_key,
                  rooms: roomsData,
                },
              ];
              for (let index = 0; index < bookingItems.length; index++) {
                const e = bookingItems[index];
                for (let i = 0; i < e.rooms.length; i++) {
                  const element = e.rooms[i];
                  membersId = [...membersId, ...element.paxes];
                }
              }
              if (membersId.length > 0) {
                const onlyMember = membersId.filter((x) => x !== userData.id);
                if (onlyMember.length > 0) {
                  const memberData = await UserMember.findAll({
                    where: { id: onlyMember },
                  });
                  for (let j = 0; j < memberData.length; j++) {
                    const jelement = memberData[j].dataValues;
                    members = [...members, jelement];
                  }
                }
              }
              const membersData = members;
              //  create booking for this bidding
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
                client_nationality:
                  userData.UserPersonalInformation.nationality,
              };
              //  set the paxes
              for (let index = 0; index < bookingItems.length; index++) {
                const e = bookingItems[index];
                for (let i = 0; i < e.rooms.length; i++) {
                  e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
                    const paxesData = membersData.filter(
                      (item) => item.id == x
                    )[0];
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
                      type: e.rooms[i].ages[k] >= 12 ? "AD" : "CH",
                      age: e.rooms[i].ages[k],
                    };
                  });
                  delete e.rooms[i].ages;
                  // console.log(e.rooms[i]);
                }
              }
              console.log(
                "=================== start booking ===================="
              );

              // Request Data
              const booking_request_data = {
                search_id: filteredRate.searchId,
                hotel_code: element.hotelCode,
                city_code: reavalidateResponse.data.hotel.city_code,
                group_code: reavalidateResponse.data.hotel.rate.group_code,
                checkout: element.checkOut,
                checkin: element.checkIn,
                booking_name: `${element.bookingGroupData.bookingName}-Bid-${element.id}`,
                booking_comments: element.bookingGroupData.bookingComments,
                booking_items: bookingItems,
                payment_type: "AT_WEB",
                agent_reference: "",
                cutoff_time: 120000,
                holder: holder,
              };
              const _response = await requestHandler.fetchResponseFromHotel(
                GRN_Apis.booking,
                await grnRepository.getSessionToken(),
                booking_request_data
              );
              console.log(
                "=================== booking done ===================="
              );
              console.log("_response", _response?.data?.status);
              // save the new  booking=======
              if (
                _response !== undefined &&
                (_response?.data?.status == "pending" ||
                  _response?.data?.status == "confirmed")
              ) {
                console.log(
                  "=================== save booking ====================",
                  _response?.data?.status
                );
                const currentDatatime = await utility.getCurrentDateTime();
                let nonRefundable = null,
                  underCancellation = null,
                  cancelByDate = null,
                  cancellationPolicy = null,
                  cardId = null,
                  transactionId = null;
                if (
                  _response?.data?.hotel?.booking_items &&
                  _response?.data?.hotel?.booking_items.length > 0 &&
                  typeof _response?.data?.hotel?.booking_items[0]
                    ?.non_refundable === "boolean"
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
                        _response.data.hotel.booking_items[0]
                          ?.cancellation_policy?.cancel_by_date;
                    }
                  }
                }
                let bookingData = {
                  userId: userData.id,
                  bookingGroupId: element.groupId,
                  hotelCode: booking_request_data.hotel_code,
                  cityCode: booking_request_data.city_code,
                  checkIn: booking_request_data.checkin,
                  checkOut: booking_request_data.checkout,
                  currency: request.body.currency,
                  commission: commission,
                  commissionAmount: commissionAmount,
                  totalPrice: totalPrice,
                  roomType: element.roomType,
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
                    : reavalidateResponse.data.hotel.rate.price,
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
                  searchId: booking_request_data.search_id,
                  reavalidateResponse: JSON.stringify(reavalidateResponse.data),
                };
                // console.log(bookingData);
                // create the new booking
                const booking = await HotelBooking.create(bookingData);
                console.log("================================");
                console.log("booking created", booking.id);
                console.log("================================");
                if (booking) {
                  await HotelBookingGroup.update(
                    {
                      bookingId: booking.id,
                      currentReference: _response?.data?.booking_reference,
                      bookingDate: _response?.data?.booking_date
                        ? _response?.data?.booking_date
                        : currentDatatime,
                      price: totalPrice,
                      status: _response?.data?.status
                        ? _response?.data?.status
                        : "failed",
                    },
                    { where: { id: element.groupId } }
                  );
                  // send the mail of success fully booked from the bidding
                  try {
                    const sendmail_confirm = requestHandler.sendEmail(
                      userData.email,
                      "hotelBooking",
                      `Your Reservation has been Confirmed - Booking ID: ${bookingGroup.currentReference}`,
                      {
                        name: `${userData.firstName} ${userData.lastName}`,
                        email: userData.email,
                        hotel_name: reavalidateResponse.data.hotel.name,
                        full_address: reavalidateResponse.data.hotel.address,
                        image_url: reavalidateResponse.data.hotel.images.url,
                        check_in: booking_request_data.checkin,
                        check_out: booking_request_data.checkout,
                        room_type: element.roomType,
                        total_members: element.totalMember,
                        cancellation_date: cancelByDate,
                        total_price: totalPrice,
                        booking_id: bookingGroup.currentReference,
                        booking_date: currentDatatime,
                        service_tax: commissionAmount,
                        total_rooms: element.totalRooms,
                        total_nights: bodyData.totalNight,
                        price_distribution: totalPrice,
                        currency: request.body.currency,
                      }
                    );
                  } catch (err) {}
                  // Update the booking for cancel
                  const apiEndPoint = GRN_Apis.bookingCancel(
                    element.bookingGroupData.currentReference
                  );
                  const _response_cancel =
                    await requestHandler.fetchResponseFromHotel(
                      apiEndPoint,
                      await grnRepository.getSessionToken(),
                      { cutoff_time: 60000 }
                    );
                  // console.log(_response_cancel);
                  if (_response_cancel !== undefined) {
                    console.log("================================");
                    console.log(_response_cancel.data.status);
                    console.log("================================");
                    if (
                      _response_cancel.data.status === "confirmed" ||
                      _response_cancel.data.status === "pending"
                    ) {
                      console.log("================================");
                      console.log(
                        "Booking Cancellation Confirm/pending Refund Intialize",
                        _response_cancel.data.status
                      );
                      console.log("================================");
                      try {
                        const sendmail_cancel = requestHandler.sendEmail(
                          userData.email,
                          "hotelBookingCancelled",
                          `Reservation with ID: ${element.currentReference} has been Cancelled`,
                          {
                            name: `${userData.firstName} ${userData.lastName}`,
                            email: userData.email,
                            check_in: booking_request_data.checkin,
                            check_out: booking_request_data.checkout,
                            room_type: element.roomType,
                            total_members: element.totalMember,
                            total_rooms: element.totalRooms,
                            cancellation_date:
                              _response_cancel?.data?.cancellation_details
                                ?.cancel_date,
                            booking_id: element.currentReference,
                            booking_date: element.createdAt,
                          }
                        );
                      } catch (err) {}
                    }
                  }
                  //  update the old booking cancelled
                  await HotelBooking.update(
                    {
                      status: "cancelled",
                      cancelledDate:
                        _response_cancel?.data?.cancellation_details
                          ?.cancel_date,
                      refundAmout:
                        _response_cancel?.data?.cancellation_details
                          ?.refund_amount,
                      cancellationCharge:
                        _response_cancel.data?.cancellation_details
                          ?.cancellation_charge,
                    },
                    { where: { id: element.bookingGroupData.bookingId } }
                  );
                  // update cancel log

                  const bookingLog = await HotelBookingLog.findAll({
                    where: {
                      groupId: element.groupId,
                      bookingId: element.bookingGroupData.bookingId,
                    },
                  });
                  console.log(
                    bookingLog,
                    element.groupId,
                    element.bookingGroupData.bookingId
                  );
                  for (let i = 0; i < bookingLog.length; i++) {
                    const element1 = bookingLog[i];
                    cardId = element1.cardId;
                    if (element1.transactionId > 0) {
                      transactionId = element1.transactionId;
                    }
                  }
                  await HotelBookingLog.create({
                    userId: userData.id,
                    groupId: element.groupId,
                    bookingId: element.bookingGroupData.bookingId,
                    transactionId: transactionId,
                    cardId: cardId,
                    paymentStatus: "cancelled",
                  });
                  await HotelBookingLog.create({
                    userId: userData.id,
                    groupId: element.groupId,
                    bookingId: booking.id,
                    transactionId: transactionId,
                    cardId: cardId,
                    paymentStatus: "booked",
                  });
                  //  update the booking complete
                  await HotelBidding.update(
                    { status: "completed", latestPrice: totalPrice },
                    { where: { id: element.id } }
                  );
                  // update the latest price in graph
                  const priceData = {
                    userId: userData.id,
                    biddingId: element.id,
                    latestPrice: totalPrice,
                  };
                  await HotelBiddingPrices.create(priceData);
                }
                // return {
                //   cardId,
                //   transactionId,
                //   search_respose,
                //   _response,
                //   reavalidateResponse,
                //   element,
                //   userData,
                // };
              }
            } else {
              /*
               * if the booking rate is diffrebnt than updatethe rate only
               */
              console.log(
                "Not Bidding Hot enter else condition",
                "=",
                reavalidateResponse.data.finalAmount,
                element.minBid,
                element.maxBid
              );
              const priceData = {
                userId: userData.id,
                biddingId: element.id,
                latestPrice: totalPrice,
              };
              await HotelBidding.update(
                {
                  latestPrice: totalPrice,
                },
                { where: { id: element.id } }
              );
              const price_response = await HotelBiddingPrices.create(priceData);
              return price_response;
            }
          }
        }
      }
      return true;
    } catch (error) {
      throw Error(error);
    }
  },
};
