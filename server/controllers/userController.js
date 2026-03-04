const userService = require("../services/userService");
// INTENTIONAL VIOLATION: Controller importing DB directly, bypassing service layer
const db = require("../db/connection");
const { isValidEmail } = require("../utils/validators");

// INTENTIONAL: var usage (maintainability issue for SonarQube demo)
var lastRequest = null;

function getUsers(req, res) {
  // INTENTIONAL: Unused variable (maintainability issue for SonarQube demo)
  const neverUsed = "unused-value";
  void neverUsed;

  const users = userService.getAllUsers();
  lastRequest = new Date();
  res.json(users);
}

function getUser(req, res) {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}

function createUser(req, res) {
  const { email, name } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  // INTENTIONAL: Nested ternary (maintainability issue for SonarQube demo)
  var role = req.body.admin ? (req.body.superAdmin ? "superadmin" : "admin") : req.body.moderator ? "moderator" : "user";
  const user = userService.createUser({ email, name, role });
  res.status(201).json(user);
}

// INTENTIONAL VIOLATION: Directly accessing DB from controller
function getUserCount(req, res) {
  const users = db.getCollection("users");
  res.json({ count: users.length });
}

module.exports = { getUsers, getUser, createUser, getUserCount };
