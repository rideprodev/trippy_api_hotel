import Joi from "joi";

const placeBid = Joi.object({
  name: Joi.string().required(),
  tripType: Joi.optional().allow("Hotel"),
  groupCode: Joi.string().required(),
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
  expairationAt: Joi.string().optional(),
});

const updateBid = Joi.object({
  name: Joi.string().required(),
  minBid: Joi.string().required(),
  maxBid: Joi.string().required(),
  membersId: Joi.array().required(),
  totalMember: Joi.string().required(),
  adultMember: Joi.string().required(),
  childMember: Joi.string().required(),
  infantMember: Joi.string().required(),
  isUserTravelled: Joi.string().valid("true", "false").required(),
  expairationAt: Joi.string().optional(),
});

export default {
  placeBid,
  updateBid,
};
