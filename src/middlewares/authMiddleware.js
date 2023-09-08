import HttpStatus from "http-status";
import jwt from "../services/jwt";
import userRepository from "../repositories/userRepository";
import accountRepository from "../repositories/accountRepository";
import utility from "../services/utility";

/**
 * Check user authorization
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const authValidateRequest = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length == 2) {
        const scheme = parts[0];
        const token = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          const decodedToken = jwt.verifyToken(token);
          if (decodedToken) {
            const user = await userRepository.findOne({ id: decodedToken.id }); //Find user detail from token
            if (user) {
              const userToken = await accountRepository.getDeviceDetailByToken(
                token
              );
              if (userToken) {
                req.user = user;
                req.userToken = userToken;
                next();
              } else {
                utility.getError(
                  res,
                  "Your session has expired. Please login.",
                  HttpStatus.UNAUTHORIZED
                );
              }
            } else {
              utility.getError(
                res,
                "Your Account is inactive, please contact to admin.",
                HttpStatus.UNAUTHORIZED
              );
            }
          } else {
            utility.getError(
              res,
              "Unauthorized access or token required.",
              HttpStatus.BAD_REQUEST
            );
          }
        } else {
          utility.getError(
            res,
            "Your session has expired. Please login.",
            HttpStatus.UNAUTHORIZED
          );
        }
      } else {
        utility.getError(
          res,
          "Unauthorized user access.",
          HttpStatus.UNAUTHORIZED
        );
      }
    } else {
      utility.getError(
        res,
        "Unauthorized access or token required.",
        HttpStatus.BAD_REQUEST
      );
    }
  } catch (error) {
    utility.getError(res, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
  }
};
export default authValidateRequest;
