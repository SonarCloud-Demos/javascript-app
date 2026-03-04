const productService = require("../services/productService");
const { isNonEmptyString, isPositiveNumber } = require("../utils/validators");

function getProducts(req, res) {
  const products = productService.getAllProducts();
  res.json(products);
}

function getProduct(req, res) {
  const product = productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}

function createProduct(req, res) {
  const { name, price, description } = req.body;
  if (!isNonEmptyString(name)) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!isPositiveNumber(Number(price))) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }
  const product = productService.createProduct({ name, price, description });
  res.status(201).json(product);
}

module.exports = { getProducts, getProduct, createProduct };
