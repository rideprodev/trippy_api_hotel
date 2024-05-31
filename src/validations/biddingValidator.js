import Joi from "joi";

const placeBid = Joi.object({
  groupId: Joi.string().optional().allow(""),
  roomType: Joi.string().required(),
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
  hotelCode: Joi.string().required(),
  biddingPrice: Joi.string().required(),
  minBid: Joi.string().required(),
  maxBid: Joi.string().required(),
  searchId: Joi.string().required(),
  groupCode: Joi.string().required(),
  rateKey: Joi.string().required(),
  expairationAt: Joi.string().required(),
  searchPayload: Joi.object().required(),
  totalRooms: Joi.string().required(),
  isUserTravelled: Joi.string().valid("true", "false").required(),
  cityCode: Joi.string().required(),
  roomType: Joi.string().required(),
  bookingComments: Joi.string().required(),
  totalMember: Joi.string().required(),
  bookingName: Joi.string().required(),
  price: Joi.string().required(),
  currency: Joi.string().required(),
  bookingItems: Joi.array()
    .items(
      Joi.object({
        room_code: Joi.string().required(),
        rate_key: Joi.string().required(),
        rooms: Joi.array().items(
          Joi.object({
            no_of_infants: Joi.number()
              .positive()
              .greater(0)
              .less(3)
              .optional()
              .allow(null),
            room_reference: Joi.string().required(),
            paxes: Joi.array().required(),
            ages: Joi.array().required(),
          })
        ),
      })
    )
    .required(),
});

const updateBid = Joi.object({
  minBid: Joi.string().required(),
  maxBid: Joi.string().required(),
  expairationAt: Joi.string().optional(),
});

const checkBookingForBidding = Joi.object({
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
  totalRooms: Joi.string().required(),
  totalMember: Joi.string().required(),
});

export default {
  placeBid,
  updateBid,
  checkBookingForBidding,
};
