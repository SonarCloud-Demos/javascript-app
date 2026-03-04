module.exports = {
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/demo",
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  cacheEnabled: process.env.CACHE_ENABLED === "true",
  logLevel: process.env.LOG_LEVEL || "info",
};
