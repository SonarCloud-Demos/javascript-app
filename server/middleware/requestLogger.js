const logger = require("../utils/logger");

function requestLogger(req, res, next) {
  logger.info("Incoming request", {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });
  next();
}

module.exports = requestLogger;
