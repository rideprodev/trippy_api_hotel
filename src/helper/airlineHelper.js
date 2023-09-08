export default {
  // search
  async FlightSearchResponseGenrator(response, isDetail = false) {
    const flightResponse = [];
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      const FareSourceCode = element.AirItineraryPricingInfo.FareSourceCode;
      const FareType = element.AirItineraryPricingInfo.FareType;
      const BaseFareCountryCurrency =
        element.AirItineraryPricingInfo.ItinTotalFare.BaseFare.Amount;
      const EquivFareInUSD =
        element.AirItineraryPricingInfo.ItinTotalFare.EquivFare.Amount;
      for (let j = 0; j < element.OriginDestinationOptions.length; j++) {
        const ele = element.OriginDestinationOptions[j];
        for (let k = 0; k < ele.FlightSegments.length; k++) {
          const flight = ele.FlightSegments[k];
          let flightObj = {};
          if (isDetail === false) {
            flightObj = {
              FareType: FareType,
              FareSourceCode: FareSourceCode,
              BaseFareCountryCurrency: BaseFareCountryCurrency,
              EquivFareInUSD: EquivFareInUSD,
            };
          }
          flightObj = {
            ...flightObj,
            OperatingAirline: flight.OperatingAirline,
            DepartureAirportLocationCode: flight.DepartureAirportLocationCode,
            DepartureDateTime: flight.DepartureDateTime,
            ArrivalAirportLocationCode: flight.ArrivalAirportLocationCode,
            ArrivalDateTime: flight.ArrivalDateTime,
            StopQuantity: flight.StopQuantity,
            CabinClassType: flight.CabinClassType,
            SeatsRemaining: flight.SeatsRemaining.Number,
            JourneyDuration: flight.JourneyDuration,
            MealCode: flight.MealCode,
            // stops: flight.StopQuantity,
            // stop_info: flight.StopQuantityInfo,
          };

          flightResponse.push(flightObj);
        }
      }
    }

    return flightResponse;
  },

  // details
  async FlightDetailResponseGenrator(response) {
    const flightResponse = [];
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      const PTC_FareBreakdowns = [];

      for (
        let j = 0;
        j < element.AirItineraryPricingInfo.PTC_FareBreakdowns.length;
        j++
      ) {
        const e = element.AirItineraryPricingInfo.PTC_FareBreakdowns[j];
        PTC_FareBreakdowns.push({
          BaggageInfo: e.BaggageInfo,
          CabinBaggageInfo: e.CabinBaggageInfo,
          PassengerFareContryCurrency: e.PassengerFare.BaseFare.Amount,
          PassengerFareInUSD: e.PassengerFare.EquivFare.Amount,
          PassengerType: e.PassengerTypeQuantity.Code,
          PassengerQuantity: e.PassengerTypeQuantity.Quantity,
          PenaltiesInfo: e.PenaltiesInfo,
        });
      }

      const flightDetailObj = {
        DirectionInd: element.DirectionInd,
        IsPassportMandatory: element.IsPassportMandatory,
        ValidatingAirlineCode: element.ValidatingAirlineCode,
        FareSourceCode: element.AirItineraryPricingInfo.FareSourceCode,
        FareType: element.AirItineraryPricingInfo.FareType,
        IsRefundable: element.AirItineraryPricingInfo.IsRefundable,
        TotalFare: element.AirItineraryPricingInfo.ItinTotalFare,
        FareBreakdowns: PTC_FareBreakdowns,
        FlightInformation: await this.FlightSearchResponseGenrator(
          response,
          true
        ),
      };
      flightResponse.push(flightDetailObj);
    }

    return flightResponse[0];
  },

  async FlightReturnTypeGenrator(response) {
    const flightResponse = [];
    for (let index = 0; index < response.length; index++) {
      const element = response[index];
      const res = await this.FlightDetailResponseGenrator([element]);
      flightResponse.push(res);
    }

    return flightResponse; //response;
  },
};
