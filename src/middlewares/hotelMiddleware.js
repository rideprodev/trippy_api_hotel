import repositories from "../repositories";
import utility from "../services/utility";
const { hotelRepository } = repositories;

export default {
  /**
   * Check airport exist
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async fetchHotelsCodes(req, res, next) {
    try {
      const bodyData = req.body;
      const hotelCodes = [];
      if (bodyData.hotelCode !== "") {
        hotelCodes.push(bodyData.hotelCode);
        req.body.hotelCode = hotelCodes;
        next();
      } else {
        const getAllHotelCodes = await hotelRepository.fetchAll({
          cityCode: bodyData.cityCode,
        });
        if (getAllHotelCodes.length > 0) {
          for (let index = 0; index < getAllHotelCodes.length; index++) {
            const element = getAllHotelCodes[index];
            hotelCodes.push(`${element.hotelCode}`.substring(2));
          }
          req.body.hotelCode = hotelCodes;
          next();
        } else {
          utility.getError(res, "No Hotel Find In this location");
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
