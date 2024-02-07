import models from "../models";
import requestHandler from "../services/requestHandler";
import GRN_Apis from "../config/GRN_Apis";
import logger from "../services/logger";
const { HotelBooking, HotelBookingDetail } = models;

export default {
  /**
   * Genrate Logger
   * @param {Object} req
   * @param {Object} status
   * @param {Object} message
   * @param {Object} apiEndUrl
   */
  async genrateGrnLogger(req, status, message, apiEndUrl) {
    try {
      const userName = req.user
        ? `${req.user.firstName} ${req.user.lastName}`
        : "Guest";
      const userId = req.user ? req.user.id : "0";

      logger.grnLogger.info(
        `${new Date()} - ${JSON.stringify(
          apiEndUrl
        )} Called get status:${status} ${
          message && message != "" ? `and message :  ${message}` : ""
        } form the User : "${userName}" and Id : ${userId}`
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  /**
   * Get Hotel Token
   * @param {Object} req
   */
  async getSessionToken() {
    try {
      // fetch token from settings
      return "63ad347002ca3e1c01eb4a3ed7c89985";
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Search
   * @param {Object} req
   */
  async search(req) {
    try {
      const bodyData = req.body;
      const _request_data = {
        rooms: bodyData.rooms,
        hotel_codes: bodyData.hotelCode,
        rates: "comprehensive",
        currency: bodyData.currency,
        client_nationality: bodyData.clientNationality,
        checkin: bodyData.checkIn,
        checkout: bodyData.checkOut,
      };
      const _response = await requestHandler.fetchResponseFromHotel(
        GRN_Apis.search,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          GRN_Apis.search
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Get Refetch
   * @param {Object} req
   */
  async refetch(req) {
    try {
      const { searchId, hotelCode } = req.body;
      const apiEndPoint = GRN_Apis.refetch(searchId, hotelCode);
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken()
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Revalidate
   * @param {Object} req
   */
  async revalidate(req) {
    try {
      const { searchId, groupCode, rateKey } = req.body;
      const _request_data = {
        group_code: groupCode,
        rate_key: rateKey,
      };
      const apiEndPoint = GRN_Apis.revalidate(searchId);
      console.log(apiEndPoint);
      const _response = await requestHandler.fetchResponseFromHotel(
        apiEndPoint,
        await this.getSessionToken(),
        _request_data
      );
      // console.log(_response);
      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          apiEndPoint
        );
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * Bookings
   * @param {Object} req
   */
  async booking(req) {
    try {
      const bodyData = req.body;
      const membersData = req.members;
      const userData = req.user;
      bodyData.roomsData = bodyData.bookingItems;
      //  Set Holder Data
      const holder = {
        title: userData.UserPersonalInformation.title,
        name: userData.firstName,
        surname: userData.lastName,
        email: userData.email,
        phone_number: `${userData.phoneNumberCountryCode}${userData.phoneNumber}`,
        client_nationality: userData.UserPersonalInformation.nationality,
      };
      if (
        userData.UserPersonalInformation.panNumber &&
        userData.UserPersonalInformation.panNumber != ""
      ) {
        holder["pan_number"] = userData.UserPersonalInformation.panNumber;
      }
      // Need to check the indian user pan card mandatary

      //  Set Booking Items
      for (let index = 0; index < bodyData.bookingItems.length; index++) {
        const e = bodyData.bookingItems[index];
        for (let i = 0; i < e.rooms.length; i++) {
          e.rooms[i].paxes = e.rooms[i].paxes.map((x, k) => {
            const paxesData = membersData.filter((item) => item.id === x)[0];
            return {
              id: paxesData.id,
              title: paxesData.title,
              name: paxesData.firstName,
              surname: paxesData.lastName,
              type: paxesData.type === "ADT" ? "AD" : "CH",
              age: e.rooms[i].ages[k],
            };
          });
          delete e.rooms[i].ages;
          // console.log(e.rooms[i]);
        }
      }

      // console.log(bodyData.booking_items[0].rooms[0].paxes);

      // Request Data
      const _request_data = {
        search_id: bodyData.searchId,
        hotel_code: bodyData.hotelCode,
        city_code: bodyData.cityCode,
        group_code: bodyData.groupCode,
        checkout: bodyData.checkOut,
        checkin: bodyData.checkIn,
        booking_name: bodyData.bookingName,
        booking_comments: bodyData.bookingComments,
        booking_items: bodyData.bookingItems,
        payment_type: "AT_WEB",
        agent_reference: "",
        holder: holder,
      };
      // console.log(_request_data);
      const _response = {
        status: 200,
        message: "Booking Done",
        data: {
          additional_info: {},
          agent_reference: "Test12345",
          booking_date: "2024-02-02T06:40:35.797293",
          booking_id: "GRN-SB-202402-1013346",
          booking_reference: "YVS1OhaUOzHp8ldi",
          checkin: "2024-02-15",
          checkout: "2024-02-16",
          currency: "INR",
          holder: {
            client_nationality: "IN",
            email: "neha.nedivatech@grnconnect.com",
            name: "Neha",
            pan_number: "CBJKK3320T",
            phone_number: "6614565589",
            surname: "test",
            title: "Mr.",
          },
          hotel: {
            address: "Cornich El Nile Street Luxor 16   Cornich El Nile Street",
            booking_items: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-02-11T23:58:59",
                  details: [
                    {
                      currency: "INR",
                      from: "2024-02-11T23:59:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "INR",
                    nights: 1,
                  },
                  under_cancellation: false,
                },
                currency: "INR",
                includes_boarding: true,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                price: 16055.0,
                rate_comments: {
                  checkin_begin_time: "2:00 PM",
                  checkin_end_time: "10:00 PM",
                  checkin_instructions:
                    "Extra-person charges may apply and vary depending on property policy. <br />Government-issued photo identification and a credit card, debit card, or cash deposit are required at check-in for incidental charges. <br />Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed.  <ul><li>No onsite parking is available. </li></ul>",
                  checkin_min_age: "18",
                  checkin_special_instructions:
                    "There is no front desk at this property. To make arrangements for check-in please contact the property ahead of time using the information on the booking confirmation.",
                  checkout_time: "11:00 AM",
                  comments: "",
                  mandatory_fees: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  policies: "",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "20.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6t4dk2ls5k6w66zwt62ngrd5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                room_code:
                  "4dfvhnz77qxcvuc33xsqkf644hl2rqvb5wz6vwds3fgrd5huc7iq",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    pax_ids: [1],
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
              },
            ],
            category: 4.0,
            city_code: "123144",
            city_name: "Luxor",
            country_code: "EG",
            country_name: "Egypt",
            description:
              "This 4 star hotel is located in the city centre of Luxor and was established in 1977. It is a short drive away from the Luxor Temple and the nearest station is Luxor. The Hotel has 3 restaurants, 4 bars, a coffee shop and an outdoor swimming pool. All 312 rooms are equipped with minibar, safe, ironing set and air conditioning.",
            geolocation: {
              latitude: 25.70537,
              longitude: 32.642642,
            },
            hotel_code: "1226007",
            name: "Eatabe Luxor Hotel",
            paxes: [
              {
                name: "Neha",
                pax_id: 1,
                surname: "test",
                title: "Mr.",
                type: "AD",
              },
            ],
            safe2stay: {
              covid_19_safe_to_stay: "Y",
              covid_19_safety_protocol:
                "https://group.accor.com/-/media/Corporate/News-images/2020/05/14/B2B-ALLSAFE.pdf",
            },
          },
          payment_status: "paid",
          payment_type: "AT_WEB",
          price: {
            breakdown: {
              net: [
                {
                  amount: 0.0,
                  amount_type: "value",
                  currency: "INR",
                  included: true,
                  name: "VAT",
                },
                {
                  amount: 16054.46,
                  amount_type: "value",
                  currency: "INR",
                  included: true,
                  name: "SupplierPrice",
                },
                {
                  amount: 16054.46,
                  amount_type: "value",
                  currency: "INR",
                  included: true,
                  name: "Total",
                },
              ],
              hotel_charges: [
                {
                  amount: 20.0,
                  amount_type: "value",
                  currency: "AED",
                  included: false,
                  mandatory: true,
                  name: "MandatoryTax",
                },
              ],
              surcharge_or_tax: [
                {
                  amount: 2890.96,
                  amount_type: "value",
                  currency: "INR",
                  included: true,
                  name: "Tax recovery charges and Service fees (Sales Tax)",
                },
              ],
            },
            total: 16055.0,
          },
          status: "confirmed",
          supports_amendment: false,
          supports_cancellation: true,
          search_id: bodyData.searchId,
        },
      };
      // await requestHandler.fetchResponseFromHotel(
      //   GRN_Apis.booking,
      //   await this.getSessionToken(),
      //   _request_data
      // );

      // console.log(_response, "_response");

      if (_response !== undefined) {
        this.genrateGrnLogger(
          req,
          _response.status,
          _response.message,
          GRN_Apis.booking,
          false
        );
        // need to add condition
        if (_response?.data?.booking_id) {
          const bookingData = {
            userId: userData.id,
            hotelCode: bodyData.hotelCode,
            cityCode: bodyData.cityCode,
            checkIn: bodyData.checkIn,
            checkOut: bodyData.checkOut,
            totalMember: bodyData.totalMember,
            isUserTravelled: bodyData.isUserTravelled,
            bookingId: _response.data.booking_id,
            bookingDate: _response.data.booking_date,
            bookingReference: _response.data.booking_reference,
            price: _response.data.price.total,
            status: _response.data.status,
            paymentStatus: _response.data.payment_status,
            cancelByDate:
              _response.data.hotel.booking_items[0].cancellation_policy
                .cancel_by_date,
            supportsCancellation: `${_response.data.supports_cancellation}`,
            searchId: _response.data.search_id,
          };
          const booking = await HotelBooking.create(bookingData);
          if (booking) {
            for (let i = 1; i <= bodyData.bookingItems.length; i++) {
              const elementI = bodyData.bookingItems[i - 1];
              for (let j = 0; j < elementI.rooms.length; j++) {
                const elementJ = elementI.rooms[j];
                const paxesIds = [];
                const ages = [];
                for (let k = 0; k < elementJ.paxes.length; k++) {
                  const elementK = elementJ.paxes[k];
                  paxesIds.push(elementK.id);
                  ages.push(elementK.age);
                }
                const hotelDetail = {
                  bookingId: booking.id,
                  roomNumber: i,
                  paxes: paxesIds.toString(","),
                  ages: ages.toString(","),
                };
                await HotelBookingDetail.create(hotelDetail);
              }
            }
          }
        }
      }
      return _response;
    } catch (error) {
      throw Error(error);
    }
  },
};
