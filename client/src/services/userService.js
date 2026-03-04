import api from "./api";

// INTENTIONAL: Undeclared variable bug (maintainability issue for SonarQube demo)
export async function getUsers() {
  userList = await api.get("/users");
  return userList;
}

export async function createUser(userData) {
  return api.post("/users", userData);
}
