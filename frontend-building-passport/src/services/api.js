import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function login(data) {
  return instance.post("/login", data);
}

function getBuildings() {
  return instance.get("/buildings");
}

const api = { login, getBuildings };
export default api;
