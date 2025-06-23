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
        
        console.log(`🌐 Making HTTP request to: ${requestApiBase.url}`);
        console.log(`📦 Request data size: ${JSON.stringify(_requestData).length} bytes`);
        
        const startTime = Date.now();
        const { status, data } = await axios(_request);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        console.log(`✅ HTTP Response: ${status} - ${responseTime}ms`);
        console.log(`📦 Response data size: ${JSON.stringify(data).length} bytes`);
        
        // Performance warnings
        if (responseTime > 30000) {
          console.log(`⚠️ SLOW API: Response time > 30s (${responseTime}ms)`);
        } else if (responseTime > 15000) {
          console.log(`⚠️ SLOW API: Response time > 15s (${responseTime}ms)`);
        }
        
        return {
          status: status,
          data: data,
          responseTime: responseTime
        };
      } else {
        return {
          status: 203,
          message: "Token is expaired",
        };
      }
    } catch (error) {
      console.log(`❌ HTTP Error: ${error.response?.status || 'Network Error'}`);
      console.log(`⏱️ Error after: ${Date.now() - startTime}ms`);
      
      return {
        status: error.response?.status || 500,
        message:
          error.response?.data?.errors && error.response?.data?.errors.length > 0
            ? `${error.response?.data?.errors[0].code} : ${error.response?.data?.errors[0].messages[0]}`
            : error.response?.data || error.message,
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
        url: `${config.app.authUrl}payment/refund-by-id`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(_request);
      const { data } = await axios(_request);
      console.log("refund", data);
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
      console.log("payment", data.success);
      return data;
    } catch (error) {
      console.log(error?.response?.data);
    }
  },

  async convertCurrency(amount, currency) {
    try {
      const _request = {
        method: "get",
        url: `${
          config.app.CureencyConvertUrl
        }/convert?from=${currency}&to=${"AUD"}&amount=${amount}&api_key=${
          config.app.CurrencyConverterToken
        }`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(_request);
      const { data } = await axios(_request);
      console.log("currencyConverter", data);
      if (data && data.result) {
        console.log(data.result.AUD);
        return data.result.AUD;
      } else {
        return false;
      }
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
