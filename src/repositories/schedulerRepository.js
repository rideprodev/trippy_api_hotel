import moment from "moment";
import models from "../models";
import utility from "../services/utility";
import { Op } from "sequelize";
import requestHandler from "../services/requestHandler";
import config from "../config";
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
};
