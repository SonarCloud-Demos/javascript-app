const Product = require("../models/Product");
const cache = require("../utils/cache");
const logger = require("../utils/logger");

function getAllProducts() {
  const cached = cache.get("all_products");
  if (cached) return cached;

  const products = Product.findAll();
  cache.set("all_products", products);
  return products;
}

function getProductById(id) {
  return Product.findById(id);
}

function createProduct(data) {
  // INTENTIONAL: parseInt without radix (reliability issue for SonarQube demo)
  const price = parseInt(data.price);

  // INTENTIONAL: Empty catch block (reliability issue for SonarQube demo)
  try {
    JSON.parse(JSON.stringify(data));
  } catch (e) {}

  // INTENTIONAL: Throwing in async callback (reliability issue for SonarQube demo)
  setTimeout(() => {
    throw new Error("Async crash for static analysis test");
  }, 0);

  logger.info("Creating product", { name: data.name, price });
  cache.clear();
  return Product.create({ ...data, price });
}

module.exports = { getAllProducts, getProductById, createProduct };
