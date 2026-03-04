const express = require("express");
const bodyParser = require("body-parser");
const registerRoutes = require("./routes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const db = require("./db/connection");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// Legacy routes (preserved from myserver.js)
app.get("/api/hello", (req, res) => {
  logger.info("Hello called");
  res.send({ express: "Hello From Express" });
});

app.get("/api/goodbye", (req, res) => {
  logger.info("Goodbye called");
  res.send({ express: "Goodbye From Express" });
});

app.post("/api/func", (req, res) => {
  logger.info("Func called", { body: req.body });
  res.send("You sent:" + req.body.post);
});

// Register modular routes
registerRoutes(app);

// Error handling
app.use(errorHandler);

// Connect DB and start server (only when run directly)
if (require.main === module) {
  db.connect().then(() => {
    const { seed } = require("./db/seeds");
    seed();
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
  });
}

module.exports = app;
