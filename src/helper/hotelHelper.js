import repositories from "../repositories";
import requestHandler from "../services/requestHandler";
import models from "../models";
import schedulerRepository from "../repositories/schedulerRepository";
const { Setting } = models;
const { bookingRepository, customRepository, hotelRepository } = repositories;

export default {
  async checkBiddingforBookingOnDate(req, data) {
    delete req.user;
    const bodyData = req.body;
    const searchFilter = {
      checkIn: bodyData.checkIn,
      checkOut: bodyData.checkOut,
      totalMember: bodyData.totalMember,
      totalAdult: bodyData.totalAdult,
      totalChildren: bodyData.totalChildren,
    };
    const schdulerRequestData =
      await bookingRepository.getAllBookingForScdulerBidding([], searchFilter);
  },

  async setCountryCityName(req, data) {
    try {
      for (let index = 0; index < data?.hotels?.length; index++) {
        const element = data?.hotels?.[index];
        const rates = await element?.rates?.filter(
          (x) =>
            x.non_refundable == false &&
            x.cancellation_policy.under_cancellation == false
        );
        element.rates = rates;
      }

      data.hotels = data?.hotels?.filter((x) => x.rates.length > 0);

      const bodyData = req.body;
      const response = [],
        orignalResponse = [];
      const cityData = await customRepository.fetchCityData(bodyData.cityCode);
      for (let i = 0; i < data.hotels.length; i++) {
        const x = data.hotels[i];
        orignalResponse.push({
          search_id: data.search_id,
          ...cityData[0],
          ...x,
        });
        response.push({
          search_id: data.search_id,
          ...cityData[0],
          propery_type: x.propery_type,
          address: x.address,
          category: x.category,
          country: x.country,
          facilities: x.facilities,
          hotel_code: x.hotel_code,
          images: x.images,
          name: x.name,
          rates: x.rates.map((x) => {
            const resultData = {
              boarding_details: x.boarding_details || [],
              currency: x.currency,
              price: x.price,
            };
            if (x.other_inclusions && x.other_inclusions.length > 0) {
              resultData.other_inclusions = x.other_inclusions;
            }
            return resultData;
          }),
        });
      }
      await delete data.search_id;
      data.hotels = response;
      req.orignalResponse = orignalResponse;
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllImages(req, data) {
    try {
      const images = await hotelRepository.fetchAllImagesWhereHotel({
        hotelCode: req.body.hotelCode,
      });

      data.hotel.rates = await data?.hotel?.rates?.filter(
        (x) =>
          x?.non_refundable == false &&
          x.cancellation_policy.under_cancellation == false
      );

      const arraySorted = await data?.hotel?.rates?.sort(
        (a, b) => a.price - b.price
      );
      const roomTypes = [];
      const arrayFilter = arraySorted.filter((x) => {
        const checkAvailibility = roomTypes.filter(
          (m) => m == x.rooms[0].room_type
        );
        if (checkAvailibility.length === 0) {
          roomTypes.push(x.rooms[0].room_type);
          return x;
        }
      });
      data.hotel.rates = arrayFilter;
      data.images = images;
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getCommission(req, data) {
    try {
      const userData = req.user;
      if (userData.commission === "relevant") {
        let commission = 0,
          commissionAmount = 0,
          totalPrice = 0;
        const comissionPercent = await Setting.findOne({
          where: { key: "b05970e2431ae626c0f4a0f67c56848bdf22811d" },
        });
        commission = parseFloat(comissionPercent.value);
        commissionAmount =
          (parseFloat(data?.hotel?.rate?.price) * commission) / 100;
        totalPrice = parseFloat(data?.hotel?.rate?.price) + commissionAmount;
        data.serviceChages = `${commissionAmount}`;
        data.finalAmount = `${parseFloat(totalPrice).toFixed(2)}`;
      } else {
        data.serviceChages = "0";
        data.finalAmount = `${parseFloat(data?.hotel?.rate?.price).toFixed(2)}`;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
