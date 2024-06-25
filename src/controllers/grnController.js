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
      // const bodyData = req.body;
      // const hotelCodes = req.hotelCode;
      // let result = [];
      // if (bodyData.hotelCode && bodyData.hotelCode !== "") {
      //   result.push(await grnRepository.search(req));
      // } else {
      //   const chaunkArray = [],
      //     counts = 50;
      //   const arrayLenght = hotelCodes.length;
      //   const numberCount = arrayLenght / counts;
      //   const floatCount = numberCount % 1 === 0;
      //   const loopCount =
      //     floatCount === false
      //       ? parseInt(numberCount + 1)
      //       : parseInt(numberCount);
      //   let start = 0;
      //   for (let index = 0; index < loopCount; index++) {
      //     let end = start + counts;
      //     chaunkArray.push(hotelCodes.slice(start, end));
      //     start = end;
      //   }
      //   let searchPromise = chaunkArray.map(async (element) => {
      //     req.body.hotelCode = element;
      //     return await grnRepository.search(req);
      //   });
      //   try {
      //     result = await Promise.all(searchPromise);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
      // const response = result.filter((x) => x.status === 200);
      // if (response.length === 0) {
      //   utility.getError(res, "No data Found!");
      //   // } else if (response.data.errors && response.data.errors.length > 0) {
      //   //   utility.getError(
      //   //     res,
      //   //     `${response.data.errors[0].code} : ${response.data.errors[0].messages[0]}`
      //   //   );
      // } else {
      //   let dataCustomise = response.map(async (element) => {
      //     return await hotelHelper.setCountryCityName(req, element.data);
      //   });
      //   const _response = await Promise.all(dataCustomise);

      //   let _combineHotelResponse = [];
      //   for (let i = 0; i < _response.length; i++) {
      //     const ele = _response[i];
      //     _combineHotelResponse = [..._combineHotelResponse, ...ele.hotels];
      //   }

      //   const finalResponseForSent = _response[0];
      // finalResponseForSent.hotels = _combineHotelResponse;
      const finalResponseForSent = {
        count: 6,
        checkin: "2024-07-21",
        checkout: "2024-07-25",
        hotels: [
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "Hotel",
            chain_name: "Pyramisa",
            acc_type: "0",
            address:
              "Khaled Ibn El Waild Street Luxor   Khaled Ibn El Waild Street",
            category: 4.5,
            city_code: "123144",
            country: "EG",
            description:
              "This opulent hotel is ideally perched right next to mesmerizing Nile River in endowed with historical riches ancient city of Luxor. Beside the fabulous historical landmarks including the ancient Luxor Temple or Valley of the Kings, marvellous natural sceneries and luxurious facilities, this grants an unbeatable lodge for relaxation. This stunning resort greets visitors with spacious and delightfully appointed facilities and high quality service. Visitors may choose out of a wide array of room options including rooms and suites. Each unit offers magnificent d\\xc3\\xa9cor blending classical elegance with Egyptian touches to provide travellers with a sanctuary of peace and serenity. The hotel boasts 3 fabulous restaurants where guests will have the opportunity to enjoy national, Italian, Asian and international cuisines. Afterwards, Patrons may enjoy a drink from the bar, have a plunge in one of 2 sparkling pools or play tennis at the on-site court.",
            facilities:
              "Sauna ; Solarium ; Guestroom wireless internet ; Secured parking ; Pets allowed ; Public area air conditioned ; Parking ; Adjoining rooms ; Housekeeping - daily ; Wheelchair access ; Shops and commercial services ; Safe deposit box ; Currency exchange ; Conference facilities ; Room service ; Steam bath ; Massage services ; Lounges/bars ; Game room ; Elevators ; Restaurant ; Business center ; Cloakroom service ; Laundry/Valet service ; Medical Facilities Service ; Complimentary in-room coffee or tea ; Roof terrace ; 24-hour front desk ; Direct dial telephone ; Non-smoking rooms (generic) ; Hair dryer ; Children's play area",
            geolocation: {
              latitude: 25.687040137671,
              longitude: 32.630451321602,
            },
            hotel_code: "1226091",
            images: {
              main_image: "1226091/20a9b00487330ef7941e4a17c0692207.jpg",
              url: "https://images.grnconnect.com/1226091/20a9b00487330ef7941e4a17c0692207.jpg",
            },
            name: "Pyramisa Isis Luxor",
            rates: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 64,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 256,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 256,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 255.68,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 255.68,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20322|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwd5ushz7e7lutqq2s5z6aqfsswedz677soo6t2pxbvx6a3guwpref4xfabtcozb5tmoyxeiyog4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzowbketxcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4deffkrq5ircppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 74,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 293,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 293,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 292.98,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 292.98,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20322|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwdzmxhyhwleeqs5dvz6xtv54bqebuxcygq5m72pobjl6gsgusxrufwhfe5akjzj7tkoawei3ksqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujz6slshdpcpxaoo5a56dgl2aikbb",
                rate_type: "bookable",
                room_code: "4ddvlkrw5arerojf",
                rooms: [
                  {
                    description: "river view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srksuqq2s7uc3uu",
                    room_type: "river view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 75,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 299,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 299,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 298.32,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 298.32,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|18022|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwd5ushz7e7lutqq2xf56nqffvkeruxcywuonn56rgfymo3xtste4fvocadbkpzj7t4niwemy2sqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujzgslxndpcpxaoo5a56dgl2aikbb",
                rate_type: "bookable",
                room_code: "4ddvbkrs5ircppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 84,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 336,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 336,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 335.57,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 335.57,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|18022|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwdzmxhyhwleeqs4nuz57tqedbuxl3636wuc5dt6scvyoc37tx7fol4ciaja2lz4yuq4szmrfjqxidws2wpu26n5ehoogh7dal2q7y4hbloj7aachenm237beytwh7ozbfhyays2gwb7iupg4gijymajisipw5xwbhfelt7tcezfnnogruz4pzbhukcby",
                rate_type: "bookable",
                room_code: "4phvzkrr4qrcppzs2a",
                rooms: [
                  {
                    description: "river view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srksuqq2s7uc3uu",
                    room_type: "river view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 87,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 346,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 346,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 345.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 345.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd5ushz7e7luxrqzsh5gdwffsmltzxkygq5e5t7xcrunq37qwpceh4wovlayczj4d6pirem3oopkp7g6sv3tfdazrk76er23muqxu4tc36lxdo6edpp2z7zhyhw75auqcxbqzsghgb7lfdteqcjymajisipw7xkahnqrhvxhenz6vbtmdtvueo3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4pgfdkrw4yrcppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 91,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 363,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 363,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 362.19,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 362.19,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20322|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd5ushz7e7lutqq2s5z6aqfsswedz677soo6t2pxbvx6a3guwpref4wmadaqc2z6dipqvei3oaoci7g6sv3tfdazrk76er23muqxu4tc36lxdo6edpp2z7zhyhw75auqcxbqzsghgb7lfdteqcjymajisipw7xkahnqrhvxhenz6vbtmg5vwwo3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4pgvfkrx4arcppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 95,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 378,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 378,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 377.59,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 377.59,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhygglfeysffe76odqf2smedz677soo6t2pxbvx6a3guwpree4xhqntcez53tcpyvem6og4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzotb2hdxcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4pfffkrx4qrcppzs2a",
                rooms: [
                  {
                    description: "NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2szuc3uu",
                    room_type: "NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 98,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 389,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 389,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 388.4,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 388.4,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd44zn55vbbx4qqvufsonx5frqxl3677smom74hjgjkmoshssrqwtwhlr3a2iz55tioaqeiyksqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujzwwlcgdpcpxaoo5a56dgl2aikbb",
                rate_type: "bookable",
                room_code: "4pfvpkru5arerojf",
                rooms: [
                  {
                    description: "deluxe room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkscrircpwy",
                    room_type: "deluxe room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 100,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 400,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 400,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 399.14,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 399.14,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdz4in55vbbx4qqvufsonx5frqxl3677smom74hjgjkmoshssrque4wou5akizb7t6pqufqz2sqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujzwwb7mdtcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4pefjkru5arerojf",
                rooms: [
                  {
                    description: "premium room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkswtmrcpwy",
                    room_type: "premium room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 103,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 411,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 411,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 410.18,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 410.18,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20322|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhyggleeqs5dvz6xtv54bqebuxcygq5m72pobjl6gsgusxruf4snajtcezv7dcoawfu3oe4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzoqa3mt3umpo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4pefhkrs5arerojf",
                rooms: [
                  {
                    description: "NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2szuc3uu",
                    room_type: "NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 128,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 512,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 512,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 511.36,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 511.36,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20485|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwd5ushz7e7lutqq2s57onqf7smedz677soo6t2pxbvx6a3guwpref4wmaraqcyj5dgpq6em36mnydzggsv3svdexdsmvr7pdmypxz4dglmluwa34eno277bdytwx5aiwcdba7swgwbddtblowijymajisipg5xkahnqrhvxhenygqbtodzb6ro3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4lgvpkrv4qrcppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 130,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 518,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 518,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 517.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 517.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5meqog3gdzevn55vbbx4qqvufsonx5frqxl3677smom74hjgjkmoshssvfme4cme5h2jyj4dgpatfqzoa4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzorlxmtraupo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4lgvhkrq5arerojf",
                rooms: [
                  {
                    description: "Junior suite",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "towtdksvqyrcpwy",
                    room_type: "Junior suite",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 130,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 518,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 518,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 517.8,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 517.8,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd5ushz7e7luxrqzsh5gdwffsyltzxkygq5e5t7xcrunq37qwpceh42iqdb2nqv6topy6fyzoepcowogrv3tffazaqu4j7pb3urei5ha3mj7dal4upts57beyxup4autspda3s6fgh7iublprkqqmajisipw5xcahnqrhvxhenz6sbhnd5c4ephr2cdgdgh7hku2sc3r2mkbw",
                rate_type: "bookable",
                room_code: "4lgvhkrt4qrcppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 138,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 549,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 549,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 548.66,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 548.66,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20485|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwdzmxhyhwleeqs5dun57twv2rqebuxcygq5m72pobjl6gsgusxruf4sifhtcfyn4dgoyrfu36g4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzowblmtxbupo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4lfvhkrq5ircppzs2a",
                rooms: [
                  {
                    description: "river view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srksuqq2s7uc3uu",
                    room_type: "river view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 138,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 551,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 551,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 550.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 550.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhygglfeysffe76odqf7smedz677soo6t2pxbvx6a3guwpreb4gmanbac2z7d4oirei26ip2ewogrv3tffazaqu4j7pb3urei5ha3mj7dal4upts57beyxup4autspda3s6fgh7iublprkqqmajisipw5xcahnqrhvxhenz6sbhndtb4eplskcdgdgh7hku2sc3r2mkbw",
                rate_type: "bookable",
                room_code: "4lfvzkrq5ircppzs2a",
                rooms: [
                  {
                    description: "NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2szuc3uu",
                    room_type: "NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 141,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 561,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 561,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 561,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 561,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd44zn55vbbx4qqvufsohx5frqxl3677smom74hjgjkmoshss3tue4pgu5bsmzb3deoyxf4yksqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujy62b7pgtcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4lefdkrr4arcppzs2a",
                rooms: [
                  {
                    description: "deluxe room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkscrircpwy",
                    room_type: "deluxe room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 143,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 572,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 572,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 571.73,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 571.73,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdz4in55vbbx4qqvufsohx5frqxl3677smom74hjgjkmoshss3tue4kou5acezv7deoqrfe32sqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujy62b7pttcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4levnkrr4arcppzs2a",
                rooms: [
                  {
                    description: "premium room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkswtmrcpwy",
                    room_type: "premium room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 162,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 648,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 648,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 647.26,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 647.26,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd5ushz7e7luxrqzsh5gdwffseltzxkygq5e5t7xcrunq37qwpceh4omqdu2jqv7dcoqvfayognsiwwgrv3tffazaqu4j7pb3urei5ha3mj7dal4upts57beyxup4autspda3s6fgh7iublprkqqmajisipw5xcahnqrhvxhenz6sbhndxa4efxt2cdgdgh7hku2sc3r2mkbw",
                rate_type: "bookable",
                room_code: "4xgflkr74qrcppzs2a",
                rooms: [
                  {
                    description: "classic room city view",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkshqe2v5pc3v2na",
                    room_type: "classic room city view",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 168,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 672,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 672,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 671.13,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 671.13,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20322|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhzxezlutqq2s5z6aqfsswedz677soo6t2pxbvx6a3guwpref4wmfncqc2z7dmpqsfy266p2ewsgrv3tffazaqu4j7pb3urei5ha3mj7dal4upts57beyxup4autspda3s6fgh7iublprkqqmajisipw5xcahnqrhvxhenz6sbhnd5b4ef3t2cdgdgh7hku2sc3r2mkbw",
                rate_type: "bookable",
                room_code: "4xgvhkrt4arcppzs2a",
                rooms: [
                  {
                    description: "SUPERIOR NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2u5p23v2na",
                    room_type: "SUPERIOR NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 170,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 680,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 680,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 679.67,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 679.67,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhygglfeysffe76odqfysmedz677soo6t2pxbvx6a3guwpref5wmffuaczf4d6naqfq26k4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzosa3mw7umpo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4xffpkrw5ircppzs2a",
                rooms: [
                  {
                    description: "NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2szuc3uu",
                    room_type: "NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 173,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 691,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 691,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 690.46,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 690.46,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5meqog3gdzevn55vbbx4qqvufsohx5frqxl3677smom74hjgjkmoshsstfmew2nu5h2nzv5tina6em66ioadzggsv3svdexdsmvr7pdmypxz4dglmluwa34eno277bdytwx5aiwcdba7swgwbddtblowijymajisipg5xkahnqrhvxhenygqb2ftzueho3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4xfvjkrx4arcppzs2a",
                rooms: [
                  {
                    description: "Junior suite",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "towtdksvqyrcpwy",
                    room_type: "Junior suite",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 173,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 691,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 691,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 690.46,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 690.46,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwd44zn55vbbx4qqvufsojx5frqxl3677smom74hjgjkmoshsstfmew2nu5h2nzz6tgpy7fqy6aoidzggsv3svdexdsmvr7pdmypxz4dglmluwa34eno277bdytwx5aiwcdba7swgwbddtblowijymajisipg5xkahnqrhvxhenygqb2ftzueho3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4xfvjkrx4arcppzs2a",
                rooms: [
                  {
                    description: "deluxe room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkscrircpwy",
                    room_type: "deluxe room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 176,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 702,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 702,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 701.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 701.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdz4in55vbbx4qqvufsojx5frqxl3677smom74hjgjkmoshsstfmew2ie5a2ozj5tooqxfe36m4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzoslxmw5cupo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4xfvhkrx4arcppzs2a",
                rooms: [
                  {
                    description: "premium room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crkswtmrcpwy",
                    room_type: "premium room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 179,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 714,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 714,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 713.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 713.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|18022|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejmwxwdzmxhzxezlutqq2xf56nqffvkeruxcywuonn56rgfymo3xtstree5xlqda2nzr4dkpqrfa3ksqid7ggrvx2jfbhqcmvurw6l2n7u4dc4gkuxa6gujo2r7jgirxpwaqsclbqys36apddrpo4gijymajjsipw5xkahnqrhvxeujzosb6gdzcmpb2o5i7oaht6xwkbknm",
                rate_type: "bookable",
                room_code: "4xefdkrv4arcppzs2a",
                rooms: [
                  {
                    description: "SUPERIOR NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qk4srksuqq2u5p23v2na",
                    room_type: "SUPERIOR NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 179,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 714,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 714,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 713.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 713.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|18022|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhzxezlutqq2xf56nqffvkeruxcywuonn56rgfymo3xtstree5xlr3acmzr7dmpaufu3oo4jt7ggsvxsuaqbhir6erpalam755hc3mw7ho2eufpkz6bgyrwx2bytchaq3s2grdgtfd24gijymajismpw5xkahnqrhvxhedzoqb3mwtaupo2ini6okh7zxevzkmclq",
                rate_type: "bookable",
                room_code: "4xefdkrv4arcppzs2a",
                rooms: [
                  {
                    description: "SUPERIOR NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2u5p23v2na",
                    room_type: "SUPERIOR NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 205,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 820,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 820,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 819.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 819.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5meqog3gdzevn55vbbx4qqvufsojx5frqxl3677smom74hjgjkmoshssvquh4spu5h2nyj3d6nirfi3oeoqdzggsv3svdexdsmvr7pdmypxz4dglmluwa34eno277bdytwx5aiwcdba7swgwbddtblowijymajisipg5xkahnqrhvxhenygqbxod7audo3uns6oogxyhyxsvmcok2",
                rate_type: "bookable",
                room_code: "4tgvbkrt4arcppzs2a",
                rooms: [
                  {
                    description: "Junior suite",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "towtdksvqyrcpwy",
                    room_type: "Junior suite",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 232,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 927,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 927,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 926.81,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 926.81,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20485|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5me6mcxwdzmxhzxezlutqq2s57onqf7smedz677soo6t2pxbvx6a3guwpref4wnvfcqczj7dknitfqyoen2j7g6sv3tfdazrk76er23muqxu4tc36lxdo6edpp2z7zhyhw75auqcxbqzsghgb7lfdteqcjymajisipw7xkahnqrhvxhenz6vbtmttamaf7ukc5gogh5h6uc4d6okmiy",
                rate_type: "bookable",
                room_code: "47hfbkru5arerojf",
                rooms: [
                  {
                    description: "SUPERIOR NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2u5p23v2na",
                    room_type: "SUPERIOR NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 1349,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 5395,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 5395,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 5394.11,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 5394.11,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejo6vgdbuwhz7sxluxrqzsh5gdwffsmltzxkygq5e5t7xcrunq37qwpceh42mvjua7qvrdooysem2oapsowhcsvxtffabastvfw23m6neosxglelxkakgdnprm7rhy3wpwaqtsbaarswggp7quppeqgvtjajisipw5xkbhnqrhvxhenz6sb3pt7aeffcypqdf3ht7hcwkrddvnskb5ey",
                rate_type: "bookable",
                room_code: "4lfvlmri4yqcpubuy7xq",
                rooms: [
                  {
                    description: "TWO BEDROOM NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qkvs3krxqu2v7wc3v2na",
                    room_type: "TWO BEDROOM NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 1392,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 5567,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 5567,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 5566.7,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 5566.7,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejo6vgdbuwhz7sxluxrqzsh5gdwffsyltzxkygq5e5t7xcrunq37qwpceh4wmvlaayqvrdooywfqyoensewggrv3tffazaqu4j7pb3urei5ha3mj7dal4upts57beyxup4autspda3s6fgh7iublprkqqmajisipw5xcahnqrhvxhenz6sbhnd3a6qp23kcdgdgh7hku2sc3r2mkbw",
                rate_type: "bookable",
                room_code: "4lefnpji4ircppzs2a",
                rooms: [
                  {
                    description: "TWO BEDROOM NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qkvs3krxqu2v7wc3v2na",
                    room_type: "TWO BEDROOM NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Full Board"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-16T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 1425,
                      from: "2024-07-17T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 5697,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5p6w2ow",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 5697,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 5696.17,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 5696.17,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  comments:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel. 138|20993|0.",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht73vcr5mejo6vgdbuwhz7sxluxrqzsh5gdwffseltzxkygq5e5t7xcrunq37qwpceh46ivlcsnqv5daniqfuzocpcn7g6sv3tfdazrk76er23muqxu4tc36lxdo6edpp2z7zhyhw75auqcxbqzsghgb7lfdteqcjymajisipw7xkahnqrhvxhenz6vbtndlvunpxukc5gogh5h6uc4d6okmiy",
                rate_type: "bookable",
                room_code: "4levlnzi4yrcppzs2a",
                rooms: [
                  {
                    description: "TWO BEDROOM NILE VIEW",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "qkvs3krxqu2v7wc3v2na",
                    room_type: "TWO BEDROOM NILE VIEW",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {},
            supp_cards: ["MC", "VI"],
          },
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "Hotel",
            chain_name: "",
            acc_type: "0",
            address: "Cornich El Nile Street Luxor 16   Cornich El Nile Street",
            category: 4,
            city_code: "123144",
            country: "EG",
            description:
              "This 4 star hotel is located in the city centre of Luxor and was established in 1977. It is a short drive away from the Luxor Temple and the nearest station is Luxor. The Hotel has 3 restaurants, 4 bars, a coffee shop and an outdoor swimming pool. All 312 rooms are equipped with minibar, safe, ironing set and air conditioning.",
            facilities:
              "Pets allowed ; Restaurant ; Business center ; Secured parking ; Public area air conditioned ; Parking ; Adjoining rooms ; Wheelchair access ; Shops and commercial services ; Safe deposit box ; Currency exchange ; 24-hour front desk ; Direct dial telephone ; Non-smoking rooms (generic) ; Beauty shop/salon ; Lounges/bars ; Elevators",
            geolocation: {
              latitude: 25.70537,
              longitude: 32.642642,
            },
            hotel_code: "1226007",
            images: {
              main_image: "1226007/21db4a24f06a87007e0e61e94b2c7406.jpg",
              url: "https://images.grnconnect.com/1226007/21db4a24f06a87007e0e61e94b2c7406.jpg",
            },
            name: "Eatabe Luxor Hotel",
            rates: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 408,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 407.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 407.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 73.3,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6t4dk2ls5k6w66zwt62nabv5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4pefdkrv4yrcppzs2ciw2h6q4xgkzrnc7g663tdq3q",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6t4dk2ls5k6w66zwt62nabu",
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 408,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 407.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 407.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 73.3,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4lj2ls5k6w66zwt73jgbz5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4pefdkrv4yrcppzs2ciw2h6q4xgkzrnc7g663tdq3q",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4lj2ls5k6w66zwt73jgby",
                    room_type: "Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 454,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 81.55,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6t4dk2ls5k6w66zwt62nbbd5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4pdvdkrv44rcppzs2ciw2h674xgkzrfc7g6o3tdy",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6t4dk2ls5k6w66zwt62nbbc",
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 454,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 81.55,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusmw6got4lkkls5k6w66zwt73fbb75xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4pdvdkrv44rcppzs2ciw2h674xgkzrfc7g6o3tdy",
                rooms: [
                  {
                    description: "Room, 1 King Bed, Sea View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmw6got4lkkls5k6w66zwt73fbb6",
                    room_type: "Room, 1 King Bed, Sea View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 454,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 453.05,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 81.55,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusmw6got4lk2ls5k6w66zwt73bbbx5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4pdvdkrv44rcppzs2ciw2h674xgkzrfc7g6o3tdy",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds, Sea View (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmw6got4lk2ls5k6w66zwt73bbbw",
                    room_type: "Room, 2 Twin Beds, Sea View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "value",
                  cancel_by_date: "2024-07-17T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      flat_fee: 134,
                      from: "2024-07-18T00:00:00",
                    },
                  ],
                  no_show_fee: {
                    amount_type: "value",
                    currency: "AUD",
                    flat_fee: 536,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "xgirbylkwb6xtgj647fdssmex6nkls5o6s2o4",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                payment_type: ["AT_WEB"],
                price: 536,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 535.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 535.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                },
                rate_comments: {
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                },
                rate_key:
                  "4phfnmbw4uvczfstusmwghor4ll6hjxe6k3olht63rcrxme6mcxwdzmxhzxezlusqjfez5g52adfyqklrhjwub5b2pxglyobshtwlcx3swmqntaczf7tmpi6fj5pupslwtawlibimfehg75zw357osmcqkf3kwhaoh4uvpsy6bhivlp3omqchaqzt6hgf7yrok5wkiapajivkwnm36ahnqrhvxhejz6sb3md3a4fptrkybfudwaaw4jkmdsngxkmk2bbt7iliplq",
                rate_type: "bookable",
                room_code: "4lffzkr74arcppzs2a",
                rooms: [
                  {
                    description: "Superior Nile View Room",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "sw6crksuqq2u5p23v2na",
                    room_type: "Superior Nile View Room",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 592,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 591.15,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 591.15,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 106.44,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4dj2ls5k6w66zwt62jgbx5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldfdkrv5ircppzs2ciw2hw64xgkzsnc7g2ozvlg35dq",
                rooms: [
                  {
                    description: "Club Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4dj2ls5k6w66zwt62jgbw",
                    room_type: "Club Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 592,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 591.15,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 591.15,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 106.44,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4hikls5k6w66zwt73ngr35xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldfdkrv5ircppzs2ciw2hw64xgkzsnc7g2ozvlg35dq",
                rooms: [
                  {
                    description: "Club Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4hikls5k6w66zwt73ngr2",
                    room_type: "Club Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 610,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 609.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 609.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 109.84,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6t4dk2ls5l7k267vly3fgb55xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldvhkrs5ircppzs2ciw2hw747gkxsnc7g2o7u3g3jga",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6t4dk2ls5l7k267vly3fgb4",
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 610,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 609.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 609.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 109.84,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4lj2ls5l7k267vly3bcr35xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldvhkrs5ircppzs2ciw2hw747gkxsnc7g2o7u3g3jga",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4lj2ls5l7k267vly3bcr2",
                    room_type: "Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 656,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 655.69,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 655.69,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 118.1,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusmw6got4lkkls5l7k267vly3bdbv5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xgfhkrs44rcppzs2ciw2gou47gkxrfc7g2o5utg3fgq",
                rooms: [
                  {
                    description: "Room, 1 King Bed, Sea View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmw6got4lkkls5l7k267vly3bdbu",
                    room_type: "Room, 1 King Bed, Sea View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 656,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 655.69,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 655.69,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 118.1,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusmw6got4lk2ls5l7k267vly3bdbd5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xgfhkrs44rcppzs2ciw2gou47gkxrfc7g2o5utg3fgq",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds, Sea View (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmw6got4lk2ls5l7k267vly3bdbc",
                    room_type: "Room, 2 Twin Beds, Sea View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 748,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 747.75,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 747.75,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 134.61,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4dj2ls5l7k267vly3fgrb5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xdfhkrs4urcppzs2ciw2go647gkxrvc7g2otwtg3zbq",
                rooms: [
                  {
                    description: "Club Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4dj2ls5l7k267vly3fgra",
                    room_type: "Club Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only", "Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free WiFi",
                  "Free self parking",
                  "Free dinner",
                ],
                payment_type: ["AT_WEB"],
                price: 748,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 747.75,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 747.75,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 134.61,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "Room OnlyBed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcrusngcg6q4hikls5l7k267vly3bcbd5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xdfhkrs4urcppzs2ciw2go647gkxrvc7g2otwtg3zbq",
                rooms: [
                  {
                    description: "Club Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngcg6q4hikls5l7k267vly3bcbc",
                    room_type: "Club Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645hj27qfo6y",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: ["Free WiFi", "Free self parking"],
                payment_type: ["AT_WEB"],
                price: 868,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 867.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 867.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 156.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Member’s price: 10%"],
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5dhvjnjq44rcpwcruwmgohos5hlkls5k6w66zwt735abd5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4tefdkrt4arcppzs2ciw2ggq4xgkvq5c7g2ovudg3bbq",
                rooms: [
                  {
                    description: "Suite, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwmgohos5hlkls5k6w66zwt735abc",
                    room_type: "Suite, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {
              covid_19_safe_to_stay: "Y",
              covid_19_safety_protocol:
                "https://group.accor.com/-/media/Corporate/News-images/2020/05/14/B2B-ALLSAFE.pdf",
            },
            supp_cards: ["MC", "VI"],
          },
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "Hotel",
            chain_name: "Sonesta Ho",
            acc_type: "0",
            address: "Corniche El Nile Street Luxor   Corniche El Nile Street",
            category: 5,
            city_code: "123144",
            country: "EG",
            description:
              "This hotel is located on the east bank of the River Nile. It is about 12 km from Luxor International Airport. All major spots can be easily reached within few minutes by car. The modern building comprises a total of 224 luxurious rooms. Facilities on offer here include a caf\\xc3\\xa9, a kids' club and a conference room. Guests can taste international specialties from 10 different restaurants with air-conditioning. Room service and a car park are also available. The accommodation units are well-equipped as standard. All rooms feature either a balcony or terrace with views over the Nile. In addition, all rooms are equipped with fire safety features and electronic locks. Leisure facilities include a swimming pool with a separate area for children, a fitness centre and an extensive spa area.",
            facilities:
              "Sauna ; Water sports ; Secured parking ; Pets allowed ; Public area air conditioned ; Adjoining rooms ; Parking ; Wheelchair access ; Shops and commercial services ; Exercise gym ; Aerobics instruction ; Currency exchange ; Room service ; Fitness center ; Steam bath ; Massage services ; Lounges/bars ; Restaurant ; Roof terrace ; Horseback riding ; 24-hour front desk ; Direct dial telephone ; Hair dryer ; Beauty shop/salon ; Conference facilities",
            geolocation: {
              latitude: 25.688669278854,
              longitude: 32.631419599056,
            },
            hotel_code: "1226107",
            images: {
              main_image: "1226107/2e7269e08463966f9a60f28bd3beb66f.jpg",
              url: "https://images.grnconnect.com/1226107/2e7269e08463966f9a60f28bd3beb66f.jpg",
            },
            name: "Sonesta St. George",
            rates: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 522,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 521.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 521.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 93.98,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu4xj2ls5k6o26rvt23ncbd5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4lffjkru4mrcppzs2ciw2hws4dgk3qfc7g3ortd63q",
                rooms: [
                  {
                    description: "Superior Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu4xj2ls5k6o26rvt23ncbc",
                    room_type: "Superior Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 522,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 521.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 521.86,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 93.98,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu5di2ls5k6o26rvt23jdrb5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4lffjkru4mrcppzs2ciw2hws4dgk3qfc7g3ortd63q",
                rooms: [
                  {
                    description:
                      "Superior Twin Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu5di2ls5k6o26rvt23jdra",
                    room_type: "Superior Twin Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 604,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 603.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 603.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 108.71,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu4xj2ls5k6ozorvty3ngrt5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldvpkrt4urcppzs2ciw2hw74pgkvrvc7gy6ztd23y",
                rooms: [
                  {
                    description: "Superior Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu4xj2ls5k6ozorvty3ngrs",
                    room_type: "Superior Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 604,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 603.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 603.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 108.71,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu5di2ls5k6ozorvty3ngrb5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4ldvpkrt4urcppzs2ciw2hw74pgkvrvc7gy6ztd23y",
                rooms: [
                  {
                    description:
                      "Superior Twin Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu5di2ls5k6ozorvty3ngra",
                    room_type: "Superior Twin Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 696,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 695.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 695.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 125.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Half Board",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu4xj2ls5k6g36zut62ncb35xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xfvpkrt5mrcppzs2ciw2got4pgkvsfc7gy6vtd534",
                rooms: [
                  {
                    description: "Superior Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu4xj2ls5k6g36zut62ncb2",
                    room_type: "Superior Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Half Board"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 696,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 695.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 695.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 125.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Half Board",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusnw4ggu5di2ls5k6g36zut62ncrz5xachkhza7qfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4xfvpkrt5mrcppzs2ciw2got4pgkvsfc7gy6vtd534",
                rooms: [
                  {
                    description:
                      "Superior Twin Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusnw4ggu5di2ls5k6g36zut62ncry",
                    room_type: "Superior Twin Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 727,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 726.44,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 726.44,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 130.81,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpw2zu2jg4hw45llkzrfa6oy6pwd33rdrv7padcddpr5eo5khrdnduqlwpui",
                rate_type: "recheck",
                room_code: "4xevpkrt5ircppzs2ciw2gor4pgkvsnc7gy6jtd63i",
                rooms: [
                  {
                    description: "Family Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "4dcf5nb45arcpw2zu2jg4hw45llkzrfa6oyq",
                    room_type: "Family Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 768,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 767.41,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 767.41,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 138.18,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpwcrusngmh6x43kkls5k6ozorvty3nbrx5xachkhzbpqfedxzkvbuabwpvgqr5lbiblb",
                rate_type: "recheck",
                room_code: "4thfjkru5ircppzs2ciw2ggw4dgk3snc7gyo7td43a",
                rooms: [
                  {
                    description: "Executive Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusngmh6x43kkls5k6ozorvty3nbrw",
                    room_type: "Executive Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644xikvq5l6q",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 809,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 808.36,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 808.36,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 145.6,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4tgfdnrv4urcpw2zu2jg4hw45lik7rvn66263wty2fhbx67jcdjhldnenngxznvyuq4hzvh7srjq",
                rate_type: "recheck",
                room_code: "4tgffkr75ircppzs2ciw2ggu43gknsnc7gyortd23a",
                rooms: [
                  {
                    description: "Family Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference: "4dcf5nb45arcpw2zu2jg4hw45lik7rvn66263wty",
                    room_type: "Family Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {},
            supp_cards: ["MC", "VI"],
          },
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "Hotel",
            chain_name: "Jaz Hotel ",
            acc_type: "0",
            address:
              "Khaled Ebn El Waleed Street Luxor   Khaled Ebn El Waleed Street",
            category: 4,
            city_code: "123144",
            country: "EG",
            description:
              "This attractive hotel is beautifully situated directly beside the River Nile, over which wonderful views may be enjoyed. It is only 500 m from the centre of Luxor.  The 5-storey hotel comprises a total of 185 rooms of which 100 are superior rooms. Guests are welcomed in an inviting lobby with a 24-hour reception desk, safe and money exchange service. Further facilities include shops, a hairdressing salon, conference rooms, Internet access, a cosy bar and a restaurant, which is particularly inviting with its typical national specialities. Lovely views are to be had out over the river, its West Bank and the distant Thebes Hills from the restaurant and pool. Room and laundry services as well as medical assistance are also available.  The rooms offer modern comfort, a unique feeling of spaciousness and contemporary d\\xc3\\xa9cor for both business and leisure travellers. All feature an en suite bathroom, a direct dial telephone, hire safe, Internet access and balcony. Further services with a charge are a hairdryer, minibar, TV with satellite channels and air conditioning. The standard rooms overlook the lobby, superior rooms overlook the street and superior rooms overlook the River Nile. Non-smoking rooms are available upon request.  There is an outdoor swimming pool from which wonderful views may also be enjoyed out over the River Nile and its West Bank, a pool bar, sun loungers, parasols and massage service. Also, there is a children's playground, table tennis and billiards. All services carry an extra charge.  The hotel offers a breakfast buffet. Lunch and dinner can be taken \\xc3\\xa0 la carte or as a set menu.",
            facilities:
              "Wakeup service ; Children's play area ; Guestroom wireless internet ; Pets allowed ; Secured parking ; Lounges/bars ; Public area air conditioned ; Adjoining rooms ; Parking ; Water sports ; Wheelchair access ; Shops and commercial services ; Safe deposit box ; Currency exchange ; Room service ; 24-hour front desk ; Poolside snack bar ; Game room ; Massage services ; Elevators ; Guestroom wired internet ; Restaurant ; Horseback riding ; Laundry/Valet service ; Roof terrace ; Medical Facilities Service ; Golf ; Direct dial telephone ; Non-smoking rooms (generic) ; Hair dryer ; Beauty shop/salon ; Conference facilities",
            geolocation: {
              latitude: 25.694707058817,
              longitude: 32.63522028923,
            },
            hotel_code: "1226037",
            images: {
              main_image: "1226037/32a004d0004ab4e220cb5740d6410c49.jpg",
              url: "https://images.grnconnect.com/1226037/32a004d0004ab4e220cb5740d6410c49.jpg",
            },
            name: "Iberotel Luxor",
            rates: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 818,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 817.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 817.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 147.18,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2vs5c6c66xw333fgr76xaddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4tgvnkr744rcppzs2ciw2ggv4lgknrfc7g66ltdr3q",
                rooms: [
                  {
                    description: "Deluxe Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pl2ls5l7oz6jul22jbr4",
                    room_type: "Deluxe Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 818,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 817.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 817.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 147.18,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ts5c6c66xw333fgrb7haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4tgvnkr744rcppzs2ciw2ggv4lgknrfc7g66ltdr3q",
                rooms: [
                  {
                    description: "Deluxe Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pkkls5l7oz6jul22jgbq",
                    room_type: "Deluxe Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Breakfast buffet",
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 920,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 919.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 919.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 165.65,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2vs5c6c66xwt43jdbv77addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4tdv3krq4urcppzs2ciw2gg75hgktrvc7gz65td33e",
                rooms: [
                  {
                    description: "Deluxe Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pl2ls5l7oz6lvtz3fdbw",
                    room_type: "Deluxe Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 948,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 948,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 948,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 170.73,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2rs5c6c66xw333fgrb6haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47hvzkrw4mrcppzs2ciw2g6x5dgk7qfc7g2o3ulg3jgq",
                rooms: [
                  {
                    description:
                      "Deluxe Room, 1 King Bed, City View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pk2ls5l7oz6jul22jgby",
                    room_type: "Deluxe Room, 1 King Bed, City View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 962,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 961.82,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 961.82,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 173.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2vs5c6gzo3ut52ncb577addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47gfhkrw4arcppzs2ciw2g6u47gk7q5c7gz6xtd23e",
                rooms: [
                  {
                    description: "Deluxe Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pl2ls5k6s263v3q3nbbw",
                    room_type: "Deluxe Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 962,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 961.82,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 961.82,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 173.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ts5c6gzo3ut52ncb56haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47gfhkrw4arcppzs2ciw2g6u47gk7q5c7gz6xtd23e",
                rooms: [
                  {
                    description: "Deluxe Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pkkls5k6s263v3q3nbby",
                    room_type: "Deluxe Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 992,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 991.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 991.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 178.54,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ps5c6c66xw333fgrb67addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47fffkrv4qrcppzs2ciw2g6s43gkzr5c7g2o3vlg2jda",
                rooms: [
                  {
                    description: "Club Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pnkls5l7oz6jul22jgb6",
                    room_type: "Club Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 992,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 991.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 991.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 178.54,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ns5c6c66xw333fgrd7haddihrbhseudshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47fffkrv4qrcppzs2ciw2g6s43gkzr5c7g2o3vlg2jda",
                rooms: [
                  {
                    description: "Club Room, 1 Twin Bed (1 Twin Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pn2ls5l7oz6jul22jgrq",
                    room_type: "Club Room, 1 Twin Bed 1 Twin Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Breakfast buffet",
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1065,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1064.12,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1064.12,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 191.64,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ts5c6gzo3ut52jdrz7haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47dvpkrr4mrcppzs2ciw2g674pgkrqfc7gzo5td23u",
                rooms: [
                  {
                    description: "Deluxe Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pkkls5k6s263v3r3babq",
                    room_type: "Deluxe Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "percent",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      percent: 100,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "percent",
                    currency: "AUD",
                    percent: 100,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1079,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1078.42,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1078.42,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 194.16,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743lkxs5c6c66xw333fgr36paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43hfpkrw4ercppzs2ciw2gww4pgk7qvc7g2ozvlg3bbq",
                rooms: [
                  {
                    description: "Apartment, 1 Bedroom (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4tlkls5l7oz6jul22jar2",
                    room_type: "Apartment, 1 Bedroom 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Breakfast buffet",
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1094,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1093.85,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1093.85,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 197.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2ps5c6c66xwt43jdbv5haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43hvpkrw5mrcppzs2ciw2gwx4pgk7sfc7gzortd33a",
                rooms: [
                  {
                    description: "Club Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pnkls5l7oz6lvtz3fdba",
                    room_type: "Club Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf645dk2nrvl6g3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1116,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1115.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1115.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 200.84,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "5hev3mzv4avspuctuwogeho743i2rs5c6gzo3ut52ncb56paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43gfhkrw4urcppzs2ciw2gwu47gk7rvc7gzoxtd73q",
                rooms: [
                  {
                    description:
                      "Deluxe Room, 1 King Bed, City View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquopgofgq4pk2ls5k6s263v3q3nbb2",
                    room_type: "Deluxe Room, 1 King Bed, City View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {
              covid_19_safe_to_stay: "Y",
              covid_19_safety_protocol:
                "This property advises that enhanced cleaning and guest safety measures are currently in place.<br>Property is officially certified under regional sanitization guidelines.<br>",
            },
            supp_cards: ["MC", "VI"],
          },
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "Resort",
            chain_name: "",
            acc_type: "0",
            address: "Awameya Road Kings Island Luxor  Awameya Road",
            category: 5,
            city_code: "123144",
            country: "EG",
            description:
              "This 5 star hotel is located in the suburbs of Luxor and was established in 1985. It is a short drive away from the Luxor Temple and the nearest station is The idyllic. The Hotel has 2 restaurants, 2 bars, a conference room, a coffee shop, an outdoor swimming pool and a fitness centre/gym. All 647 rooms are equipped with hairdryer and air conditioning.",
            facilities:
              "Pets allowed ; Sauna ; Water sports ; Secured parking ; Public area air conditioned ; Adjoining rooms ; Wheelchair access ; Shops and commercial services ; Safe deposit box ; Exercise gym ; Currency exchange ; Room service ; Poolside snack bar ; Parking ; Lounges/bars ; Massage services ; Elevators ; Restaurant ; Business center ; Roof terrace ; Cloakroom service ; Golf ; Bicycle rentals ; 24-hour front desk ; Direct dial telephone ; Non-smoking rooms (generic) ; Hair dryer ; Beauty shop/salon ; Children's play area",
            geolocation: {
              latitude: 25.666705421428,
              longitude: 32.620044350624,
            },
            hotel_code: "1226039",
            images: {
              main_image: "1226039/543ea29533a42e201bf1fd4bebc027ef.jpg",
              url: "https://images.grnconnect.com/1226039/543ea29533a42e201bf1fd4bebc027ef.jpg",
            },
            name: "Maritim Jolie Ville Kings Island Luxor",
            rates: [
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 945,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 170.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctusnwmfg64pj2ts5c6c663vdr2jabr6paddihrbhseudshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47hvdkrq4qrcppzs2ciw2g6x4xgktr5c7gzo7tdy3a",
                rooms: [
                  {
                    description: "Classic Room (1 Twin Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng4fov4hkkls5l7o26xw3r35cb2",
                    room_type: "Classic Room 1 Twin Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 945,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 170.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctuwngkhgx4lj2ns5c6c663vdr2jbrt7paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47hvdkrq4qrcppzs2ciw2g6x4xgktr5c7gzo7tdy3a",
                rooms: [
                  {
                    description: "Classic Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquwmwmhgu4hn2ls5l7o26xw3r3rcrs",
                    room_type: "Classic Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 945,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 944.39,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 170.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctuwngkhgx4lik5s5c6c663vly3narb5haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47hvdkrq4qrcppzs2ciw2g6x4xgktr5c7gzo7tdy3a",
                rooms: [
                  {
                    description: "Classic Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquwmwmhgu4lj2ls5l7o26vuty3zgba",
                    room_type: "Classic Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1011,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1010.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1010.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 181.97,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctuwngkhgx4lik7s5c6c663vdr2jar36paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47fv3krw5arerojfv2iwcgg773jkls5p6sv6y",
                rooms: [
                  {
                    description:
                      "Classic Room, 1 King Bed (Waterfront View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquwmwmhgu4ljkls5l7o26xw3r3zar2",
                    room_type:
                      "Classic Room, 1 King Bed Waterfront View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1011,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1010.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1010.87,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 181.97,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctuwngkhgx4lik3s5c6c663vdr2jbrt67addihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47fv3krw5arerojfv2iwcgg773jkls5p6sv6y",
                rooms: [
                  {
                    description:
                      "Classic Room, 2 Twin Beds (Waterfront View) (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquwmwmhgu4likls5l7o26xw3r3rcr6",
                    room_type:
                      "Classic Room, 2 Twin Beds Waterfront View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1024,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1023.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1023.22,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 184.27,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctusnwmfg64pj2ts5c6c663vl43vdb35paddihrbhseudshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "47efhkrw44rcppzs2ciw2g6q47gk7rfc7g2o7w3g2ncq",
                rooms: [
                  {
                    description: "Classic Room (1 Twin Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng4fov4hkkls5l7o26vvt63farc",
                    room_type: "Classic Room 1 Twin Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: true,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1078,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1077.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1077.48,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 194.03,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                promotions_details: ["Save 35%", null],
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctusnwkhgu4pk2ts5c6c663vdr2jgrz5haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43hfnkrs4arcppzs2ciw2gww4lgkxq5c7g667td234",
                rooms: [
                  {
                    description:
                      "Classic Room, 1 King Bed (Burj Khalifa View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmwmh6v47kkls5l7o26xw3r2jaba",
                    room_type:
                      "Classic Room, 1 King Bed Burj Khalifa View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1126,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1125.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1125.52,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 202.69,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctuwngkhgx4lik7s5c6c663vl43vdbv77addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43gvpkrr4yrcppzs2ciw2gwv4pgkrrnc7g2otudg3rga",
                rooms: [
                  {
                    description:
                      "Classic Room, 1 King Bed (Waterfront View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcquwmwmhgu4ljkls5l7o26vvt63fdbw",
                    room_type:
                      "Classic Room, 1 King Bed Waterfront View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Breakfast for 2",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1208,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1207.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1207.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 217.35,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctusnwmfg64pj2ts5c6c663vl43vdbr6haddihrbhseudshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "43dfhkrw44rcppzs2ciw2gw647gk7rfc7g2orulg3jcq",
                rooms: [
                  {
                    description: "Classic Room (1 Twin Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng4fov4hkkls5l7o26vvt63fcby",
                    room_type: "Classic Room 1 Twin Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hk2zsnn6s3a",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1228,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1227.8,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1227.8,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 221.1,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4devppbt4uvspuctusnwkhgu4pk2ts5c6c663vl43vdrx77addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "5hhfjkrs4arcppzs2ciw2fow4dgkxq5c7g2orv3g3raa",
                rooms: [
                  {
                    description:
                      "Classic Room, 1 King Bed (Burj Khalifa View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusmwmh6v47kkls5l7o26vvt63bdrw",
                    room_type:
                      "Classic Room, 1 King Bed Burj Khalifa View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {
              covid_19_safe_to_stay: "Y",
              covid_19_safety_protocol:
                "This property advises that enhanced cleaning and guest safety measures are currently in place.<br>Property is officially certified under regional sanitization guidelines.<br>",
            },
            supp_cards: ["MC", "VI"],
          },
          {
            search_id: "3vbcganakpsjhbd5b7lvqeztam",
            cityName: "Luxor",
            countryName: "Egypt",
            propery_type: "",
            chain_name: "",
            acc_type: "0",
            address: "Youssef Hassan Street Luxor   Youssef Hassan Street",
            category: 3,
            city_code: "123144",
            country: "EG",
            description:
              "This 3 star hotel is located in the city centre of Luxor and was established in 1992.",
            facilities:
              "Nightclub ; Gift/News stand ; Lounges/bars ; Grocery store ; Secured parking ; Pets allowed ; Adjoining rooms ; Parking ; Wheelchair access ; Shops and commercial services ; Safe deposit box ; Room service ; 24-hour front desk ; Steam bath ; Massage services ; Public area air conditioned ; Elevators ; Guestroom wired internet ; Restaurant ; Laundry/Valet service ; Medical Facilities Service ; Kitchenette ; Roof terrace ; Direct dial telephone ; Hair dryer",
            geolocation: {
              latitude: 25.702738080404,
              longitude: 32.643180635582,
            },
            hotel_code: "1226021",
            images: {
              main_image: "1226021/0d80a72bb54b07cc4d3718544e4116ee.jpg",
              url: "https://images.grnconnect.com/1226021/0d80a72bb54b07cc4d3718544e4116ee.jpg",
            },
            name: "Emilio Hotel",
            rates: [
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1322,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1321.94,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1321.94,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 238.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5dlkns5c6c66lvlz35cbr7xaddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "5heflkrr5mrcppzs2ciw2foq4hgkrsfc7g2o5w3g3zaa",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go64tn2ls5l7o66vu343ncbu",
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1322,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1321.94,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1321.94,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 238.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5hjk7s5c6c66lvlz35cbr6haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "5heflkrr5mrcppzs2ciw2foq4hgkrsfc7g2o5w3g3zaa",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go74djkls5l7o66vu343ncby",
                    room_type: "Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1531,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1530.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1530.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 275.66,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusng4hgu4dj2ts5c6c66lvlz35cbr5haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "5ddvhkr75arerojfv2iw4fgr73n2ls5j6w2phvdz",
                rooms: [
                  {
                    description: "Room, 1 King Bed (Skyline View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwjgmh6w4hkkls5l7o66vu343ncba",
                    room_type: "Room, 1 King Bed Skyline View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1531,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1530.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1530.72,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 275.66,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusng4hgu4dj2ps5c6c66lvlz35cbr5paddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "5ddvhkr75arerojfv2iw4fgr73n2ls5j6w2phvdz",
                rooms: [
                  {
                    description:
                      "Room, 2 Twin Beds (Skyline View) (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwjgmh6w4hnkls5l7o66vu343ncbc",
                    room_type: "Room, 2 Twin Beds Skyline View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1688,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1687.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1687.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 303.77,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctuwow4h6t4dlkvs5c6c66lvlz35cbt7haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dhf3pji5muspubuy7xw2f6x4dn2nx5b6k76pu372nnbr5i",
                rooms: [
                  {
                    description: "Room, 1 King Bed, Lagoon View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcqukjgkggw4tl2ls5l7o66vu343ncrq",
                    room_type: "Room, 1 King Bed, Lagoon View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1688,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1687.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1687.2,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 303.77,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctuwow4h6t4dlkts5c6c66lvlz35cbt7paddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dhf3pji5muspubuy7xw2f6x4dn2nx5b6k76pu372nnbr5i",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds, Lagoon View (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcqukjgkggw4tkkls5l7o66vu343ncrs",
                    room_type: "Room, 2 Twin Beds, Lagoon View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1781,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1780.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1780.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 320.55,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5dlkns5c6g26zut53bdr35paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dhvfnbi44qspubuy7xw2f6x4hkk7x5n7k76pu3q3rnbb5i",
                rooms: [
                  {
                    description: "Room, 1 King Bed (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go64tn2ls5k6o2o3v333barc",
                    room_type: "Room, 1 King Bed 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 1781,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 1780.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 1780.29,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 320.55,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5hjk7s5c6g26zut53bab56paddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dhvfnbi44qspubuy7xw2f6x4hkk7x5n7k76pu3q3rnbb5i",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go74djkls5k6o2o3v3335bb2",
                    room_type: "Room, 2 Twin Beds 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 2026,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 2025.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 2025.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 364.85,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusng4hgu4dj2ts5c6g26jvd43fbbv67addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dgvnnbi4uvspubuy7xw2f6x4pik7x5p6c76pudz3bnbb6y",
                rooms: [
                  {
                    description: "Room, 1 King Bed (Skyline View) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwjgmh6w4hkkls5k6o6oxvt23vdb6",
                    room_type: "Room, 1 King Bed Skyline View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 2026,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 2025.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 2025.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 364.85,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusng4hgu4dj2ps5c6g26jvd43fbbx6haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dgvnnbi4uvspubuy7xw2f6x4pik7x5p6c76pudz3bnbb6y",
                rooms: [
                  {
                    description:
                      "Room, 2 Twin Beds (Skyline View) (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwjgmh6w4hnkls5k6o6oxvt23vdry",
                    room_type: "Room, 2 Twin Beds Skyline View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 2211,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 2210.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 2210.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 397.95,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctuwow4h6t4dlkvs5c6gz6xu3z3rgr75paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dffbnbi4uqcpubuy7xw2f6x4tlk7x5p7o76pud33bnbw",
                rooms: [
                  {
                    description: "Room, 1 King Bed, Lagoon View (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcqukjgkggw4tl2ls5k6wz6zu372jbrc",
                    room_type: "Room, 1 King Bed, Lagoon View 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 2211,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 2210.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 2210.09,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 397.95,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctuwow4h6t4dlkts5c6gz6xu3z3rgrb7haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4dffbnbi4uqcpubuy7xw2f6x4tlk7x5p7o76pud33bnbw",
                rooms: [
                  {
                    description: "Room, 2 Twin Beds, Lagoon View (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcqukjgkggw4tkkls5k6wz6zu372jgbq",
                    room_type: "Room, 2 Twin Beds, Lagoon View 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3201,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3200.56,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3200.56,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 576.34,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusngkg6v43j2ps5c6c66lvlz35cbr6paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4phfzmri4yqcpubuy7xw2f6u4dnktx5m7o76pul33rnbb6y",
                rooms: [
                  {
                    description: "Park, Suite (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwmwchwq4hnkls5l7o66vu343ncb2",
                    room_type: "Park, Suite 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3410,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3409.28,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3409.28,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 613.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5dkkxs5c6c66lvlz35cbr77addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pgfnnri44wspubuy7xw2f6u4lik3x5n6276pul52jnbc",
                rooms: [
                  {
                    description:
                      "Room, 1 King Bed (Lagoon Beach - Only 16 years & above) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go643lkls5l7o66vu343ncbw",
                    room_type:
                      "Room, 1 King Bed Lagoon Beach - Only 16 years & above 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3410,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3409.28,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3409.28,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 613.93,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspucsuwpwogg74li2vs5c6c66lvlz35cbt6haddihrbhveidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pgfnnri44wspubuy7xw2f6u4lik3x5n6276pul52jnbc",
                rooms: [
                  {
                    description:
                      "Room, 2 Twin Beds (Lagoon Beach) (2 Twin Beds)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwkqucnwefgu4pl2ls5l7o66vu343ncry",
                    room_type: "Room, 2 Twin Beds Lagoon Beach 2 Twin Beds",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3618,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3618,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3618,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 651.51,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusngkg6v43ik3s5c6c66lvlz35cbr6xaddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pgvdpbi4qvcpubuy7xw2f6u4pl2px5o6g76pulq3jnbd7y",
                rooms: [
                  {
                    description: "Park, Suite, Terrace (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwmwchwq4likls5l7o66vu343ncb4",
                    room_type: "Park, Suite, Terrace 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3766,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3765.32,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3765.32,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 678.04,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusngkg6v43j2ps5c6g26xu323nab56paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pffdmbi4qxcpubuy7xw2f6u4tl2xx5o6w76pulr3rnbz6y",
                rooms: [
                  {
                    description: "Park, Suite (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcruwmwchwq4hnkls5k6oz6zudy35bb2",
                    room_type: "Park, Suite 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 3827,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 3826.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 3826.78,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 689.15,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspucsu2nw6ggr5di2ps5c6c66lvlz35cbt5paddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pff3mbi4uvspubuy7xw2f6u4tn2xx5p6c76pvty35nbq",
                rooms: [
                  {
                    description: "Suite, Lagoon View (Park) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwktusjwegw64pnkls5l7o66vu343ncrc",
                    room_type: "Suite, Lagoon View Park 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Bed and Breakfast"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 4237,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 4236.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 4236.02,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 762.81,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "Bed and Breakfast",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspuctusnwmfos5dkkxs5c6g26xudr3jgbx77addihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pevfnji44uspubuy7xw2f6u47kk5x5n6k76pvt43rnbt5a",
                rooms: [
                  {
                    description:
                      "Room, 1 King Bed (Lagoon Beach - Only 16 years & above) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwcrusng6go643lkls5k6oz67w3z2ndrw",
                    room_type:
                      "Room, 1 King Bed Lagoon Beach - Only 16 years & above 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
              {
                boarding_details: ["Room Only"],
                cancellation_policy: {
                  amount_type: "nights",
                  cancel_by_date: "2024-07-14T23:59:59",
                  details: [
                    {
                      currency: "AUD",
                      from: "2024-07-15T00:00:00",
                      nights: 1,
                    },
                  ],
                  no_show_fee: {
                    amount_type: "nights",
                    currency: "AUD",
                    nights: 4,
                  },
                  under_cancellation: false,
                },
                credit_deduction: "immediate",
                currency: "AUD",
                group_code: "wsdbjylcxn4ufgaa4tbdgf644hikrqvn6gya",
                has_promotions: false,
                includes_boarding: true,
                no_of_rooms: 1,
                non_refundable: false,
                other_inclusions: [
                  "Free valet parking",
                  "Free WiFi",
                  "Free self parking",
                ],
                payment_type: ["AT_WEB"],
                price: 4245,
                price_details: {
                  net: [
                    {
                      amount: 0,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "VAT",
                    },
                    {
                      amount: 4244.16,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "SupplierPrice",
                    },
                    {
                      amount: 4244.16,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Total",
                    },
                  ],
                  hotel_charges: [
                    {
                      amount: 80,
                      amount_type: "value",
                      currency: "AED",
                      included: false,
                      mandatory: true,
                      name: "MandatoryTax",
                    },
                  ],
                  surcharge_or_tax: [
                    {
                      amount: 764.24,
                      amount_type: "value",
                      currency: "AUD",
                      included: true,
                      name: "Tax recovery charges and Service fees (Sales Tax)",
                    },
                  ],
                },
                rate_comments: {
                  comments: "",
                  mealplan: "",
                  pax_comments:
                    "For this rate the infants will be converted to children with age 1.",
                  remarks:
                    "Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </br>\n  Please check country/city specific guidelines for COVID related  rules and restrictions for travelers. </br>\n  Bedding type / Extra bed / Extra breakfast is upon hotels discretion unless specified in the booking/remarks. </br>\n  Cancelled and rebooked reservations will be rejected, regardless of the source reported to the hotel.. Please note 1 Twin Bed Room would have 1 Single Bed in the room, whereas 2 Twin Bed Room would have 2 Single Beds in the room.",
                  MandatoryTax: "80.0 AED",
                },
                rate_key:
                  "4dgfhnzt4awspucsu2nw6ggr5dlkzs5c6c66lvlz35cbv7haddihrbhteidshn5jwubgvxhoujcqkhdmui",
                rate_type: "recheck",
                room_code: "4pevfmri5ivcpubuy7xw2f6u47kktx5a6g76pvt42nnbr7q",
                rooms: [
                  {
                    description:
                      "Suite, Terrace, Lagoon View (Park) (1 King Bed)",
                    no_of_adults: 1,
                    no_of_children: 0,
                    no_of_rooms: 1,
                    room_reference:
                      "4dcf5nb45arcpwktusjwegw64ti2ls5l7o66vu343ndbq",
                    room_type: "Suite, Terrace, Lagoon View Park 1 King Bed",
                  },
                ],
                supports_amendment: false,
                supports_cancellation: true,
              },
            ],
            safe2stay: {},
            supp_cards: ["MC", "VI"],
          },
        ],
        no_of_adults: 1,
        no_of_hotels: 6,
        no_of_nights: 4,
        no_of_rooms: 1,
      };

      utility.getResponse(
        res,
        {
          // count: _combineHotelResponse.length,
          ...finalResponseForSent,
        },
        "RETRIVED",
        200
      );
      hotelHelper.checkBiddingNotification(req, finalResponseForSent);
      // }
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
