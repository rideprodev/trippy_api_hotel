import config from ".";

export default {
  search: {
    url: `${config.app.GRNBaseUrl}v3/hotels/availability`,
    method: "post",
  },
  refetch(searchId, hotelCode) {
    return {
      url: `${config.app.GRNBaseUrl}v3/hotels/availability/${searchId}?hcode=${hotelCode}&bundled=true`,
      method: "get",
    };
  },
  revalidate(searchId) {
    return {
      url: `${config.app.GRNBaseUrl}v3/hotels/availability/${searchId}/rates/?action=recheck`,
      method: "post",
    };
  },
  booking: {
    url: `${config.app.GRNBaseUrl}v3/hotels/bookings`,
    method: "post",
  },
};
