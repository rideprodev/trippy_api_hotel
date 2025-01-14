import models from "../models";
import utility from "../services/utility";
import requestHandler from "../services/requestHandler";
import config from "../config";
import grnRepository from "./grnRepository";
import biddingRepository from "./biddingRepository";
import GRN_Apis from "../config/GRN_Apis";
import { Op, where } from "sequelize";
import bookingRepository from "./bookingRepository";
const {
  User,
  HotelBooking,
  HotelBookingLog,
  HotelBidding,
  Setting,
  HotelBookingDetail,
  HotelBookingGroup,
  Hotel,
} = models;

export default {
  /**
   * Auto payment scheduler
   * @param {Object}
   */
  async autoPayment() {
    // try {
    //   const expairedBooking = [],
    //     finalBookings = [],
    //     payemntForBooking = [];
    //   const currentDate = await utility.getCurrentDateTime();
    //   let amount = 1,
    //     platformPaymentStatus = "";
    //   const fetchbookings = await HotelBooking.findAll({
    //     where: {
    //       status: "confirmed",
    //       platformPaymentStatus: { [Op.ne]: "paid" },
    //     },
    //   });
    //   // Find All Current Dates
    //   for (let index = 0; index < fetchbookings.length; index++) {
    //     const element = fetchbookings[index];
    //     const daysDifference = utility.dateDifference(
    //       element.cancelByDate,
    //       currentDate,
    //       "days"
    //     );
    //     // console.log(
    //     //   element.id,
    //     //   element.cancelByDate,
    //     //   await utility.getCurrentDateTime(),
    //     //   daysDifference,
    //     //   element.platformPaymentStatus
    //     // );
    //     if (daysDifference > 0) {
    //       expairedBooking.push(element);
    //     } else {
    //       finalBookings.push(element);
    //     }
    //   }
    //   if (expairedBooking.length > 0) {
    //     for (let e = 0; e < expairedBooking.length; e++) {
    //       const elementExpaired = expairedBooking[e];
    //       console.log("expairedBooking", elementExpaired.id);
    //       const bookingObject = await HotelBookingGroup.findOne({
    //         where: { id: elementExpaired.bookingGroupId },
    //       });
    //       const userData = await User.findOne({
    //         where: { id: elementExpaired.userId },
    //       });
    //       if (bookingObject && userData) {
    //         const req = {};
    //         req.user = userData;
    //         req.bookingObject = bookingObject;
    //         try {
    //           const respose = await grnRepository.bookingCancel(req);
    //         } catch (err) {}
    //         // console.log(elementExpaired.id, respose);
    //       }
    //     }
    //   }
    //   // check the latest date on the booking
    //   for (let index = 0; index < finalBookings.length; index++) {
    //     const element = finalBookings[index];
    //     const daysDifference = utility.dateDifference(
    //       element.cancelByDate,
    //       currentDate,
    //       "days"
    //     );
    //     // console.log(
    //     //   element.id,
    //     //   parseInt(daysDifference),
    //     //   element.platformPaymentStatus,
    //     //   parseInt(daysDifference) === -1 &&
    //     //     element.platformPaymentStatus == "not-done"
    //     // );
    //     // if (
    //     //   //Reminder
    //     //   parseInt(daysDifference) === -9 &&
    //     //   element.platformPaymentStatus === "pending"
    //     // ) {
    //     //   // Payment Reminder mail
    //     //   try {
    //     //     const userData = await User.findOne({
    //     //       where: { id: element.userId },
    //     //     });
    //     //     const fullName = `${userData.firstName} ${userData.lastName}`;
    //     //     const hotelData = await Hotel.findOne({
    //     //       attributes: ["hotelName"],
    //     //       where: { hotelCode: element.hotelCode },
    //     //     });
    //     //     await requestHandler.sendEmail(
    //     //       userData.email,
    //     //       "hotelPaymentReminder",
    //     //       `TrippyBid Payment Reminder: ${element.bookingReference}`,
    //     //       {
    //     //         name: fullName,
    //     //         hotel_name: hotelData?.hotelName,
    //     //         payment_date: utility.getDateAfterBeforeFromDate(
    //     //           currentDate,
    //     //           2
    //     //         ),
    //     //         total_price: element.totalPrice,
    //     //         currency: element.currency,
    //     //         hotel_name: hotelData.hotelName,
    //     //       }
    //     //     );
    //     //   } catch (err) {}
    //     // } else if (
    //     //   //authentication
    //     //   parseInt(daysDifference) === -7 &&
    //     //   element.platformPaymentStatus === "pending"
    //     // ) {
    //     //   const cardId = await HotelBookingLog.findOne({
    //     //     where: { groupId: element.bookingGroupId },
    //     //   });
    //     //   const _requestTransaction = {
    //     //     userId: element.userId,
    //     //     paymentFor: "hotel",
    //     //     paymentType: "direct",
    //     //     description: `Booking Id-${element.id}`,
    //     //     amount: "1",
    //     //     currency: "AUD",
    //     //     cardId: cardId.cardId,
    //     //     card: {},
    //     //     isAdded: false,
    //     //     reason: "Authentication",
    //     //   };
    //     //   // console.log(_requestTransaction);
    //     //   const transactionData = await requestHandler.sendForPay(
    //     //     _requestTransaction
    //     //   );
    //     //   if (
    //     //     transactionData &&
    //     //     transactionData.data &&
    //     //     transactionData.data.id
    //     //   ) {
    //     //     const RefundData = await requestHandler.sendForRefund(
    //     //       transactionData.data.id,
    //     //       element.userId
    //     //     );
    //     //     if (
    //     //       RefundData &&
    //     //       RefundData.data &&
    //     //       RefundData.data.refund &&
    //     //       RefundData.data.refund?.status !== "APPROVED"
    //     //     ) {
    //     //       const userData = await User.findOne({
    //     //         where: { id: element.userId },
    //     //       });
    //     //       const fullName = `${userData.firstName} ${userData.lastName}`;
    //     //       const hotelData = await Hotel.findOne({
    //     //         attributes: ["hotelName"],
    //     //         where: { hotelCode: element.hotelCode },
    //     //       });
    //     //       try {
    //     //         await requestHandler.sendEmail(
    //     //           userData.email,
    //     //           "hotelPaymentAuthentication",
    //     //           `TrippyBid Payment Authentication Failed: ${element.bookingReference}`,
    //     //           {
    //     //             name: fullName,
    //     //             hotel_name: hotelData?.hotelName,
    //     //             payment_date:
    //     //               utility.getDateAfterBeforeFromDate(currentDate),
    //     //             hotel_name: hotelData.hotelName,
    //     //           }
    //     //         );
    //     //       } catch (err) {}
    //     //     }
    //     //   } else {
    //     //     // payment not done please update the card
    //     //     const userData = await User.findOne({
    //     //       where: { id: element.userId },
    //     //     });
    //     //     const fullName = `${userData.firstName} ${userData.lastName}`;
    //     //     const hotelData = await Hotel.findOne({
    //     //       attributes: ["hotelName"],
    //     //       where: { hotelCode: element.hotelCode },
    //     //     });
    //     //     try {
    //     //       await requestHandler.sendEmail(
    //     //         userData.email,
    //     //         "hotelPaymentAuthentication",
    //     //         `TrippyBid Payment Authentication Failed: ${element.bookingReference}`,
    //     //         {
    //     //           name: fullName,
    //     //           hotel_name: hotelData?.hotelName,
    //     //           payment_date: utility.getDateAfterBeforeFromDate(currentDate),
    //     //           hotel_name: hotelData.hotelName,
    //     //         }
    //     //       );
    //     //     } catch (err) {}
    //     //   }
    //     // } else
    //     if (
    //       parseInt(daysDifference) === -6 &&
    //       element.platformPaymentStatus === "pending"
    //     ) {
    //       payemntForBooking.push(element);
    //       platformPaymentStatus = "unpaid";
    //     } else if (
    //       (parseInt(daysDifference) === -4 &&
    //         element.platformPaymentStatus === "unpaid") ||
    //       (parseInt(daysDifference) === -4 &&
    //         element.platformPaymentStatus === "pending")
    //     ) {
    //       payemntForBooking.push(element);
    //       platformPaymentStatus = "failed";
    //     }
    //   }
    //   if (payemntForBooking.length > 0) {
    //     for (let j = 0; j < payemntForBooking.length; j++) {
    //       const element = payemntForBooking[j];
    //       // console.log("payemntForBooking", element.id, platformPaymentStatus);
    //       const cardId = await HotelBookingLog.findOne({
    //         where: { groupId: element.bookingGroupId },
    //       });
    //       const userData = await User.findOne({
    //         where: { id: element.userId },
    //       });
    //       const fullName = `${userData.firstName} ${userData.lastName}`;
    //       const hotelData = await Hotel.findOne({
    //         attributes: ["hotelName"],
    //         where: { hotelCode: element.hotelCode },
    //       });
    //       if (config.app.environment !== "development") {
    //         amount = element.totalPrice;
    //       }
    //       const convertedCurrency = await requestHandler.convertCurrency(
    //         amount,
    //         element.currency
    //       );
    //       if (
    //         convertedCurrency &&
    //         convertedCurrency.convertedAmount &&
    //         convertedCurrency.convertedAmount.length > 0
    //       ) {
    //         amount = convertedCurrency.convertedAmount[0];
    //         const _requestTransaction = {
    //           userId: element.userId,
    //           paymentFor: "hotel",
    //           paymentType: "direct",
    //           description: `Booking Id-${element.id}`,
    //           amount: amount,
    //           currency: "AUD",
    //           cardId: cardId.cardId,
    //           card: {},
    //           isAdded: false,
    //           reason: "",
    //         };
    //         console.log(_requestTransaction);
    //         const transactionData = await requestHandler.sendForPay(
    //           _requestTransaction
    //         );
    //         if (
    //           transactionData &&
    //           transactionData.data &&
    //           transactionData.data.id
    //         ) {
    //           // update bookingLog;
    //           await HotelBookingLog.create({
    //             userId: element.userId,
    //             groupId: element.bookingGroupId,
    //             bookingId: element.id,
    //             cardId: cardId.cardId,
    //             transactionId: transactionData.data.id,
    //             paymentStatus: "paid",
    //           });
    //           await HotelBooking.update(
    //             { platformPaymentStatus: "paid" },
    //             { where: { id: element.id } }
    //           );
    //           await HotelBidding.update(
    //             { status: "cancelled" },
    //             {
    //               where: {
    //                 groupId: element.bookingGroupId,
    //               },
    //             }
    //           );
    //           try {
    //             await requestHandler.sendEmail(
    //               userData.email,
    //               "hotelPaymentSuccuess",
    //               `TrippyBid Payment Successful: ${element.bookingReference}`,
    //               {
    //                 name: fullName,
    //                 booking_id: element.bookingReference,
    //                 total_price: amount,
    //                 currency: "AUD",
    //                 hotel_name: hotelData.hotelName,
    //               }
    //             );
    //           } catch (err) {}
    //         }
    //       } else {
    //         await HotelBookingLog.create({
    //           userId: element.userId,
    //           groupId: element.bookingGroupId,
    //           bookingId: element.id,
    //           cardId: cardId.cardId,
    //           paymentStatus: "payment-failed",
    //         });
    //         await HotelBooking.update(
    //           { platformPaymentStatus: platformPaymentStatus },
    //           { where: { id: element.id } }
    //         );
    //         try {
    //           const cancellation_policy = JSON.parse(
    //             element.cancellationPolicy
    //           );
    //           let cancelDate = cancellation_policy?.cancel_by_date
    //             ? cancellation_policy.cancel_by_date
    //             : element.cancelByDate;
    //           await requestHandler.sendEmail(
    //             userData.email,
    //             "hotelPaymentFailed",
    //             `ACTION REQUIRED! Your payment was unsuccessful!`,
    //             {
    //               name: fullName,
    //               booking_id: element.bookingReference,
    //               hotel_name: hotelData.hotelName,
    //               cancellation_date:
    //                 utility.convertDateFromTimezone(cancelDate),
    //               group_id: element.bookingGroupId,
    //               reason: `Failed reason:- ${transactionData?.message}`,
    //             }
    //           );
    //         } catch (err) {}
    //       }
    //     }
    //     return true;
    //   } else {
    //     return true;
    //   }
    // } catch (error) {
    //   throw Error(error);
    // }
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
          async (x) => await this.fetchLatestPriceFromSearchToSchedulet(x)
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

  async fetchLatestPriceFromSearchToSchedulet(bookingGroupData) {
    const groupObjectData = bookingGroupData;
    let result = [];
    const hotelData = [];

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
        const roomType = roomTypes.map((m) => {
          return { roomType: m.roomType, expairationAt: m.expairationAt };
        });
        const uniqueRoomType = [];
        for (let roomNumber = 0; roomNumber < roomType.length; roomNumber++) {
          const elementRooms = roomType[roomNumber];
          if (uniqueRoomType.length === 0) {
            uniqueRoomType.push(elementRooms);
          } else {
            const checkFilter = uniqueRoomType.filter(
              (u) =>
                u.roomType === elementRooms.roomType &&
                utility.convertDateFormat(u.expairationAt) ===
                  utility.convertDateFormat(elementRooms.expairationAt)
            );
            if (checkFilter.length === 0) {
              uniqueRoomType.push(elementRooms);
            }
          }
        }
        return { hotelCode: y, roomType: uniqueRoomType };
      });
      hotelData.push({
        id: x.id,
        commission: x.userData.commission,
        commissionValue: x.userData.commissionValue,
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
    return await this.checkBookingForBiddingSchedule(
      bookingGroupData,
      result,
      hotelData
    );
  },

  async checkBookingForBiddingSchedule(
    bookingGroupData,
    searchResult,
    filterHotelData
  ) {
    try {
      // Fixed content variable
      const groupObjectData = bookingGroupData;
      const result = searchResult;
      const hotelData = filterHotelData;
      // assigned variable
      let RevalidateResult = [],
        filterRevalidate = [],
        finalForRevalidate = [],
        bookingResult = [],
        cancelledBooking = [],
        sendForRevalidate = [],
        commission = 0,
        commissionAmount = 0,
        totalPrice = 0,
        updateLatestPrice = [],
        cancellationBid = [],
        isPendingBidding = false;
      if (result?.length > 0 && result[0]?.data?.hotels) {
        // get the commission interest
        const currentDatatime = new Date();
        const comissionPercent = await Setting.findOne({
          where: { key: config.app.GRNPercentageKey },
        });
        const BiddingCharges = await Setting.findOne({
          where: { key: config.app.BidCharges },
        });

        for (let i = 0; i < hotelData.length; i++) {
          const elementi = hotelData[i]; // hotel data array
          const newResponse = result[i]?.data?.hotels;
          elementi.newRates = [];
          for (let j = 0; j < elementi.rooms.length; j++) {
            const elementj = elementi.rooms[j]; // hote data rooms array
            const filterHotel = newResponse.filter(
              (h) => h.hotel_code === elementj.hotelCode
            );
            for (let k = 0; k < elementj.roomType.length; k++) {
              const elementk = elementj.roomType[k];
              const newRates = filterHotel[0]?.rates.filter((r) => {
                if (
                  r.non_refundable === false &&
                  r.cancellation_policy &&
                  r.cancellation_policy?.under_cancellation === false &&
                  `${r.rooms[0].room_type}, ${r.boarding_details}` ==
                    elementk.roomType
                ) {
                  // check the days diffrence of the resopnse if it lower
                  const daysDifference = utility.dateDifference(
                    r.cancellation_policy.cancel_by_date,
                    currentDatatime,
                    "days"
                  );
                  // we need 8 day for any king of bidding match
                  if (daysDifference <= -2) {
                    return r;
                  }
                }
              });
              if (newRates?.length > 0) {
                // add the commission on price
                if (elementi.commission === "relevant") {
                  commission =
                    parseFloat(comissionPercent.value) +
                    parseFloat(BiddingCharges.value);
                  commissionAmount =
                    (parseFloat(newRates[0].price) * commission) / 100;
                  totalPrice = parseFloat(newRates[0].price) + commissionAmount;
                } else if (elementi.commission === "irrelevant") {
                  commission = elementi?.commissionValue
                    ? parseFloat(elementi.commissionValue)
                    : 0;
                  commission = commission + parseFloat(BiddingCharges.value);
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
                  // console.log("if",elementj.totalPrice,elementf.minBid,elementf.maxBid,elementf.id);
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
                    status: "true",
                  });
                } else {
                  updateLatestPrice.push({
                    biddingId: elementf.id,
                    userId: elementf.userId,
                    latestPrice: elementj.totalPrice,
                    status: "false",
                  });
                }
              }
            }
          }
        }
        // Update Latest Prices Hotel
        console.log(updateLatestPrice);
        const updateLatestPricesHotelPromise = updateLatestPrice.map((x) =>
          biddingRepository.updatelatestPriceThroghScheduler(x)
        );
        // Need to check the same room bid lowest price with priority
        sendForRevalidate = sendForRevalidate.sort(
          (a, b) => a.bid.priority - b.bid.priority
        );

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
                console.log(
                  filterRevalidate[0].maxBidAmount,
                  elementfr.maxBidAmount,
                  filterRevalidate[0].maxBidAmount > elementfr.maxBidAmount
                );
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
            if (x.data.hotel?.rate.rate_type === "bookable") {
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
              title: "Mr.",
              name: userData.firstName,
              surname: userData.lastName,
              email: userData.email,
              phone_number: `${userData.phoneNumberCountryCode}${userData.phoneNumber}`,
              client_nationality: userData.UserPersonalInformation.nationality,
            };
            /*
             * if the booking can be able to for the current rate
             */
            //  setting up the booking data
            if (JSON.parse(bookingDetails.paxes)) {
              const bookingItems = JSON.parse(bookingDetails.paxes);
              for (
                let RoomItem = 0;
                RoomItem < bookingItems.length;
                RoomItem++
              ) {
                const elementItem = bookingItems[RoomItem];
                elementItem.room_code = revalidateHotelData?.rate?.room_code;
                elementItem.rate_key = revalidateHotelData?.rate?.rate_key;
                for (let pax = 0; pax < elementItem.rooms.length; pax++) {
                  const elementPax = elementItem.rooms[pax];
                  elementPax.room_reference =
                    revalidateHotelData?.rate?.rooms[pax]?.room_reference;
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
            }
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
              const bookingDataObject = bookingGroupObject.booking;
              const biddingData = requestData.bid;
              const previousHotelData = await Hotel.findOne({
                attributes: ["hotelName", "address"],
                where: { hotelCode: bookingDataObject.hotelCode },
              });
              bookingGroupObject.previousHotelData = previousHotelData;
              if (
                _response !== undefined &&
                (_response?.data?.status == "pending" ||
                  _response?.data?.status == "confirmed")
              ) {
                let nonRefundable = null,
                  underCancellation = null,
                  cancelByDate = null,
                  expirationDate = null,
                  cancellationPolicy = null;
                if (
                  _response?.data?.hotel?.booking_items &&
                  _response?.data?.hotel?.booking_items?.length > 0 &&
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
                      const cancelDate =
                        _response.data.hotel.booking_items[0]
                          ?.cancellation_policy?.cancel_by_date;
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
                // Add final amount n revalidate response
                revalidateData.serviceChages = newRateData.commissionAmount;
                revalidateData.finalAmount = newRateData.totalPrice;
                revalidateData.hotel.rate.cancellation_policy.cancel_by_date =
                  cancelByDate;
                const daysDifference = utility.dateDifference(
                  cancelByDate,
                  bookingDataObject.cancelByDate,
                  "days"
                );
                let platformStatus = "pending";
                if (daysDifference <= 0) {
                  platformStatus = "confirmed";
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
                  platformPaymentStatus:
                    bookingDataObject?.platformPaymentStatus,
                  platformStatus: platformStatus,
                  nonRefundable: nonRefundable,
                  underCancellation: underCancellation,
                  cancelByDate: cancelByDate,
                  expairationAt: expirationDate,
                  cancellationPolicy: cancellationPolicy,
                  searchId: _response?.data?.search_id,
                  reavalidateResponse: JSON.stringify(revalidateData),
                  biddingId: biddingData.id,
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

                  try {
                    const sendmail_confirm = requestHandler.sendEmail(
                      userData.email,
                      "bidSuccess",
                      `Success! TrippyBid Secured Your Reservation at Your Bid Price! Booking Id- ${_response?.data?.booking_reference}`,
                      {
                        name: `${userData.firstName} ${userData.lastName}`,
                        email: userData.email,
                        hotel_name: revalidateHotelData.name,
                        full_address: revalidateHotelData.address,
                        previous_hotel_name: previousHotelData?.hotelName,
                        previous_full_address: previousHotelData?.address,
                        image_url: revalidateHotelData.images.url,
                        check_in: bookingGroupObject.checkIn,
                        check_out: bookingGroupObject.checkOut,
                        room_type: newRateData.roomType,
                        total_members: bookingGroupObject.totalMember,
                        cancellation_date: cancelByDate,
                        total_price: newRateData.totalPrice,
                        booking_id: _response?.data?.booking_reference,
                        booking_date: utility.convertDateFromTimezone(
                          null,
                          null,
                          "YYYY-MM-DD"
                        ),
                        service_tax: newRateData.commissionAmount,
                        total_rooms: bookingGroupObject.totalRooms,
                        supplier_price: _response?.data?.price?.breakdown
                          ?.net[1]
                          ? _response?.data?.price?.breakdown?.net[1]?.amount
                          : 0,
                        vat: _response?.data?.price?.breakdown?.net[0]
                          ? _response?.data?.price?.breakdown?.net[0]?.amount
                          : 0,
                        currency: userData.UserPersonalInformation.currencyCode,
                      }
                    );
                  } catch (err) {}

                  if (daysDifference <= 0) {
                    HotelBookingGroup.update(
                      {
                        bookingId: booking.id,
                        currentReference: _response?.data?.booking_reference,
                        bookingDate: _response?.data?.booking_date
                          ? _response?.data?.booking_date
                          : utility.convertDateFromTimezone(currentDatatime),
                        price: newRateData.totalPrice,
                        status: _response?.data?.status
                          ? _response?.data?.status
                          : "failed",
                      },
                      { where: { id: bookingGroupObject.id } }
                    );
                    const getAllbookigs = await HotelBooking.findAll({
                      where: {
                        bookingGroupId: bookingGroupObject.id,
                        status: "confirmed",
                        platformStatus: "pending",
                      },
                    });
                    if (getAllbookigs.length > 0) {
                      console.log("getAllbookigs", getAllbookigs.length);
                      const updateDataAndMailPromiseforCancelledBooking =
                        getAllbookigs?.map(async (x, i) => {
                          let transactionId = 0,
                            cardId = 0;
                          const bookingObjectData = x;
                          // bookingGroupObject?.previousHotelData;

                          console.log(
                            "bookingObjectData",
                            bookingObjectData.id
                          );

                          console.log("================================");
                          console.log(
                            "Booking Cancellation Confirm/pending Refund Intialize"
                          );
                          console.log("================================");
                          try {
                            const sendmail_cancel = requestHandler.sendEmail(
                              userData.email,
                              "hotelBookingCancelled",
                              `Reservation with ID: ${bookingObjectData.bookingReference} has been Cancelled`,
                              {
                                name: `${userData.firstName} ${userData.lastName}`,
                                email: userData.email,
                                hotel_name: previousHotelData?.hotelName,
                                full_address: previousHotelData?.address,
                                check_in: bookingGroupObject.checkIn,
                                check_out: bookingGroupObject.checkOut,
                                room_type: bookingObjectData.roomType,
                                total_members: bookingGroupObject.totalMember,
                                total_rooms: bookingGroupObject.totalRooms,
                                cancellation_date:
                                  utility.convertDateFromTimezone(
                                    currentDatatime
                                  ),
                                booking_id: bookingGroupObject.currentReference,
                                booking_date: utility.convertDateFromTimezone(
                                  bookingGroupObject.createdAt
                                ),
                                total_price: bookingObjectData.totalPrice,
                                currency: bookingGroupObject.currency,
                              }
                            );
                          } catch (err) {}
                          HotelBooking.update(
                            {
                              platformStatus: "cancelled",
                              platformcancelledDate:
                                utility.convertDateFromTimezone(
                                  currentDatatime
                                ),
                            },
                            { where: { id: bookingObjectData.id } }
                          );
                          //  update logs
                          const bookingLog = await HotelBookingLog.findAll({
                            where: {
                              groupId: bookingGroupObject.id,
                              bookingId: bookingObjectData.id,
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
                          // console.log(logRequest);
                          HotelBookingLog.create({
                            ...logRequest,
                            bookingId: bookingObjectData.id,
                            paymentStatus: "cancelled",
                          });

                          return true;
                        });
                      try {
                        await Promise.all(
                          updateDataAndMailPromiseforCancelledBooking
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    }
                    return bookingGroupObject.currentReference;
                  } else {
                    isPendingBidding = true;
                    let transactionId = 0,
                      cardId = 0;
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
                    // console.log(logRequest);
                    HotelBookingLog.create({
                      ...logRequest,
                      bookingId: requestData.newBookingId,
                      paymentStatus: "booked",
                    });
                    return [];
                  }
                }
              }
            }
          );
          try {
            cancelledBooking = await Promise.all(saveAndCancelBookingPromise);
          } catch (err) {
            console.log(err);
          }
          console.log(isPendingBidding, cancelledBooking);

          if (isPendingBidding === false) {
            const updateDataAndMailPromise = cancelledBooking?.map(
              async (x, i) => {
                let transactionId = 0,
                  cardId = 0;
                const requestData = finalForRevalidate[i];
                const newRateData = requestData.newRates;
                const bookingGroupObject = requestData.groupObjectData;
                const userData = bookingGroupObject.userData;
                const previousHotelData = bookingGroupObject.previousHotelData;

                console.log("================================");
                console.log(
                  "Booking Cancellation Confirm/pending Refund Intialize"
                );
                console.log("================================");
                try {
                  const sendmail_cancel = requestHandler.sendEmail(
                    userData.email,
                    "hotelBookingCancelled",
                    `Reservation with ID: ${bookingGroupObject.currentReference} has been Cancelled`,
                    {
                      name: `${userData.firstName} ${userData.lastName}`,
                      email: userData.email,
                      hotel_name: previousHotelData?.hotelName,
                      full_address: previousHotelData?.address,
                      check_in: bookingGroupObject.checkIn,
                      check_out: bookingGroupObject.checkOut,
                      room_type: newRateData.roomType,
                      total_members: bookingGroupObject.totalMember,
                      total_rooms: bookingGroupObject.totalRooms,
                      cancellation_date:
                        utility.convertDateFromTimezone(currentDatatime),
                      booking_id: bookingGroupObject.currentReference,
                      booking_date: utility.convertDateFromTimezone(
                        bookingGroupObject.createdAt
                      ),
                      total_price: bookingGroupObject.price,
                      currency: bookingGroupObject.currency,
                    }
                  );
                } catch (err) {}
                HotelBooking.update(
                  {
                    platformStatus: "cancelled",
                    platformcancelledDate:
                      utility.convertDateFromTimezone(currentDatatime),
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
                // console.log(logRequest);
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
                return true;
              }
            );
            try {
              await Promise.all(updateDataAndMailPromise);
            } catch (err) {
              console.log(err);
            }
          }
          // update the complete biddings
          const updateBiddingsConfimed = bookingResult.map((x, i) => {
            const _response = x;
            const requestData = finalForRevalidate[i];
            const biddingData = requestData.bid;
            const newRateData = requestData.newRates;
            const bookingGroupObject = requestData.groupObjectData;
            if (
              _response !== undefined &&
              (_response?.data?.status == "pending" ||
                _response?.data?.status == "confirmed")
            ) {
              // // console.log(newRateData.totalPrice);
              // HotelBidding.update(
              //   { expairationAt: requestData.newExpairationDate },
              //   {
              //     where: {
              //       // id: { [Op.ne]: biddingData.id },
              //       groupId: requestData.id,
              //     },
              //   }
              // );
              HotelBidding.update(
                {
                  status: "completed",
                  priority: 999998,
                  latestPrice: newRateData.totalPrice,
                  bookingId: requestData.newBookingId,
                },
                { where: { id: biddingData.id } }
              );
              // Update less priority status
              let lessPriorityStatusData = {};
              if (isPendingBidding === true) {
                lessPriorityStatusData = {
                  status: "pending",
                };
              } else {
                lessPriorityStatusData = {
                  status: "cancelled",
                  priority: 999999,
                };
              }
              HotelBidding.update(lessPriorityStatusData, {
                where: {
                  groupId: bookingGroupObject.id,
                  bookingId: null,
                  id: { [Op.ne]: biddingData.id },
                  [Op.and]: [
                    { priority: { [Op.gt]: biddingData.priority } },
                    { priority: { [Op.lt]: 999990 } },
                  ],
                },
              });
            } else {
              // if Booking is not done than remove all bidding for cancellation
              // const all_cancelled = cancellationBid;
              // cancellationBid = [];
            }
            return true;
          });

          try {
            await Promise.all(updateBiddingsConfimed);
            // cancelled all same hotel bid
            // if (cancellationBid.length > 0) {
            //   const updateCancellationBiddings = cancellationBid.map(
            //     (x) => x.id
            //   );
            //   await HotelBidding.update(
            //     { status: "cancelled", priority: 999999 },
            //     { where: { id: updateCancellationBiddings } }
            //   );
            // }
          } catch (err) {
            console.log(err);
          }
          //   //........
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
      const userData = Bidding.userData;
      const currentDatatime = new Date();
      //  searching the latest price
      const request = {};
      let filterRateData = [],
        reavalidateResponse = {},
        _response = {},
        filteredRate = {};
      request.body = JSON.parse(Bidding.bookingGroupData.searchPayload);
      request.body.hotelCode = [Bidding.hotelCode];
      const search_respose = await grnRepository.search(request);
      if (search_respose?.data?.hotels?.length > 0) {
        const rateData = search_respose?.data?.hotels[0]?.rates;
        filterRateData = rateData.filter((x) => {
          if (
            `${x.rooms[0].room_type}, ${x.boarding_details}` ===
              Bidding.roomType &&
            x.non_refundable == false
          ) {
            // check the days diffrence of the resopnse if it lower
            const daysDifference = utility.dateDifference(
              x.cancellation_policy.cancel_by_date,
              currentDatatime,
              "days"
            );
            // we need 8 day for any king of bidding match
            if (daysDifference <= -2) {
              return x;
            }
          }
        });
      }
      console.log("filterRateData =", filterRateData.length);
      //  check the filter room is vailibale or not
      if (filterRateData.length > 0) {
        if (filterRateData.length > 1) {
          filterRateData.sort((a, b) => a.price - b.price);
        }
        // get user commission
        filteredRate = filterRateData[0];
        const revalidate_request = {};
        let commission = 0,
          commissionAmount = 0,
          totalPrice = 0;

        // console.log(commissionAmount, totalPrice);

        revalidate_request.body = {
          searchId: search_respose.data.search_id,
          groupCode: filteredRate.group_code,
          rateKey: filteredRate.rate_key,
        };

        // console.log(revalidate_request);

        revalidate_request.user = userData;
        reavalidateResponse = await grnRepository.revalidate(
          revalidate_request
        );
        if (reavalidateResponse?.data?.hotel?.rate?.rate_type === "bookable") {
          let nonRefundable = null,
            underCancellation = null,
            cancelByDate = null,
            expirationDate = null,
            cancellationPolicy = null,
            cardId = null,
            transactionId = null;
          // check for the booking or update the rate
          totalPrice = parseFloat(reavalidateResponse.data.hotel.rate?.price);
          const BiddingCharges = await Setting.findOne({
            where: { key: config.app.BidCharges },
          });
          if (userData.commission === "relevant") {
            const comissionPercent = await Setting.findOne({
              where: { key: config.app.GRNPercentageKey },
            });
            commission =
              parseFloat(comissionPercent.value) +
              parseFloat(BiddingCharges.value);
            commissionAmount = (totalPrice * commission) / 100;
            totalPrice = totalPrice + commissionAmount;
          } else if (userData.commission === "irrelevant") {
            commission = userData?.commissionValue
              ? parseFloat(userData.commissionValue)
              : 0;
            commission = commission + parseFloat(BiddingCharges.value);
            commissionAmount = (totalPrice * commission) / 100;
            totalPrice = totalPrice + commissionAmount;
          }
          console.log(commission, commissionAmount, totalPrice);
          // //  create booking for this bidding holer
          const holder = {
            title: "Mr.",
            name: userData.firstName,
            surname: userData.lastName,
            email: userData.email,
            phone_number: `${userData.phoneNumberCountryCode}${userData.phoneNumber}`,
            client_nationality: userData.UserPersonalInformation.nationality,
          };
          //  set the members for the new booking
          const bookingDetails = await HotelBookingDetail.findOne({
            attributes: ["paxes"],
            where: { bookingGroupId: Bidding.groupId },
          });

          if (JSON.parse(bookingDetails.paxes)) {
            const bookingItems = JSON.parse(bookingDetails.paxes);
            for (let RoomItem = 0; RoomItem < bookingItems.length; RoomItem++) {
              const elementItem = bookingItems[RoomItem];
              elementItem.room_code =
                reavalidateResponse.data?.hotel?.rate?.room_code;
              elementItem.rate_key =
                reavalidateResponse.data?.hotel?.rate?.rate_key;
              for (let pax = 0; pax < elementItem.rooms.length; pax++) {
                const elementPax = elementItem.rooms[pax];
                elementPax.room_reference =
                  reavalidateResponse.data.hotel.rate.rooms[
                    pax
                  ]?.room_reference;
              }
            }

            console.log(
              "=================== start booking ===================="
            );
            // Request Data
            const booking_request_data = {
              search_id: reavalidateResponse.data.search_id,
              hotel_code: Bidding.hotelCode,
              city_code: reavalidateResponse.data.hotel.city_code,
              group_code: reavalidateResponse.data.hotel.rate.group_code,
              checkout: Bidding.checkOut,
              checkin: Bidding.checkIn,
              booking_name: `${Bidding.bookingGroupData.bookingName}-Bid-${Bidding.id}`,
              booking_comments: Bidding.bookingGroupData.bookingComments,
              booking_items: bookingItems,
              payment_type: "AT_WEB",
              agent_reference: "",
              cutoff_time: 120000,
              holder: holder,
            };
            // console.log(booking_request_data);
            _response = await requestHandler.fetchResponseFromHotel(
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
              if (
                _response?.data?.hotel?.booking_items &&
                _response?.data?.hotel?.booking_items?.length > 0 &&
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
              //  update revalidate response with final amount
              reavalidateResponse.data.serviceChages = commissionAmount;
              reavalidateResponse.data.finalAmount = totalPrice;
              reavalidateResponse.data.hotel.rate.cancellation_policy.cancel_by_date =
                cancelByDate;
              let bookingData = {
                userId: userData.id,
                bookingGroupId: Bidding.groupId,
                hotelCode: booking_request_data.hotel_code,
                cityCode: booking_request_data.city_code,
                checkIn: booking_request_data.checkin,
                checkOut: booking_request_data.checkout,
                currency: request.body.currency,
                commission: commission,
                commissionAmount: commissionAmount,
                totalPrice: totalPrice,
                roomType: Bidding.roomType,
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
                platformPaymentStatus: "pending",
                platformStatus: "confirmed",
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
                  { where: { id: Bidding.groupId } }
                );
                // send the mail of success fully booked from the bidding
                try {
                  const sendmail_confirm = requestHandler.sendEmail(
                    userData.email,
                    "hotelBooking",
                    `Your Reservation has been Confirmed - Booking ID: ${_response?.data?.booking_reference}`,
                    {
                      name: `${userData.firstName} ${userData.lastName}`,
                      email: userData.email,
                      hotel_name: reavalidateResponse.data.hotel.name,
                      full_address: reavalidateResponse.data.hotel.address,
                      image_url: reavalidateResponse.data.hotel.images.url,
                      check_in: booking_request_data.checkin,
                      check_out: booking_request_data.checkout,
                      room_type: Bidding.roomType,
                      total_members: Bidding.bookingGroupData.totalMember,
                      cancellation_date: cancelByDate,
                      total_price: totalPrice,
                      booking_id: _response?.data?.booking_reference,
                      booking_date: utility.convertDateFromTimezone(
                        null,
                        null,
                        "YYYY-MM-DD"
                      ),
                      service_tax: commissionAmount,
                      total_rooms: Bidding.bookingGroupData.totalRooms,
                      supplier_price: _response?.data?.price?.breakdown?.net[1]
                        ? _response?.data?.price?.breakdown?.net[1]?.amount
                        : 0,
                      vat: _response?.data?.price?.breakdown?.net[0]
                        ? _response?.data?.price?.breakdown?.net[0]?.amount
                        : 0,
                      currency: request.body.currency,
                    }
                  );
                } catch (err) {
                  console.log(err);
                }
                //   // Update the booking for cancel
                const apiEndPoint = GRN_Apis.bookingCancel(
                  Bidding.bookingGroupData.currentReference
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
                  console.log("cancel status", _response_cancel.data.status);
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
                        `Reservation with ID: ${Bidding.bookingGroupData.currentReference} has been Cancelled`,
                        {
                          name: `${userData.firstName} ${userData.lastName}`,
                          email: userData.email,
                          check_in: booking_request_data.checkin,
                          check_out: booking_request_data.checkout,
                          room_type: Bidding.roomType,
                          total_members: Bidding.bookingGroupData.totalMember,
                          total_rooms: Bidding.bookingGroupData.totalRooms,
                          cancellation_date: utility.convertDateFromTimezone(
                            _response_cancel?.data?.cancel_date
                          ),
                          booking_id: Bidding.currentReference,
                          booking_date: utility.convertDateFromTimezone(
                            Bidding.createdAt
                          ),
                        }
                      );
                    } catch (err) {}

                    //  update the old booking cancelled
                    await HotelBooking.update(
                      {
                        status: "cancelled",
                        cancelledDate: _response_cancel?.data?.cancel_date,
                        refundAmout: parseFloat(
                          parseFloat(
                            _response_cancel?.data?.booking_price?.amount
                          ) -
                            parseFloat(
                              _response_cancel.data?.cancellation_charges
                                ?.amount
                            )
                        ).toFixed(2),
                        cancellationCharge: parseFloat(
                          _response_cancel.data?.cancellation_charges?.amount
                        ).toFixed(2),
                      },
                      { where: { id: Bidding.bookingGroupData.bookingId } }
                    );
                    // update cancel log
                    const bookingLog = await HotelBookingLog.findAll({
                      where: {
                        groupId: Bidding.groupId,
                        bookingId: Bidding.bookingGroupData.bookingId,
                      },
                    });
                    // console.log(
                    //   bookingLog,
                    //   Bidding.groupId,
                    //   Bidding.bookingGroupData.bookingId
                    // );
                    for (let i = 0; i < bookingLog.length; i++) {
                      const element1 = bookingLog[i];
                      cardId = element1.cardId;
                      if (element1.transactionId > 0) {
                        transactionId = element1.transactionId;
                      }
                    }

                    const logRequest = {
                      userId: userData.id,
                      groupId: Bidding.groupId,
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
                        bookingId: Bidding.bookingGroupData.bookingId,
                        paymentStatus: "cancelled",
                      },
                      {
                        ...logRequest,
                        bookingId: booking.id,
                        paymentStatus: "booked",
                      },
                    ]);
                    //  update the booking complete
                    await HotelBidding.update(
                      {
                        status: "completed",
                        latestPrice: totalPrice,
                        priority: 999998,
                        bookingId: booking.id,
                      },
                      { where: { id: Bidding.id } }
                    );
                    await HotelBidding.update(
                      { status: "cancelled", priority: 999999 },
                      {
                        where: {
                          groupId: Bidding.groupId,
                          bookingId: null,
                          id: { [Op.ne]: Bidding.id },
                          [Op.and]: [
                            { priority: { [Op.gt]: Bidding.priority } },
                            { priority: { [Op.lt]: 999990 } },
                          ],
                        },
                      }
                    );
                    // update the latest price in graph
                    const priceData = {
                      userId: userData.id,
                      biddingId: Bidding.id,
                      latestPrice: totalPrice,
                    };
                    biddingRepository.updatelatestPriceThroghScheduler(
                      priceData
                    );

                    const getAllbookigs = await HotelBooking.findAll({
                      where: {
                        bookingGroupId: Bidding.groupId,
                        status: "confirmed",
                        platformStatus: "pending",
                      },
                    });
                    if (getAllbookigs.length > 0) {
                      let cancelledBookingFromBidding = [];
                      const cancelAllBooking = getAllbookigs.map(async (x) => {
                        const apiEndPointCancel = GRN_Apis.bookingCancel(
                          x.bookingReference
                        );
                        return await requestHandler.fetchResponseFromHotel(
                          apiEndPointCancel,
                          GRNtoken,
                          { cutoff_time: 60000 }
                        );
                      });
                      try {
                        cancelledBookingFromBidding = await Promise.all(
                          cancelAllBooking
                        );
                      } catch (err) {
                        console.log(err);
                      }
                      const updateDataAndMailPromiseforCancelledBooking =
                        cancelledBookingFromBidding?.map(async (x, i) => {
                          let transactionId = 0,
                            cardId = 0;
                          const _response_cancel = x;
                          const bookingObjectData = getAllbookigs[i];
                          const bookingGroupObject = Bidding.bookingGroupData;
                          const userData = Bidding.userData;
                          const previousHotelData = null;
                          if (_response_cancel !== undefined) {
                            console.log("================================");
                            console.log(
                              "cancel status",
                              _response_cancel.data.status
                            );
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
                                const sendmail_cancel =
                                  requestHandler.sendEmail(
                                    userData.email,
                                    "hotelBookingCancelled",
                                    `Reservation with ID: ${bookingObjectData.bookingReference} has been Cancelled`,
                                    {
                                      name: `${userData.firstName} ${userData.lastName}`,
                                      email: userData.email,
                                      hotel_name: previousHotelData?.hotelName,
                                      full_address: previousHotelData?.address,
                                      check_in: bookingGroupObject.checkIn,
                                      check_out: bookingGroupObject.checkOut,
                                      room_type: bookingObjectData.roomType,
                                      total_members:
                                        bookingGroupObject.totalMember,
                                      total_rooms:
                                        bookingGroupObject.totalRooms,
                                      cancellation_date:
                                        utility.convertDateFromTimezone(
                                          _response_cancel?.data?.cancel_date
                                        ),
                                      booking_id:
                                        bookingGroupObject.currentReference,
                                      booking_date:
                                        utility.convertDateFromTimezone(
                                          bookingGroupObject.createdAt
                                        ),
                                      total_price: bookingObjectData.totalPrice,
                                      currency: bookingGroupObject.currency,
                                    }
                                  );
                              } catch (err) {}
                              HotelBooking.update(
                                {
                                  status: "cancelled",
                                  cancelledDate:
                                    _response_cancel?.data?.cancel_date,
                                  refundAmout: parseFloat(
                                    parseFloat(
                                      _response_cancel?.data?.booking_price
                                        ?.amount
                                    ) -
                                      parseFloat(
                                        _response_cancel.data
                                          ?.cancellation_charges?.amount
                                      )
                                  ).toFixed(2),
                                  cancellationCharge: parseFloat(
                                    _response_cancel.data?.cancellation_charges
                                      ?.amount
                                  ).toFixed(2),
                                },
                                { where: { id: bookingObjectData.id } }
                              );
                              //  update logs
                              const bookingLog = await HotelBookingLog.findAll({
                                where: {
                                  groupId: bookingGroupObject.id,
                                  bookingId: bookingObjectData.id,
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
                              // console.log(logRequest);
                              HotelBookingLog.create({
                                ...logRequest,
                                bookingId: bookingObjectData.id,
                                paymentStatus: "cancelled",
                              });
                            }
                            return true;
                          }
                        });
                      try {
                        await Promise.all(
                          updateDataAndMailPromiseforCancelledBooking
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }
                }
              }
            }
          }
        }

        // --
        // --
        // --
      }

      return {
        ..._response,
        // BookingResponse: _response,
        // reavalidateResponse,
        // filteredRate,
        // search_respose,
        // Bidding,
      };
    } catch (error) {
      throw Error(error);
    }
  },
};
