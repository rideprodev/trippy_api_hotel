import moment from "moment-timezone";
import config from "../config";
import language from "../language";
const dateFormat = "YYYY-MM-DD HH:mm:ss";

export default {
  /**
   * Get Message According the parameter
   * @param {Message}
   */
  getResponse(res, data, messageKey, statusCode = 200, req = {}, key = false) {
    res.status(statusCode).json({
      success: true,
      message: this.getMessage(req, key, messageKey),
      data: data,
    });
  },

  /**
   * Get Message According the parameter
   * @param {Message}
   */
  getError(res, messageKey, statusCode = 203, req = {}, key = false) {
    res.status(statusCode).json({
      success: false,
      message: this.getMessage(req, key, messageKey),
      data: null,
    });
  },

  getMessage(req = {}, data, key) {
    const languages = config.app.languages;
    let message = "";
    let languageCode =
      req.headers && (req.headers.language || req.headers["language"]);
    languageCode = languages.indexOf(languageCode) !== -1 ? languageCode : "en";
    if (data) {
      message =
        language[languageCode] && language.en[`${key}`]
          ? language[languageCode][`${key}`](data)
          : key;
    } else {
      message =
        language[languageCode] && language.en[`${key}`]
          ? language[languageCode][`${key}`]
          : key;
    }
    return message;
  },
  /**
   * Generate random string
   * @param {Number} length
   */
  generateRandomString: (length) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let output = "";

    for (let x = 0; x < length; x++) {
      const i = Math.floor(Math.random() * 62);
      output += chars.charAt(i);
    }
    return output;
  },
  /**
   * Generate random integer
   */
  generateRandomInteger: (length = 8) => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  },
  /**
   * Generate otp
   */
  generateOtp() {
    return config.app.environment == "development"
      ? 4444
      : this.generateRandomInteger(4);
  },
  /**
   * Generate randon password
   */
  generateRandomPassword() {
    return this.generateRandomString(8);
  },
  /**
   * Encode String
   */
  encodeId(value) {
    return `${Buffer.from(
      `T${Buffer.from(`${value}`).toString("base64")}`
    ).toString("base64")}`.replaceAll("=", "");
  },

  // Base 64 Encode
  async ENCODE(code) {
    return `${Buffer.from(
      `Trippybid-Coding-$2y.S/${Buffer.from(`${code}`).toString(
        "base64"
      )}/$2y.Dev-Trippybid-Coding`
    ).toString("base64")}`.replaceAll("=", "");
  },

  // Base 64 Decode
  async DECODE(code) {
    return Buffer.from(
      `${Buffer.from(`${code}`, "base64").toString("ascii")}`.split("/")[1],
      "base64"
    ).toString("ascii");
  },

  /**
   * Get current date time
   * @param {Object} req
   */
  async getCurrentDateTime() {
    try {
      let currentDate = null;
      currentDate = moment.utc().format(dateFormat);
      return currentDate;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get date difference
   * @param {Date} date
   * @param {String} interval
   * @param {Number} units
   */
  dateDifference(date1, date2, DiifIn = "hours") {
    let diffrence = null;
    const start_date = moment(date1, "YYYY-MM-DD HH:mm:ss");
    const end_date = moment(date2, "YYYY-MM-DD HH:mm:ss");
    const duration = moment.duration(end_date.diff(start_date));
    if (DiifIn == "minutes") {
      diffrence = duration.asMinutes();
    } else if (DiifIn == "days") {
      diffrence = duration.asDays();
    } else if (DiifIn == "years") {
      diffrence = duration.asYears();
    } else {
      diffrence = duration.asHours();
    }
    return diffrence;
  },
};
