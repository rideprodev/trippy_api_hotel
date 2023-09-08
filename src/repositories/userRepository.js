import { Op } from "sequelize";
import models from "../models";
const { User, UserPersonalInformation } = models;

export default {
  /**
   * Find user detail for authentication*
   * @param {Object} whereObj
   */
  async findOne(whereObj) {
    try {
      if (!whereObj.status) {
        whereObj.status = { [Op.ne]: "deleted" };
      }
      return await User.findOne({
        where: whereObj,
        attributes: {
          exclude: ["password", "verifyToken"],
        },
      });
    } catch (error) {
      throw Error(error);
    }
  },
};
