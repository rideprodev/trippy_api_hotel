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
});

const revalidate = Joi.object({
  search_id: Joi.string().required(),
  group_code: Joi.string().required(),
  rate_key: Joi.string().required(),
});

const booking = Joi.object({
  search_id: Joi.string().required(),
  hotel_code: Joi.string().required(),
  city_code: Joi.string().required(),
  group_code: Joi.string().required(),
  checkin: Joi.string().required(),
  checkout: Joi.string().required(),
  booking_comments: Joi.string().required(),
  booking_items: Joi.array()
    .items(
      Joi.object({
        room_code: Joi.string().required(),
        rate_key: Joi.string().required(),
        room_reference: Joi.string().required(),
        rooms: Joi.array().items(
          Joi.object({
            no_of_infants: Joi.number()
              .positive()
              .greater(0)
              .less(3)
              .optional()
              .allow(null),
            paxes: Joi.array().items(
              Joi.object({
                title: Joi.string()
                  .valid("Mr.", "Ms.", "Mrs.", "Mstr.")
                  .required(),
                name: Joi.string().required(),
                surname: Joi.string().required(),
                type: Joi.string().valid("AD", "CH").required(),
                age: Joi.number().when("type", {
                  is: "CH",
                  then: Joi.number().positive().greater(0).less(18).required(),
                  otherwise: Joi.number().optional().allow(null),
                }),
              })
            ),
          })
        ),
      })
    )
    .required(),
});

export default {
  search,
  revalidate,
  booking,
};
