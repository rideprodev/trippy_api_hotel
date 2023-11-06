import Joi from "joi";

const search = Joi.object({
  rooms: Joi.array()
    .items(
      Joi.object({
        adults: Joi.string().required(),
        children_ages: Joi.array().items(
          Joi.number().positive().greater(0).less(18)
        ),
      })
    )
    .required(),
  hotelCode: Joi.string().empty().allow(""),
  cityCode: Joi.string().required(),
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
  currency: Joi.string().empty().allow(""),
  client_nationality: Joi.string().required(),
  rate_key: Joi.optional(),
});

const revalidate = Joi.object({
  search_id: Joi.string().required(),
  group_code: Joi.string().required(),
  rate_key: Joi.string().required(),
});

const booking = Joi.object({
  search_id: Joi.string().required(),
  isBundle: Joi.string().valid("true", "false").required(),
  isUserTravelled: Joi.string().valid("true", "false").required(),
  hotel_code: Joi.string().required(),
  city_code: Joi.string().required(),
  group_code: Joi.string().required(),
  checkin: Joi.string().required(),
  checkout: Joi.string().required(),
  booking_comments: Joi.string().required(),
  totalMember: Joi.string().required(),
  booking_items: Joi.array()
    .items(
      Joi.object({
        room_code: Joi.string().required(),
        rate_key: Joi.string().required(),
        room_reference: Joi.string().when("isBundle", {
          is: "false",
          then: Joi.string().required(),
          otherwise: Joi.string().optional().allow(""),
        }),
        rooms: Joi.array().items(
          Joi.object({
            no_of_infants: Joi.number()
              .positive()
              .greater(0)
              .less(3)
              .optional()
              .allow(null),
            room_reference: Joi.string().when("isBundle", {
              is: "true",
              then: Joi.string().optional().allow(""),
              otherwise: Joi.string().optional().allow(""),
            }),
            paxes: Joi.array().required(),
            ages: Joi.array().required(),
          })
        ),
      })
    )
    .required(),
  holder: Joi.string().required(),
});

const placeBid = Joi.object({
  name: Joi.string().required(),
  tripType: Joi.optional().allow("Hotel"),
  from: Joi.string().required().label("whereId"),
  to: Joi.string().required().label("group code"),
  flightRoomNumber: Joi.string().required().label("Numbers of room need"),
  airlineHotelCode: Joi.string().required().label("hotelCode"),
  bookingClassReference: Joi.string().required().label("rate key"),
  departureFrom: Joi.string().required().label("checkIn"),
  departureTo: Joi.string().required().label("CheckOut"),
  biddingPrice: Joi.string().required(),
  minBid: Joi.string().required(),
  maxBid: Joi.string().required(),
  membersId: Joi.array().required(),
  totalMember: Joi.string().required(),
  adultMember: Joi.string().required(),
  childMember: Joi.string().required(),
  infantMember: Joi.string().required(),
  isUserTravelled: Joi.string().valid("true", "false").required(),
  sorceCode: Joi.string().required(),
});

export default {
  search,
  revalidate,
  booking,
  placeBid,
};
