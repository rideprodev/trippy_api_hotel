import sms from "../services/sms";
import utility from "../services/utility";
import moment from "moment-timezone";
const dateFormat = "YYYY-MM-DD HH:mm:ss";
import Email from "../services/email";
import logger from "../services/logger";
import config from "../config";

export default {
  async sendOtp(req, phoneNumberCountryCode, phoneNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        let otp = utility.generateOtp();
        let currentDate = moment.utc().format(dateFormat);
        let otpSpentTime = currentDate;
        let OtpMessage = utility.getMessage(req, false, "SEND_OTP_MESSAGE");
        OtpMessage = OtpMessage.replace("{newotp}", otp);

        if (config.app.environment == "development") {
          resolve({
            otp: "4444",
            otpSpentTime,
          });
        } else {
          await sms.sendOtp(
            `${phoneNumberCountryCode}${phoneNumber}`,
            OtpMessage
          );
          resolve({
            otp: otp,
            otpSpentTime,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  async sendOtpOnEmail(req) {
    let currentDate = moment.utc().format(dateFormat);
    let otpSpentTime = currentDate;
    if (config.app.environment == "development") {
      return {
        otp: "4444",
        otpSpentTime,
      };
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          let otp = utility.generateOtp();
          if (req.body.otp) {
            otp = req.body.otp;
          }

          let OtpMessage = utility.getMessage(req, false, "SEND_OTP_MESSAGE");
          OtpMessage = OtpMessage.replace("{otp}", otp);
          let userFirstName = req.body.fullName.split(" ");
          const data = {
            to: req.body.email,
            email: req.body.email,
            name: userFirstName,
            otp: otp,
          };
          if (req.body.type && req.body.type == "resend") {
            await Email.userResendVerificationCode(data)
              .then((result) => {
                resolve({
                  otp: otp,
                  otpSpentTime,
                });
              })
              .catch((error) => {
                logger.emailErrorLogger.error(
                  `Mail sent error ${new Date()} ${JSON.stringify(error)}`
                );
                reject(error);
              });
          } else {
            await Email.emailVerification(data)
              .then((result) => {
                resolve({
                  otp: otp,
                  otpSpentTime,
                });
              })
              .catch((error) => {
                logger.emailErrorLogger.error(
                  `Mail sent error ${new Date()} ${JSON.stringify(error)}`
                );
                reject(error);
              });
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  },

  async getCurrentDateTime() {
    try {
      let currentDate = null;
      currentDate = moment.utc().format(dateFormat);
      return currentDate;
    } catch (error) {
      throw Error(error);
    }
  },
};
