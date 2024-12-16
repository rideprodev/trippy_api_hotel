import axios from "axios";
import utility from "./utility";
import logger from "./logger";
import config from "../config";

export default {
  async fetchResponseFromHotel(requestApiBase, Token, _requestData = {}) {
    try {
      if (Token !== false) {
        const _request = {
          method: requestApiBase.method,
          url: requestApiBase.url,
          data: _requestData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "api-key": Token,
          },
        };
        // console.log(_request, "_request");
        const { status, data } = await axios(_request);
        return {
          status: status,
          data: data,
        };
      } else {
        return {
          status: 203,
          message: "Token is expaired",
        };
      }
    } catch (error) {
      return {
        status: error.response.status,
        message:
          error.response.data.errors && error.response.data.errors.length > 0
            ? `${error.response.data.errors[0].code} : ${error.response.data.errors[0].messages[0]}`
            : error.response.data,
      };
    }
  },

  async SendToNotificationService(email, pageName, subject, forwordData = {}) {
    try {
      console.log(email, pageName, subject);
      const requestData = {
        email,
        pageName,
        subject,
      };
      const _request = {
        method: "post",
        url: `${config.app.MailerHost}notification/email`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      // console.log(data);
      return data.success;
    } catch (error) {
      logger.requestErrorLogger.error(
        `${
          config.app.EmailBaseUrl
        } calling error ${new Date()} ${JSON.stringify(error)}`
      );
      return response.data;
    }
  },

  //commumnication with the auth server
  async sendForRefund(refundId, userId) {
    try {
      console.log(refundId, userId);
      const requestData = {
        refundId: `${refundId}`,
        userId: `${userId}`,
      };
      const _request = {
        method: "post",
        url: `${config.app.authUrl}/payment/refund-by-id`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      // console.log(data);
      return data;
    } catch (error) {
      logger.requestErrorLogger.error(
        `${
          config.app.EmailBaseUrl
        } calling error ${new Date()} ${JSON.stringify(error)}`
      );
      return response.data;
    }
  },

  //send email to notification service
  async sendEmail(email, pageName, subject, forwordData) {
    try {
      // console.log(email, pageName, subject, forwordData);
      const requestData = {
        email,
        pageName,
        subject,
        forwordData,
      };
      const _request = {
        method: "post",
        url: `${config.app.MailerHost}notification/email`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      console.log("data", data);
      return data.success;
    } catch (error) {
      logger.requestErrorLogger.error(
        `${
          config.app.EmailBaseUrl
        } calling error ${new Date()} ${JSON.stringify(error)}`
      );
      return error.response.data;
    }
  },

  //Pay Now
  async sendForPay(_requestData) {
    try {
      const requestData = _requestData;

      const _request = {
        method: "post",
        url: `${config.app.authUrl}payment/purchase/server`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error?.response?.data);
    }
  },

  async convertCurrency(amount, currency) {
    try {
      const requestData = {
        from: currency,
        to: "AUD",
        amount: [amount],
      };

      const _request = {
        method: "post",
        url: `${config.app.CureencyConvertUrl}convert-currency`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error?.response?.data);
    }
  },

  async createPayBack(bookingGroupId, bookingId, userId, transictionId) {
    try {
      const requestData = {
        bookingGroupId: `${bookingGroupId}`,
        bookingId: `${bookingId}`,
        userId: `${userId}`,
        transictionId: `${transictionId}`,
      };

      const _request = {
        method: "post",
        url: `${config.app.authUrl}payback/add-refund-request`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error?.response?.data);
    }
  },
};
