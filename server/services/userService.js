const User = require("../models/User");
const logger = require("../utils/logger");
// INTENTIONAL CIRCULAR: userService -> notificationService -> userService
const notificationService = require("./notificationService");

// INTENTIONAL: var usage (maintainability issue for SonarQube demo)
var userCache = {};

function getAllUsers() {
  logger.info("Fetching all users");
  return User.findAll();
}

function getUserById(id) {
  logger.info("Fetching user", { id });
  return User.findById(id);
}

function createUser(data) {
  logger.info("Creating user", { email: data.email });
  const user = User.create(data);
  notificationService.sendWelcomeEmail(user);
  return user;
}

function getUserEmail(userId) {
  const user = User.findById(userId);
  return user ? user.email : null;
}

module.exports = { getAllUsers, getUserById, createUser, getUserEmail };
