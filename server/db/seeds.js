// INTENTIONAL VIOLATION: DB layer importing models (bidirectional db <-> models)
const { User, Product } = require("../models");
const logger = require("../utils/logger");

function seed() {
  logger.info("Seeding database");

  User.create({ email: "alice@example.com", name: "Alice", role: "admin" });
  User.create({ email: "bob@example.com", name: "Bob", role: "user" });

  Product.create({ name: "Widget", price: 9.99, description: "A fine widget" });
  Product.create({ name: "Gadget", price: 24.99, description: "A fancy gadget" });

  logger.info("Seeding complete");
}

module.exports = { seed };
