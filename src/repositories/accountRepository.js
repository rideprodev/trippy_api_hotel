import models from "../models";
const { UserToken } = models;

export default {
  /**
   * Get device etail by token for authentication*
   * @param {String} token
   */
  async getDeviceDetailByToken(token) {
    try {
      const where = {
        access_token: token,
      };
      return await UserToken.findOne({
        where,
      });
    } catch (error) {
      throw Error(error);
    }
  },
};
