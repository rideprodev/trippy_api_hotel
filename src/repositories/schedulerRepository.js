import models from "../models";
import utility from "../services/utility";
import requestHandler from "../services/requestHandler";
import config from "../config";
import grnRepository from "./grnRepository";
import biddingRepository from "./biddingRepository";
import userRepository from "./userRepository";
import bookingRepository from "./bookingRepository";
import GRN_Apis from "../config/GRN_Apis";
const {
  User,
  HotelBooking,
  HotelBookingLog,
  HotelBidding,
  Setting,
  HotelBookingDetail,
  UserMember,
  HotelBookingGroup,
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
   * Auto payment scheduler
   * @param {Object}
   */
  async autoBooking() {
    // try {
    const Bidding = await biddingRepository.getAllBiddingForScduler();
    //  check for expairation
    const currentDate = new Date();
    const unExpiredBidding = [];
    for (let i = 0; i < Bidding.length; i++) {
      const x = Bidding[i].dataValues;
      if (x.expairationAt < currentDate) {
        await biddingRepository.updateBiddingStatus(null, "expired", x.id);
      } else {
        unExpiredBidding.push(x);
      }
    }
    console.log("unExpiredBidding=>", unExpiredBidding.length);

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
            reavalidateResponse.data.finalAmount = `${parseFloat(
              reavalidateResponse.data?.hotel?.rate?.price
            ).toFixed(2)}`;
          }
          // check for the booking
          if (
            reavalidateResponse.data.finalAmount > element.minBid &&
            reavalidateResponse.data.finalAmount < element.maxBid
          ) {
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
              client_nationality: userData.UserPersonalInformation.nationality,
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
            // save the new  booking=======
            if (
              _response !== undefined &&
              (_response?.data?.status == "pending" ||
                _response?.data?.status == "pending")
            ) {
              const currentDatatime = await utility.getCurrentDateTime();
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
                      _response.data.hotel.booking_items[0]?.cancellation_policy
                        ?.cancel_by_date;
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
                    price: _response?.data?.price?.total
                      ? _response?.data?.price?.total
                      : reavalidateResponse.data.hotel.rate.price,
                    status: _response?.data?.status
                      ? _response?.data?.status
                      : "failed",
                  },
                  { where: { id: element.groupId } }
                );
                // update the log
                // await HotelBookingLog.create({
                //   userId: userData.id,
                //   groupId: bookingGroup.id,
                //   bookingId: booking.id,
                //   transactionId: null,
                //   cardId: bodyData.cardId,
                //   paymentStatus: "booked",
                // });
                // send the mail of success fully booked from the bidding
                // try {
                //   const sendmail = requestHandler.sendEmail(
                //     userData.email,
                //     "hotelBooking",
                //     `Your Reservation has been Confirmed - Booking ID: ${bookingGroup.currentReference}`,
                //     {
                //       name: `${userData.firstName} ${userData.lastName}`,
                //       email: userData.email,
                //       hotel_name: bodyData.hotelName,
                //       full_address: bodyData.fullAddress,
                //       image_url: bodyData.imageUrl,
                //       check_in: bodyData.checkIn,
                //       check_out: bodyData.checkOut,
                //       room_type: bodyData.roomType,
                //       total_members: bodyData.totalMember,
                //       cancellation_date: cancelByDate,
                //       total_price: bodyData.totalPrice,
                //       booking_id: bookingGroup.currentReference,
                //       booking_date: new Date(),
                //       service_tax: revalidateResponse.serviceChages,
                //       total_rooms: bodyData.totalRooms,
                //       total_nights: bodyData.totalNight,
                //       price_distribution:
                //         revalidateResponse?.hotel?.rate?.price_details,
                //       currency: revalidateResponse?.hotel?.rate?.currency,
                //     }
                //   );
                // } catch (err) {}
                // Update the booking for cancel
                // await grnRepository.bookingCancel();
                // await HotelBooking.update(
                //   {
                //     status: "cancelled",
                //   },
                //   { where: { id: element.bookingGroupData.bookingId } }
                // );
                // update cancel log
                // await HotelBookingLog.create({
                //   userId: userData.id,
                //   groupId: bookingGroup.id,
                //   bookingId: booking.id,
                //   transactionId: null,
                //   cardId: bodyData.cardId,
                //   paymentStatus: "booked",
                // });
                //  cancellation mail
                // try {
                //   const sendmail = requestHandler.sendEmail(
                //     userData.email,
                //     "hotelBooking",
                //     `Your Reservation has been Confirmed - Booking ID: ${bookingGroup.currentReference}`,
                //     {
                //       name: `${userData.firstName} ${userData.lastName}`,
                //       email: userData.email,
                //       hotel_name: bodyData.hotelName,
                //       full_address: bodyData.fullAddress,
                //       image_url: bodyData.imageUrl,
                //       check_in: bodyData.checkIn,
                //       check_out: bodyData.checkOut,
                //       room_type: bodyData.roomType,
                //       total_members: bodyData.totalMember,
                //       cancellation_date: cancelByDate,
                //       total_price: bodyData.totalPrice,
                //       booking_id: bookingGroup.currentReference,
                //       booking_date: new Date(),
                //       service_tax: revalidateResponse.serviceChages,
                //       total_rooms: bodyData.totalRooms,
                //       total_nights: bodyData.totalNight,
                //       price_distribution:
                //         revalidateResponse?.hotel?.rate?.price_details,
                //       currency: revalidateResponse?.hotel?.rate?.currency,
                //     }
                //   );
                // } catch (err) {}
                // update bidding if the same room was bid but hight price from booking
                // await
              }
            }
            return {
              _response,
              element,
              userData,
            };
          }
        }
      }
    }
    // } catch (error) {
    //   throw Error(error);
    // }
  },
};
