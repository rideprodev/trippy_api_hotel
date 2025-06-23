import utility from "../services/utility";

const validateRequest = (options) => async (req, res, next) => {
  try {
    req.startTiming('validation');
    let objIn = req.body;
    if (options.type === "query") {
      objIn = req.query;
    }

    await options.schema.validateAsync({
      ...req.body,
    });

    req.endTiming('validation');
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
