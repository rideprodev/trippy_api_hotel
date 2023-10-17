import config from ".";

export default {
  search: {
    url: `${config.app.GRNBaseUrl}v3/hotels/availability`,
    method: "post",
  },
};
