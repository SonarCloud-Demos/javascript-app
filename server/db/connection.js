const config = require("../utils/config");
const logger = require("../utils/logger");

// In-memory store simulating a database connection
const collections = {
  users: [],
  products: [],
};

let connected = false;

function connect() {
  logger.info("Connecting to database", { uri: config.dbUri });
  connected = true;
  return Promise.resolve();
}

function getCollection(name) {
  if (!connected) {
    throw new Error("Database not connected");
  }
  return collections[name] || [];
}

function setCollection(name, data) {
  collections[name] = data;
}

module.exports = { connect, getCollection, setCollection };
