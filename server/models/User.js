const db = require("../db/connection");

const COLLECTION = "users";

function findAll() {
  return db.getCollection(COLLECTION);
}

function findById(id) {
  return db.getCollection(COLLECTION).find((u) => u.id === id) || null;
}

function findByEmail(email) {
  return db.getCollection(COLLECTION).find((u) => u.email === email) || null;
}

function create(userData) {
  const users = db.getCollection(COLLECTION);
  const user = { id: String(Date.now()), ...userData, createdAt: new Date() };
  users.push(user);
  db.setCollection(COLLECTION, users);
  return user;
}

module.exports = { findAll, findById, findByEmail, create };
