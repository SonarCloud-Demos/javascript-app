// INTENTIONAL CIRCULAR: notificationService -> userService -> notificationService
const userService = require("./userService");
const logger = require("../utils/logger");

function sendWelcomeEmail(user) {
  logger.info("Sending welcome email", { email: user.email });
  return { sent: true, to: user.email, template: "welcome" };
}

function notifyUser(userId, message) {
  const email = userService.getUserEmail(userId);
  if (!email) {
    logger.warn("Cannot notify user, email not found", { userId });
    return { sent: false };
  }
  logger.info("Sending notification", { email, message });
  return { sent: true, to: email, message };
}

module.exports = { sendWelcomeEmail, notifyUser };
