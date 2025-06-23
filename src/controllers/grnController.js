import config from "../config";
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
      req.startTiming('search');
      const bodyData = req.body;
      const hotelCodes = req.hotelCode;
      let result = [];
      
      req.startTiming('hotelCodeProcessing');
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
        req.endTiming('hotelCodeProcessing');
        
        req.startTiming('parallelSearch');
        console.log(`🔄 Processing ${chaunkArray.length} chunks in parallel...`);
        let searchPromise = chaunkArray.map(async (element, index) => {
          console.log(`📦 Processing chunk ${index + 1}/${chaunkArray.length} with ${element.length} hotels`);
          req.body.hotelCode = element;
          return await grnRepository.search(req);
        });
        try {
          result = await Promise.all(searchPromise);
        } catch (err) {
          console.log(err);
        }
        req.endTiming('parallelSearch');
      }
      
      req.startTiming('responseProcessing');
      const response = result.filter((x) => x.status === 200);
      // console.log(response,"datas")
      if (response.length === 0) {
        utility.getError(res, "No data Found!");
      } else {
        req.startTiming('dataCustomization');
        let dataCustomise = response.map(async (element) => {
          return await hotelHelper.setCountryCityName(req, element.data);
        });
        const _response = await Promise.all(dataCustomise);
        req.endTiming('dataCustomization');

        req.startTiming('hotelCombination');
        let _combineHotelResponse = [];
        for (let i = 0; i < _response.length; i++) {
          const ele = _response[i];
          _combineHotelResponse = [..._combineHotelResponse, ...ele.hotels];
        }

        const finalResponseForSent = _response[0];
        finalResponseForSent.hotels = _combineHotelResponse;
        req.endTiming('hotelCombination');
        if(finalResponseForSent?.errors && finalResponseForSent?.errors?.length > 0){
          utility.getError(res, finalResponseForSent?.errors[0]?.messages[0]);
        }else{
        utility.getResponse(
          res,
          {
            count: _combineHotelResponse.length,
            ...finalResponseForSent,
          },
          "RETRIVED",
          200
        );
      }
        req.startTiming('biddingCheck');
        if (!bodyData.cutOffTime) {
          hotelHelper.checkBiddingforBookingOnDate(req, {
            hotels: req.orignalResponse,
          });
        }
        req.endTiming('biddingCheck');
      }
      req.endTiming('responseProcessing');
      req.endTiming('search');
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
        utility.getError(res, `${response.message}`);
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
        if (
          response.data.status === "pending" ||
          response.data.status === "confirmed"
        ) {
          const BookingResponse = {
            status: response.data.status,
            checkin: response.data.checkin,
            checkout: response.data.checkout,
            booking_date: response.data?.booking_date,
            booking_reference: response.data.booking_reference,
            hotel: {
              paxes: response.data?.hotel?.paxes,
              booking_items: response?.data?.hotel?.booking_items.map((x) => {
                if (
                  x?.cancellation_policy &&
                  x.cancellation_policy.cancel_by_date
                ) {
                  x.cancellation_policy.cancel_by_date =
                    utility.getDateAfterBeforeFromDate(
                      x.cancellation_policy.cancel_by_date,
                      config.app.CancellationDaysDifference,
                      "YYYY-MM-DDTH:m:s"
                    );
                }
                return x;
              }),
              city_name: response?.data?.hotel?.city_name,
              hotel_code: response?.data?.hotel?.hotel_code,
            },
            bookingGroupData: response.data.bookingGroupData,
          };
          utility.getResponse(res, BookingResponse, BookingResponse.status);
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
        utility.getResponse(
          res,
          {
            status: response.data.booking_status,
            booking_type: response.data.booking_type,
            cancel_date: response.data?.cancellation_details?.cancel_date,
            cancellation_charges:
              response.data?.cancellation_details?.cancellation_charge,
          },
          "RETRIVED"
        );
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
