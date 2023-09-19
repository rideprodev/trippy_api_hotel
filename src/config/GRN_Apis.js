import config from ".";

export default {
  search: {
    url: `${config.app.RGNBaseUrl}v3/hotels/availability`,
    method: "post",
  },
};
