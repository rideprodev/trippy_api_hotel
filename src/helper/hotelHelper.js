import repositories from "../repositories";
import requestHandler from "../services/requestHandler";
const { biddingRepository } = repositories;

export default {
  async checkBiddingNotification(req, data) {
    delete req.user;
    const bodyData = req.body;
    const where = {
      departure_from: `${bodyData.checkIn} 00:00:00`,
      departure_to: `${bodyData.checkOut} 00:00:00`,
      tripType: "Hotel",
      status: "active",
    };

    const Bidding = await biddingRepository.getAllBidding(where);
    if (Bidding.length > 0) {
      const hotels = [];
      for (let i = 0; i < bodyData.hotelCode.length; i++) {
        const e = bodyData.hotelCode[i];
        const filterHotel = Bidding.filter((x) => x.airlineHotelCode === e);
        if (filterHotel.length > 0) {
          hotels.push(filterHotel[0].dataValues);
        }
      }
      if (hotels.length > 0) {
        for (let index = 0; index < hotels.length; index++) {
          const element = hotels[index];
          const filterData = data.hotels.filter(
            (x) =>
              x.hotel_code === element.airlineHotelCode &&
              x.city_code === element.from
          );
          if (filterData.length > 0) {
            //  filter the room
            const roomFilter = filterData[0].rates.filter((y) => {
              for (let j = 0; j < y.rooms.length; j++) {
                const ele = y.rooms[j];
                // console.log(
                //   ele.room_reference,
                //   element.bookingClassReference,
                //   ele.room_reference === element.bookingClassReference
                // );
                if (ele.room_reference === element.sorceCode) {
                  return y;
                }
              }
            });

            if (roomFilter.length > 0) {
              const amountFilterData = roomFilter.filter(
                (x) => x.price > element.minBid && x.price < element.maxBid
              );
              if (amountFilterData.length > 0) {
                await requestHandler.SendToNotificationService(
                  element.userData.dataValues.email,
                  "notification",
                  "Hurrey! your bid is just hit"
                );

                //  Add the code for booking
                //
                //
              } else {
                console.log("Bid amount not found");
              }
            } else {
              console.log("Room reference not found");
            }
          } else {
            console.log("hotel is not found");
          }
        }
      } else {
        console.log("hotel is not matched");
      }
    } else {
      console.log("Not ant bidding find");
    }
  },
};
