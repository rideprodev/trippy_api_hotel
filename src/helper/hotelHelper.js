import repositories from "../repositories";
import models from "../models";
import schedulerRepository from "../repositories/schedulerRepository";
import config from "../config";
import utility from "../services/utility";
const { Setting } = models;
const { bookingRepository, customRepository, hotelRepository } = repositories;

export default {
  async checkBiddingforBookingOnDate(req, data) {
    try {
      let AllBookingGroupData = [];
      delete req.user;
      const bodyData = req.body;
      const searchFilter = {
        checkIn: bodyData.checkIn,
        checkOut: bodyData.checkOut,
        totalRooms: bodyData.rooms.length,
        totalMember: bodyData.totalMember,
        totalAdult: bodyData.totalAdult,
        totalChildren: bodyData.totalChildren,
        currency: bodyData.currency,
      };
      // console.log(searchFilter);
      // fetch all booking and its bidding from the database on where
      const AllGroupDataFromSchedular =
        await bookingRepository.getAllBookingForScdulerBidding(
          [],
          searchFilter
        );
      if (AllGroupDataFromSchedular.length > 0) {
        const agesCheckedData = [];
        for (let index = 0; index < AllGroupDataFromSchedular.length; index++) {
          const elementAges = AllGroupDataFromSchedular[index];
          if (JSON.parse(elementAges.searchPayload)) {
            const searchPayload = JSON.parse(elementAges.searchPayload);
            if (
              searchPayload?.childrenAges &&
              Object.keys(searchPayload.childrenAges).length === 0 &&
              Object.keys(bodyData.childrenAges).length === 0
            ) {
              agesCheckedData.push(elementAges);
            } else {
              let isMatched = 0;
              const searchKeys = Object.keys(searchPayload.childrenAges);
              const searchValues = Object.values(searchPayload.childrenAges);
              for (let index = 0; index < searchKeys.length; index++) {
                const elementA = searchKeys[index];
                if (
                  bodyData.childrenAges[`${elementA}`] &&
                  bodyData.childrenAges[`${elementA}`] == searchValues[index]
                ) {
                  isMatched = isMatched + 1;
                }
              }
              if (isMatched === searchKeys.length) {
                agesCheckedData.push(elementAges);
              }
            }
          }
          AllBookingGroupData = agesCheckedData;
        }
      }
      console.log(AllGroupDataFromSchedular.length, AllBookingGroupData.length);
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
          // console.log("resultResponse", resultResponse);
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
        .map((y) => `${y.hotelCode}`)
        .filter((item, i, ar) => ar.indexOf(item) === i);
      // filter unique hotel codes with its roomType
      const rooms = hotelCode.map((y) => {
        const roomTypes = x.biddingData.filter((z) => z.hotelCode === y);
        const roomType = roomTypes.map((m) => {
          return { roomType: m.roomType, expairationAt: m.expairationAt };
        });
        const uniqueRoomType = [];
        for (let roomNumber = 0; roomNumber < roomType.length; roomNumber++) {
          const elementRooms = roomType[roomNumber];
          if (uniqueRoomType.length === 0) {
            uniqueRoomType.push(elementRooms);
          } else {
            const checkFilter = uniqueRoomType.filter(
              (u) =>
                u.roomType === elementRooms.roomType &&
                utility.convertDateFormat(u.expairationAt) ===
                  utility.convertDateFormat(elementRooms.expairationAt)
            );
            if (checkFilter.length === 0) {
              uniqueRoomType.push(elementRooms);
            }
          }
        }
        return { hotelCode: y, roomType: uniqueRoomType };
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
        const rates = [];
        for (let index = 0; index < element.rates.length; index++) {
          const x = element.rates[index];
          if (
            x?.non_refundable === false &&
            x?.cancellation_policy?.under_cancellation === false
          ) {
            const newCancellationDate = utility.getDateAfterBeforeFromDate(
              x.cancellation_policy.cancel_by_date,
              config.app.CancellationDaysDifference,
              "YYYY-MM-DDTH:m:s"
            );
            x.cancellation_policy.cancel_by_date = newCancellationDate;
            const daysDifference = utility.dateDifference(
              x.cancellation_policy.cancel_by_date,
              await utility.getCurrentDateTime(),
              "days"
            );
            if (daysDifference < -2) {
              rates.push(x);
            }
          }
        }
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
          ...cityData[0],
          ...x,
          rates: x.rates.map((y) => {
            return { searchId: data.search_id, ...y };
          }),
        });
        response.push({
          search_id: data.search_id,
          ...cityData[0],
          propery_type: hotelData?.accommodationTypeSubName,
          chain_name: hotelData?.ChainName,
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

      const newRates = [];

      for (let index = 0; index < data?.hotel?.rates.length; index++) {
        const x = data?.hotel?.rates[index];
        if (
          x?.non_refundable === false &&
          x.cancellation_policy.under_cancellation === false
        ) {
          const newCancellationDate = utility.getDateAfterBeforeFromDate(
            x.cancellation_policy.cancel_by_date,
            config.app.CancellationDaysDifference,
            "YYYY-MM-DDTH:m:s"
          );
          x.cancellation_policy.cancel_by_date = newCancellationDate;
          const daysDifference = utility.dateDifference(
            x.cancellation_policy.cancel_by_date,
            await utility.getCurrentDateTime(),
            "days"
          );
          if (daysDifference < -2) {
            newRates.push(x);
          }
        }
      }

      if (newRates.length > 0) {
        data.hotel.rates = newRates;

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
      }
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

      if (
        data?.hotel?.rate?.non_refundable === false &&
        data?.hotel?.rate.cancellation_policy.under_cancellation === false
      ) {
        const newCancellationDate = utility.getDateAfterBeforeFromDate(
          data?.hotel?.rate.cancellation_policy.cancel_by_date,
          config.app.CancellationDaysDifference,
          "YYYY-MM-DDTH:m:s"
        );
        data.hotel.rate.cancellation_policy.cancel_by_date =
          newCancellationDate;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
