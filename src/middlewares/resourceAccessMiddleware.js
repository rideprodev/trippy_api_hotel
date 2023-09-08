import HttpStatus from "http-status";
import utility from "../services/utility";

/**
 * Check resource access permision
 * according to user role
 * @param {Array} userTypeArr
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const resourceAccessGuard = (userTypeArr) => async (req, res, next) => {
  const { user } = req;
  try {
    if (~userTypeArr.indexOf(user.userType)) {
      next();
    } else {
      utility.getError(res, "INVALID_USER_ACCESS", HttpStatus.BAD_REQUEST);
    }
  } catch (error) {
    utility.getError(res, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
  }
};

export default resourceAccessGuard;
