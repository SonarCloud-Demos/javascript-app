const userService = require("../services/userService");
const productService = require("../services/productService");
const config = require("../utils/config");

function getDashboard(req, res) {
  const users = userService.getAllUsers();
  const products = productService.getAllProducts();
  res.json({
    userCount: users.length,
    productCount: products.length,
    config: {
      cacheEnabled: config.cacheEnabled,
      logLevel: config.logLevel,
    },
  });
}

function runEval(req, res) {
  // INTENTIONAL: eval from user input (security vulnerability for SonarQube demo)
  const expr = req.body.expression;
  const evalResult = eval(expr);
  res.json({ result: evalResult });
}

// INTENTIONAL: Loose equality (SonarQube issue)
function checkAdmin(req, res) {
  if (req.query.admin == "true") {
    res.json({ admin: true });
    return;
  }
  res.json({ admin: false });
}

module.exports = { getDashboard, runEval, checkAdmin };
