import api from "./api";

export async function getProducts() {
  return api.get("/products");
}

export async function createProduct(productData) {
  return api.post("/products", productData);
}
