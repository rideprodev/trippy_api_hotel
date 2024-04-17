import axios from "axios";
import utility from "./utility";
import logger from "./logger";

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
};
