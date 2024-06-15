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
  searchPayload: Joi.object().optional().allow(""),
  totalRooms: Joi.string().optional().allow(""),
  isUserTravelled: Joi.string().valid("true", "false").optional().allow(""),
  cityCode: Joi.string().optional().allow(""),
  roomType: Joi.string().optional().allow(""),
  bookingComments: Joi.string().optional().allow(""),
  totalMember: Joi.string().optional().allow(""),
  bookingName: Joi.string().optional().allow(""),
  price: Joi.string().optional().allow(""),
  currency: Joi.string().optional().allow(""),
  bookingItems: Joi.array()
    .items(
      Joi.object({
        room_code: Joi.string().optional().allow(""),
        rate_key: Joi.string().optional().allow(""),
        rooms: Joi.array().items(
          Joi.object({
            no_of_infants: Joi.number()
              .positive()
              .greater(0)
              .less(3)
              .optional()
              .allow(null),
            room_reference: Joi.string().optional().allow(""),
            paxes: Joi.array().optional().allow(""),
            ages: Joi.array().optional().allow(""),
          })
        ),
      })
    )
    .optional()
    .allow(""),
  reavalidateResponse: Joi.object().required(),
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
