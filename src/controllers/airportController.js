import HttpStatus from "http-status";
import repositories from "../repositories";
import utility from "../services/utility";
import httpStatus from "http-status";

const { airportRepository } = repositories;

export default {
  /**
   * Get all airport List
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAirports(req, res, next) {
    try {
      const airports = await airportRepository.getAllAirport(req);
      utility.getResponse(res, airports, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get airport details
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAirport(req, res, next) {
    try {
      const where = { id: req.params.airportId };
      const result = await airportRepository.findOne(where);
      if (result) {
        utility.getResponse(res, result, "RETRIVED");
      } else {
        utility.getError(res, "ID_NOT_FOUND");
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Get airport details
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async addAirport(req, res, next) {
    try {
      const result = await airportRepository.saveAirport(req);
      utility.getResponse(res, result, "ADDED", httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Airlines
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateAirport(req, res, next) {
    try {
      const Object = req.airport;
      const bodyData = req.body;
      const result = await airportRepository.updateAirport(Object, bodyData);
      utility.getResponse(res, result, "UPDATED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete Airlines
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async deleteAirport(req, res, next) {
    try {
      await airportRepository.deleteAirport(req);
      utility.getResponse(res, null, "DELETED");
    } catch (error) {
      next(error);
    }
  },
};
