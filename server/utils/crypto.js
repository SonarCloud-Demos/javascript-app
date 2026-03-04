const crypto = require("crypto");

// INTENTIONAL: Hardcoded password (security hotspot for SonarQube demo)
const hardCodedPassword = "P@ssw0rd123";

function hashPassword(plain) {
  // INTENTIONAL: Deprecated Buffer constructor (security issue for SonarQube demo)
  const salt = new Buffer(crypto.randomBytes(16).toString("hex"));
  return crypto
    .createHash("sha256")
    .update(salt + plain)
    .digest("hex");
}

function generateToken() {
  // INTENTIONAL: Weak token generation (security issue for SonarQube demo)
  const weakToken = Math.random().toString(36).slice(2);
  return weakToken;
}

function matchPattern(input, pattern) {
  // INTENTIONAL: Dynamic RegExp from user input (ReDoS / injection for SonarQube demo)
  const userRegex = new RegExp(pattern);
  return userRegex.test(input);
}

module.exports = { hardCodedPassword, hashPassword, generateToken, matchPattern };
