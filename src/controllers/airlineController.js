import repositories from "../repositories";
import utility from "../services/utility";
import AirlineHelper from "../helper/airlineHelper";
import httpStatus from "http-status";

const { airlineRepository } = repositories;

export default {
  /**
   * Get airline token
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getSessionToken(req, res, next) {
    try {
      const Token = await airlineRepository.getAirlineToken(req);
      return utility.getResponse(res, Token, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },
  /**
   * Get all Registered airline
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAirlines(req, res, next) {
    try {
      const airline = await airlineRepository.getAllAirlines(req);
      utility.getResponse(res, airline, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get airline details
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAirline(req, res, next) {
    try {
      const where = { id: req.params.airlineId };
      const result = await airlineRepository.findOne(where);
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
   * Get airline details
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async addAirlines(req, res, next) {
    try {
      const result = await airlineRepository.saveAirline(req);
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
  async updateAirlines(req, res, next) {
    try {
      const Object = req.airline;
      const bodyData = req.body;
      const result = await airlineRepository.updateAirline(Object, bodyData);
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
  async deleteAirlines(req, res, next) {
    try {
      await airlineRepository.deleteAirline(req);
      utility.getResponse(res, null, "DELETED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get User Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getUserBooking(req, res, next) {
    try {
      const where = { userId: req.user.id };
      const booking = await airlineRepository.getAllBooking(req, where);
      utility.getResponse(res, booking, "RETRIVED");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get All Booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getAllBooking(req, res, next) {
    try {
      const { bookingId } = req.params;
      const where = {};
      if (req.user.userType === "admin" && bookingId === "all") {
        const booking = await airlineRepository.getAllBooking(req);
        utility.getResponse(res, booking, "RETRIVED");
      } else if (bookingId > 0) {
        where.id = bookingId;
        const booking = await airlineRepository.getOneBooking(req, where);
        utility.getResponse(res, booking, "RETRIVED");
      } else {
        utility.getResponse(res, null, "UNAUTHORISED_ACCESS");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async search(req, res, next) {
    try {
      const response = await airlineRepository.search(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        const flightResponse = await AirlineHelper.FlightReturnTypeGenrator(
          response.data.PricedItineraries
        );
        utility.getResponse(res, flightResponse, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline revalidate
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async revalidate(req, res, next) {
    try {
      const response = await airlineRepository.revalidate(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        const flightDetail = await AirlineHelper.FlightDetailResponseGenrator(
          response.data.PricedItineraries
        );
        utility.getResponse(res, flightDetail, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async booking(req, res, next) {
    try {
      const response = await airlineRepository.booking(req);
      // console.log(response.data);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.data.Data[0], response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        utility.getResponse(
          res,
          {
            BookingStatus: response.data.Status,
            BookingNumber: response.data.UniqueID,
            BookingAt: response.data.TktTimeLimit,
          },
          "RETRIVED"
        );
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingStatus(req, res, next) {
    try {
      const response = await airlineRepository.bookingStatus(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (!response.data.MFRefResult) {
        utility.getError(res, "CHECK_YOUR_BOOKING");
      } else {
        utility.getResponse(
          res,
          { BookingNumber: response.data.MFRefResult.MFRef },
          "RETRIVED"
        );
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async bookingCancel(req, res, next) {
    try {
      const response = await airlineRepository.bookingCancel(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        utility.getResponse(res, response, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async OrderTicket(req, res, next) {
    try {
      const response = await airlineRepository.OrderTicket(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        utility.getResponse(res, null, "TICKET_ORDERED");
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async TicketStatus(req, res, next) {
    try {
      const response = await airlineRepository.TicketStatus(req);
      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.statusText, response.status);
      } else if (response.data.Errors.length > 0) {
        utility.getError(res, response.message);
      } else {
        utility.getResponse(
          res,
          response.data.TicketOrderStatuses[0],
          "RETRIVED"
        );
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all airline According search
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async TripDetail(req, res, next) {
    try {
      const response = await airlineRepository.TripDetail(req);

      if (response.status === 400 || response.status === 401) {
        utility.getError(res, response.data.Data, response.status);
      } else if (!response.data) {
        utility.getError(res, response.message);
      } else {
        utility.getResponse(res, response.data, "RETRIVED");
      }
    } catch (error) {
      next(error);
    }
  },
};
