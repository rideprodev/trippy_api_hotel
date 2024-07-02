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
          exclude: [
            "password",
            "verifyToken",
            "otp",
            "isMobileVerified",
            "isEmailVerified",
            "last_login",
            "current_login",
            "passwordResetToken",
            "createdBy",
            "updatedBy",
            "createdAt",
            "updatedAt",
          ],
        },
        include: {
          attributes: [
            "title",
            "nationality",
            "gender",
            "contry",
            "currencyCode",
            "panNumber",
          ],
          model: UserPersonalInformation,
          as: UserPersonalInformation,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  },
};
