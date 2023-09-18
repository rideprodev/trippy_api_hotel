import models from "../models";
import db from "../models";
const { Hotel } = models;
import { Op } from "sequelize";
import genrateResponse from "../services/responseGenrater";
const sequelize = db.sequelize;

export default {
  /**
   * Get airport pages
   * @param {object} req
   */
  async getAllHotels(req) {
    try {
      const queryData = req.query;
      let where = {},
        limit = null,
        offset = null;
      if (queryData.name) {
        where = {
          [Op.or]: [
            { name: { [Op.like]: `%${queryData.name}%` } },
            { code: { [Op.like]: `%${queryData.name}%` } },
            { city: { [Op.like]: `%${queryData.name}%` } },
          ],
        };
      }

      if (queryData.limit && queryData.limit > 0 && queryData.offset >= 0) {
        limit = +queryData.limit;
        offset = +queryData.offset;
      }

      const response = await sequelize.query(
        "SELECT hotels.id, hotels.hotel_code AS hotelCode, `hotel_name` AS hotelName, `city_code` as cityCode, `destination_code` as destinationCode, `country_code` as countryCode, `description`, `address`, `postal_code` as postalCode, `star_category` as starCategory, `latitude`, `logitude`, `accommodation_type` as accommodationType, `accommodation_type_sub_name` as accommodationTypeSubName, `chain_name` as chainName, `featured`, hotels.created_at, hotels.updated_at, hotel_images.id as `images.id`, hotel_images.hotel_code AS `images.hotelCode`, hotel_images.image_url as `images.imagsUrl`, hotel_images.image_caption as `images.imageCaption`, hotel_images.main_image as `images.mainImage`, hotel_images.image_type as `images.imageType` FROM `hotels` LEFT OUTER JOIN hotel_images ON hotel_images.hotel_code = hotels.hotel_code",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      const result = await genrateResponse(response);
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
