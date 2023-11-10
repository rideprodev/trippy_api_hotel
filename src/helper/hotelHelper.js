import repositories from "../repositories";
import models from "../models";
import requestHandler from "../services/requestHandler";
// const { airlineRepository, membersRepository, userRepository } = repositories;
// const { Airports, Airlines } = models;

export default {
  async checkBiddingNotification(req, data) {
    delete req.user;
    const bodyData = req.body;
    const where = {
      from: bodyData.OriginDestinationInformations[0].OriginLocationCode,
      to: bodyData.OriginDestinationInformations[0].DestinationLocationCode,
      tripType: bodyData.AirTripType,
      bookingClassReference: bodyData.CabinPreference,
      status: "active",
    };
    // if(bodyData.AirTripType==="return"){

    // }
    const amounts = [];
    const Bidding = await airlineRepository.getAllBidding(where);
    for (let index = 0; index < data.length; index++) {
      const x = data[index];
      if (x.FareType !== "WebFare") {
        if (bodyData.AirTripType === "return") {
          amounts.push({
            amount: +x.FareBreakdowns[0].PassengerFareInUSD,
            ...x.DirectionInfromation[0].from,
            toLocation: x.DirectionInfromation[1].from,
            data: x,
          });
        } else {
          amounts.push({
            amount: +x.FareBreakdowns[0].PassengerFareInUSD,
            ...x.DirectionInfromation[0].from,
            data: x,
          });
        }
      }
    }
    console.log("amounts", amounts.length);
    if (Bidding.length > 0 && amounts.length > 0) {
      for (let index = 0; index < Bidding.length; index++) {
        const element = Bidding[index];
        const filteredData = amounts.filter((x) => {
          if (
            x.amount > element.minBid &&
            x.amount < element.maxBid &&
            x.Time === element.departureFrom &&
            x.Airline === element.airlineHotelCode
          ) {
            if (bodyData.AirTripType === "return") {
              if (x.toLocation.Time === element.departureTo) {
                return x;
              }
            } else {
              return x;
            }
          }
        });
        console.log("filteredData", filteredData.length);
        if (filteredData.length > 0) {
          const filterData = filteredData[0];
          // update lAtest Price
          await airlineRepository.updateLatestPrice({
            latestPrice: element.dataValues.userId,
            biddingId: element.dataValues.id,
            userId: bodyData.userId,
          });
          req.body.FareSourceCode = filterData.data.FareSourceCode;
          await requestHandler.SendToNotificationService(
            element.userData.dataValues.email,
            "notification",
            "Hurrey! your bid is just hit"
          );
          const totalMemberInReq = bodyData.PassengerTypeQuantities.reduce(
            (accumulator, currentValue) => accumulator + currentValue.Quantity,
            0
          );
          console.log(
            totalMemberInReq,
            element.dataValues.totalMember,
            totalMemberInReq === element.dataValues.totalMember
          );
          if (totalMemberInReq === element.dataValues.totalMember) {
            const revalidateResponse = await airlineRepository.revalidate(req);
            console.log(revalidateResponse);
            filterData.FareSourceCode = "";
            if (revalidateResponse.data.PricedItineraries.length > 0) {
              filterData.FareSourceCode = revalidateResponse.data
                .PricedItineraries[0]
                ? revalidateResponse.data.PricedItineraries[0]
                    .AirItineraryPricingInfo.FareSourceCode
                : null;
              filterData.HoldAllowed =
                revalidateResponse.data.PricedItineraries[0].HoldAllowed;
            }
            console.log(filterData, "filterData");
            if (
              filterData.FareSourceCode &&
              filterData.HoldAllowed === "True"
            ) {
              filterData.biddingData = element.dataValues;
              // Booking Request
              const destinations = [];

              if (filterData.data.DirectionInd === "OneWay") {
                const airline = await Airlines.findOne({
                  where: { code: filterData.Airline },
                });
                const airportFrom = await Airports.findOne({
                  where: { code: filterData.biddingData.from },
                });
                const airportTo = await Airports.findOne({
                  where: { code: filterData.biddingData.to },
                });
                destinations.push({
                  fromId: `${airportFrom.id}`,
                  toId: `${airportTo.id}`,
                  trvellingDate: `${filterData.biddingData.departureFrom}`,
                  airlineId: `${airline.id}`,
                  flightNumber: `${`${filterData.Airline} ${filterData.flightNumber}`}`,
                  flightDepartureAt: `${filterData.biddingData.departureFrom}`,
                  flightArrivalAt: `${filterData.data.DirectionInfromation[0].to.Time}`,
                  cabinClass: `${filterData.biddingData.bookingClassReference}`,
                  journeyDuration: `${filterData.data.FlightInformation.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.JourneyDuration,
                    0
                  )}`,
                });
              } else {
                for (
                  let index = 0;
                  index < filterData.data.DirectionInfromation.length;
                  index++
                ) {
                  const directions =
                    filterData.data.DirectionInfromation[index];
                  const airline = await Airlines.findOne({
                    where: { code: directions.from.Airline },
                  });
                  const airportFrom = await Airports.findOne({
                    where: { code: directions.from.LocationCode },
                  });
                  const airportTo = await Airports.findOne({
                    where: { code: directions.to.LocationCode },
                  });
                  destinations.push({
                    fromId: `${airportFrom.id}`,
                    toId: `${airportTo.id}`,
                    trvellingDate: `${directions.from.Time}`,
                    airlineId: `${airline.id}`,
                    flightNumber: `${`${directions.from.Airline} ${directions.from.flightNumber}`}`,
                    flightDepartureAt: `${directions.from.Time}`,
                    flightArrivalAt: `${directions.to.Time}`,
                    cabinClass: `${bodyData.CabinPreference}`,
                    journeyDuration: `${filterData.data.FlightInformation.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.JourneyDuration,
                      0
                    )}`,
                  });
                }
              }
              console.log(destinations, "destinations");
              const bookingRequest = {};
              bookingRequest.body = {
                fareSourceCode: `${filterData.FareSourceCode}`,
                destinations: destinations,
                tripType: `${filterData.data.DirectionInd}`,
                totalMember: `${filterData.biddingData.totalMember}`,
                adultMember: `${filterData.biddingData.adultMember}`,
                childMember: `${filterData.biddingData.childMember}`,
                infantMember: `${filterData.biddingData.infantMember}`,
                membersId: JSON.parse(filterData.biddingData.membersId),
                isUserTravelled: `${filterData.biddingData.isUserTravelled}`,
                fareType: `${filterData.data.FareType}`,
                nationalityCode: `${"IN"}`,
                currencyCode: `${"INR"}`,
                totalFairCurrency:
                  filterData.data.FareBreakdowns[0].PassengerFareContryCurrency,
                totalFairUsd: `${filterData.data.FareBreakdowns[0].PassengerFareInUSD}`,
                isRefundable: `${filterData.data.IsRefundable}`,
                IsPassportMandatory: `${filterData.data.IsPassportMandatory}`,
              };
              bookingRequest.user = element.userData.dataValues;

              // check members -----------
              let members = [];
              if (bookingRequest.body.membersId.length > 0) {
                const result = await membersRepository.checkMemberExistense(
                  bookingRequest,
                  bookingRequest.body.membersId
                );
                members = [...members, ...result];
              }

              // user self travelled check
              if (bookingRequest.body.isUserTravelled === "true") {
                const userData = bookingRequest.user;
                const personalData = await userRepository.getUserInformation(
                  userData.id
                );
                const userObject = {
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  ...personalData.dataValues,
                };
                // console.log(userObject);
                members = [...members, userObject];
              }
              bookingRequest.members = members;

              console.log(bookingRequest, "bookingRequest");

              const booking = await airlineRepository.booking(bookingRequest);

              console.log(booking);
              console.log(booking.data.Errors);
              if (
                booking.status === 200 &&
                (booking.data.Errors.length === 0 ||
                  (booking.data.Errors[0] &&
                    booking.data.Errors[0].Message ==
                      "Pending Need - Awaiting carrier response - Booking Unconfirmed."))
              ) {
                await requestHandler.SendToNotificationService(
                  element.userData.dataValues.email,
                  "notification",
                  "your flight booked through your bid"
                );

                await airlineRepository.updateBidding(
                  { status: "completed" },
                  { id: filterData.biddingData.id }
                );
              }
            } else {
              await airlineRepository.updateBidding(
                { status: "Not Availiable" },
                { id: element.dataValues.id }
              );
              console.log("hold allow not availiable");
            }
          } else {
            console.log("members is not matched");
          }
        } else {
          console.log("filterData is 0");
        }
      }
    } else {
      console.log("Bidding Or amount is 0");
    }
  },
};
