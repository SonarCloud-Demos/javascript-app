const logger = require("./logger");

const store = new Map();

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    store.delete(key);
    logger.debug("Cache miss (expired)", { key });
    return null;
  }
  logger.debug("Cache hit", { key });
  return entry.value;
}

function set(key, value, ttlMs = 60000) {
  store.set(key, { value, expiry: Date.now() + ttlMs });
  logger.debug("Cache set", { key, ttlMs });
}

function clear() {
  store.clear();
  logger.info("Cache cleared");
}

module.exports = { get, set, clear };
