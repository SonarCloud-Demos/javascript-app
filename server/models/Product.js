const db = require("../db/connection");
// INTENTIONAL VIOLATION: Model importing from utils (Model -> Utils)
const { isPositiveNumber } = require("../utils/validators");

const COLLECTION = "products";

function findAll() {
  return db.getCollection(COLLECTION);
}

function findById(id) {
  return db.getCollection(COLLECTION).find((p) => p.id === id) || null;
}

function create(productData) {
  if (!isPositiveNumber(productData.price)) {
    throw new Error("Price must be a positive number");
  }
  const products = db.getCollection(COLLECTION);
  const product = { id: String(Date.now()), ...productData, createdAt: new Date() };
  products.push(product);
  db.setCollection(COLLECTION, products);
  return product;
}

module.exports = { findAll, findById, create };
