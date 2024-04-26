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
  clientNationality: Joi.string().required(),
});

const refetch = Joi.object({
  searchId: Joi.string().required(),
  hotelCode: Joi.string().required(),
});

const revalidate = Joi.object({
  searchId: Joi.string().required(),
  groupCode: Joi.string().required(),
  rateKey: Joi.string().required(),
});

const booking = Joi.object({
  searchId: Joi.string().required(),
  transactionId: Joi.number().greater(0).required(),
  searchPayload: Joi.object().required(),
  totalRooms: Joi.string().required(),
  isUserTravelled: Joi.string().valid("true", "false").required(),
  hotelCode: Joi.string().required(),
  cityCode: Joi.string().required(),
  groupCode: Joi.string().required(),
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
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
  // holder: Joi.string().required(),
});

const bookingStatus = Joi.object({
  bookingId: Joi.string().required(),
});

export default {
  search,
  revalidate,
  booking,
  refetch,
  bookingStatus,
};
