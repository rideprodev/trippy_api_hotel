import axios from "axios";
import utility from "./utility";
import logger from "./logger";

export default {
  async fetchResponseFromHotel(requestApiBase, Token, _requestData = {}) {
    try {
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
    } catch (error) {
      return {
        status: error.response.status,
        message: `${error.response.data.errors[0].code} : ${error.response.data.errors[0].messages[0]}`,
      };
    }
  },
};
