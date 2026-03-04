const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");

function registerRoutes(app) {
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/admin", adminRoutes);
}

module.exports = registerRoutes;
