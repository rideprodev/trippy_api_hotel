import httpStatus from "http-status";
import repositories from "../repositories";
import utility from "../services/utility";

const { membersRepository } = repositories;

export default {
  /**
   * Get all Cms Pages
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getMembers(req, res, next) {
    try {
      const result = await membersRepository.findAll();
      utility.getResponse(res, result, "Pages Retrived");
    } catch (error) {
      next(error);
    }
  },
  /**
   * Create faq
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async saveMember(req, res, next) {
    try {
      const result = await membersRepository.saveMember(req);
      delete result.userId;
      utility.getResponse(res, result, "ADDED", httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Update cms page
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updateMember(req, res, next) {
    try {
      const Object = req.member;
      const bodyData = req.body;
      const result = await membersRepository.updateMember(
        req,
        Object,
        bodyData
      );
      utility.getResponse(res, result, "UPDATED");
    } catch (error) {
      next(error);
    }
  },
  /**
   * Delete faq
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async deleteMember(req, res, next) {
    try {
      await membersRepository.deleteMember(req);
      utility.getResponse(res, null, "DELETED");
    } catch (error) {
      next(error);
    }
  },
};
