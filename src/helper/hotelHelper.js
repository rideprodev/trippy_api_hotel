import repositories from "../repositories";
import models from "../models";
import schedulerRepository from "../repositories/schedulerRepository";
import config from "../config";
const { Setting } = models;
const { bookingRepository, customRepository, hotelRepository } = repositories;

export default {
  async checkBiddingforBookingOnDate(req, data) {
    try {
      delete req.user;
      const bodyData = req.body;
      const searchFilter = {
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        totalMember: bodyData.totalMember,
        totalAdult: bodyData.totalAdult,
        totalChildren: bodyData.totalChildren,
      };
      // fetch all booking and its bidding from the database on where
      const AllBookingGroupData =
        await bookingRepository.getAllBookingForScdulerBidding(
          [],
          searchFilter
        );
      try {
        if (AllBookingGroupData.length > 0) {
          let resultResponse = [];
          const chaunkArray = [],
            counts = 10;
          const arrayLenght = AllBookingGroupData.length;
          const numberCount = arrayLenght / counts;
          const floatCount = numberCount % 1 === 0;
          const loopCount =
            floatCount === false
              ? parseInt(numberCount + 1)
              : parseInt(numberCount);
          let start = 0;
          for (let index = 0; index < loopCount; index++) {
            let end = start + counts;
            chaunkArray.push(AllBookingGroupData.slice(start, end));
            start = end;
          }
          const chunkBookingMap = chaunkArray.map(
            async (x) => await this.fetchLatestPriceFromSearchData(x, data)
          );
          try {
            resultResponse = await Promise.all(chunkBookingMap);
          } catch (err) {
            console.log(err);
          }
          return resultResponse;
        } else {
          return "No Booking-Bidding Found";
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },

  async fetchLatestPriceFromSearchData(bookingGroupData, searchResult) {
    const groupObjectData = bookingGroupData;
    const result = searchResult;
    const hotelData = [];

    const searchPromiseFilter = groupObjectData.map(async (x) => {
      // filter unique codes
      const hotelCode = x.biddingData
        .map((y) => y.hotelCode)
        .filter((item, i, ar) => ar.indexOf(item) === i);
      // filter unique hotel codes with its roomType
      const rooms = hotelCode.map((y) => {
        const roomTypes = x.biddingData.filter((z) => z.hotelCode === y);
        const roomType = roomTypes
          .map((m) => m.roomType)
          .filter((item, i, ar) => ar.indexOf(item) === i);
        return { hotelCode: y, roomType };
      });
      hotelData.push({
        id: x.id,
        commission: x.userData.commission,
        commissionValue: x.userData.commissionValue,
        rooms,
        biddingData: x.biddingData,
        bookingGroupData: x,
      });
      return true;
    });

    try {
      await Promise.all(searchPromiseFilter);
    } catch (err) {
      console.log(err);
    }

    return await schedulerRepository.checkBookingForBiddingSchedule(
      bookingGroupData,
      [{ data: result }],
      hotelData
    );
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
      for (let i = 0; i < data?.hotels?.length; i++) {
        const x = data.hotels[i];
        const hotelData = await hotelRepository.fetchOneWithoutCount({
          hotelCode: x.hotel_code,
        });
        orignalResponse.push({
          search_id: data.search_id,
          ...cityData[0],
          ...x,
        });
        response.push({
          search_id: data.search_id,
          ...cityData[0],
          propery_type: hotelData.accommodationTypeSubName,
          chain_name: hotelData.ChainName,
          address: x.address,
          category: x.category,
          country: x.country,
          facilities: x.facilities,
          hotel_code: x.hotel_code,
          images: x.images,
          name: x.name,
          rates: x.rates.map((y) => {
            const resultData = {
              non_refundable: y.non_refundable,
              boarding_details: y.boarding_details || [],
              other_inclusions: y.other_inclusions || [],
              cancellation_policy: y?.cancellation_policy
                ? y.cancellation_policy
                : {},
              currency: y.currency,
              price: y.price,
              rooms:
                y.rooms.length > 0
                  ? y.rooms.map((room) => {
                      return { room_type: room.room_type };
                    })
                  : [],
            };

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
      const HotelResponse = {
        address: data.hotel.address,
        category: data.hotel.category,
        description: data.hotel.description,
        facilities: data.hotel.facilities,
        images: data.hotel.images,
        name: data.hotel.name,
        rates: data.hotel?.rates?.map((y) => {
          const reatesData = {
            boarding_details: y.boarding_details,
            cancellation_policy:
              y.cancellation_policy &&
              y.cancellation_policy.cancel_by_date &&
              y.non_refundable === false
                ? y.cancellation_policy
                : {},
            non_refundable: y.non_refundable,
            currency: y.currency,
            price: y.price,
            group_code: y.group_code,
            rate_key: y.rate_key,
            rooms: y?.rooms?.map((r) => {
              return {
                description: r.description,
                no_of_adults: r.no_of_adults,
                no_of_children: r.no_of_children,
                room_type: r.room_type,
              };
            }),
          };
          return reatesData;
        }),
      };

      data.hotel = HotelResponse;
      delete data.no_of_adults;
      delete data.no_of_children;
      delete data.no_of_hotels;
      delete data.no_of_rooms;
      delete data.more_results;
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getCommission(req, data) {
    try {
      const userData = req.user;
      let commission = 0,
        commissionAmount = 0,
        totalPrice = 0;
      if (userData.commission === "relevant") {
        const comissionPercent = await Setting.findOne({
          where: { key: config.app.GRNPercentageKey },
        });
        commission = parseFloat(comissionPercent.value);
        commissionAmount =
          (parseFloat(data?.hotel?.rate?.price) * commission) / 100;
        totalPrice = parseFloat(data?.hotel?.rate?.price) + commissionAmount;
        data.serviceChages = `${commissionAmount}`;
        data.finalAmount = `${parseFloat(totalPrice).toFixed(2)}`;
      } else {
        commission = userData?.commissionValue
          ? parseFloat(userData.commissionValue)
          : 0;
        commissionAmount =
          (parseFloat(data?.hotel?.rate?.price) * commission) / 100;
        totalPrice = parseFloat(data?.hotel?.rate?.price) + commissionAmount;
        data.serviceChages = `${commissionAmount}`;
        data.finalAmount = `${parseFloat(totalPrice).toFixed(2)}`;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
