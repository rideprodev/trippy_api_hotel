import repositories from "../repositories";
import requestHandler from "../services/requestHandler";
import models from "../models";
import schedulerRepository from "../repositories/schedulerRepository";
const { Setting } = models;
const { biddingRepository, customRepository, hotelRepository } = repositories;

export default {
  async checkBiddingforBookingOnDate(req, data) {
    delete req.user;
    const bodyData = req.body;
    console.log("search hit");
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
      const response = [];
      const cityData = await customRepository.fetchCityData(bodyData.cityCode);
      for (let i = 0; i < data.hotels.length; i++) {
        const x = data.hotels[i];
        const hotelData = await hotelRepository.fetchOneWithoutCount({
          hotelCode: x.hotel_code,
        });
        response.push({
          search_id: data.search_id,
          ...cityData[0],
          propery_type: hotelData.accommodationTypeSubName,
          chain_name: hotelData.ChainName,
          ...x,
        });
      }
      await delete data.search_id;
      data.hotels = response;
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
        if (roomTypes.indexOf(x.rooms[0].room_type)) {
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
