function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value) {
  return typeof value === "number" && value > 0;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidId(value) {
  return typeof value === "string" && /^[a-f0-9]{24}$/.test(value);
}

module.exports = { isNonEmptyString, isPositiveNumber, isValidEmail, isValidId };
