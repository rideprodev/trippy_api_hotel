import utility from "../services/utility";

const validateRequest = (options) => async (req, res, next) => {
  try {
    let objIn = req.body;
    if (options.type === "query") {
      objIn = req.query;
    }

    await options.schema.validateAsync({
      ...req.body,
    });

    next();
  } catch (error) {
    let errors = "";
    if (error.isJoi) {
      error.details.forEach((errorData) => {
        errors = errorData.message;
      });
      utility.getError(res, errors);
    }
  }
};

export default validateRequest;
