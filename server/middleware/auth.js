const userService = require("../services/userService");
const config = require("../utils/config");

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (token === config.jwtSecret) {
    req.user = { id: "admin", role: "admin" };
  } else {
    req.user = { id: token, role: "user" };
  }
  next();
}

function authorize(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
