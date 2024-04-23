import Joi from "joi";

const placeBid = Joi.object({
  groupId: Joi.string().required(),
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
  maxBid: Joi.string().required(),
  expairationAt: Joi.string().required(),
});

const updateBid = Joi.object({
  minBid: Joi.string().required(),
  maxBid: Joi.string().required(),
  expairationAt: Joi.string().optional(),
});

export default {
  placeBid,
  updateBid,
};
