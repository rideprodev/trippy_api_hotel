import models from "../models";
const { Transaction } = models;

export default {
  /**
   * Get transaction detail
   * @param {Object} where
   */
  async findOneTransaction(where) {
    try {
      const result = await Transaction.findOne({
        where: where,
      });
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
