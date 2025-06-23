/**
 * Timeout middleware for setting request timeouts
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Function} Express middleware function
 */
const timeoutMiddleware = (timeout = 120000) => {
  return (req, res, next) => {
    req.setTimeout(timeout);
    res.setTimeout(timeout);
    next();
  };
};

export default {
  timeoutMiddleware,
}; 