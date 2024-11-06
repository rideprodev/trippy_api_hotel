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
  totalMember: Joi.string().required(),
  totalAdult: Joi.string().required(),
  totalChildren: Joi.string().required(),
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
  cardId: Joi.number().greater(0).required(),
  searchPayload: Joi.object().required(),
  totalRooms: Joi.string().required(),
  hotelCode: Joi.string().required(),
  cityCode: Joi.string().required(),
  groupCode: Joi.string().required(),
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
  roomType: Joi.string().required(),
  bookingComments: Joi.string().required(),
  totalMember: Joi.string().required(),
  totalAdult: Joi.string().required(),
  totalChildren: Joi.string().required(),
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
            paxes: Joi.array().items(
              Joi.object({
                title: Joi.string().valid("Mr.").required(),
                name: Joi.string().required(),
                surname: Joi.string().optional().allow(""),
                type: Joi.string().valid("AD", "CH").optional(),
                age: Joi.string().required(),
              })
            ),
          })
        ),
      })
    )
    .required(),
  reavalidateResponse: Joi.object().required(),
  hotelName: Joi.string().required(),
  fullAddress: Joi.string().required(),
  imageUrl: Joi.string().required(),
  totalNight: Joi.string().required(),
});

const bookingStatus = Joi.object({
  bookingId: Joi.string().required(),
});

const payment = Joi.object({
  transactionId: Joi.number().greater(0).required(),
  hotelName: Joi.string().required(),
  currency: Joi.string().required(),
  price: Joi.string().required(),
});

const updateCardOnBooking = Joi.object({
  cardId: Joi.number().greater(0).required(),
});

export default {
  search,
  revalidate,
  booking,
  refetch,
  bookingStatus,
  payment,
  updateCardOnBooking,
};
