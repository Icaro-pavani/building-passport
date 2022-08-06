import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function login(data) {
  return instance.post("/login", data);
}

const api = { login };
export default api;
