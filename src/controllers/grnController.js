import hotelHelper from "../helper/hotelHelper";
import repositories from "../repositories";
import utility from "../services/utility";

const { grnRepository } = repositories;

export default {
  /**
   * search the hotels
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async search(req, res, next) {
    try {
      const bodyData = req.body;
      const hotelCodes = req.hotelCode;
      let result = [];
      if (bodyData.hotelCode && bodyData.hotelCode !== "") {
        result.push(await grnRepository.search(req));
      } else {
        const chaunkArray = [],
          counts = 50;
        const arrayLenght = hotelCodes.length;
        const numberCount = arrayLenght / counts;
        const floatCount = numberCount % 1 === 0;
        const loopCount =
          floatCount === false
            ? parseInt(numberCount + 1)
            : parseInt(numberCount);
        let start = 0;
        for (let index = 0; index < loopCount; index++) {
          let end = start + counts;
          chaunkArray.push(hotelCodes.slice(start, end));
          start = end;
        }
        let searchPromise = chaunkArray.map(async (element) => {
          req.body.hotelCode = element;
          return await grnRepository.search(req);
        });
        try {
          result = await Promise.all(searchPromise);
        } catch (err) {
          console.log(err);
        }
      }
      const response = result.filter((x) => x.status === 200);
      if (response.length === 0) {
        utility.getError(res, "No data Found!");
        // } else if (response.data.errors && response.data.errors.length > 0) {
        //   utility.getError(
        //     res,
        //     `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        //   );
      } else {
        let dataCustomise = response.map(async (element) => {
          return await hotelHelper.setCountryCityName(req, element.data);
        });
        const _response = await Promise.all(dataCustomise);

        let _combineHotelResponse = [];
        for (let i = 0; i < _response.length; i++) {
          const ele = _response[i];
          _combineHotelResponse = [..._combineHotelResponse, ...ele.hotels];
        }

        const finalResponseForSent = _response[0];
        finalResponseForSent.hotels = _combineHotelResponse;

        utility.getResponse(
          res,
          {
            count: _combineHotelResponse.length,
            ...finalResponseForSent,
          },
          "RETRIVED",
          200
        );
        hotelHelper.checkBiddingNotification(req, finalResponseForSent);
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get refech the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async refetch(req, res, next) {
    try {
      const response = await grnRepository.refetch(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        const _response = await hotelHelper.getAllImages(req, response.data);
        utility.getResponse(res, _response, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get recheck the detail
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async revalidate(req, res, next) {
    try {
      const response = await grnRepository.revalidate(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (response.data.errors && response.data.errors.length > 0) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        const _response = await hotelHelper.getCommission(req, response.data);
        utility.getResponse(res, _response, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * book the hotel
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async booking(req, res, next) {
    try {
      const response = await grnRepository.booking(req);
      if (response.status !== 200) {
        utility.getError(res, `${response.message} And your refund intiated`);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]} And your refund intiated`
        );
      } else {
        if (
          response.data.status === "pending" ||
          response.data.status === "confirmed"
        ) {
          utility.getResponse(res, response.data, response.data.status);
        } else {
          utility.getError(res, null, response.data.status);
        }
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * check the status
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingStatus(req, res, next) {
    try {
      const response = await grnRepository.bookingStatus(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cancel booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingCancel(req, res, next) {
    try {
      const response = await grnRepository.bookingCancel(req);
      if (response.status !== 200) {
        utility.getError(res, response.message);
      } else if (
        response.data &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
        utility.getError(
          res,
          `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
        );
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },
};
