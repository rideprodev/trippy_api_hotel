import Joi from "joi";

const search = Joi.object({
  rooms: Joi.array()
    .items(
      Joi.object({
        adults: Joi.string().valid("1", "2").required(),
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

export default {
  search,
};
