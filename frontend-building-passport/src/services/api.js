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

function getResidentsByBuildingId(buildignId) {
  return instance.get(`/residents/${buildignId}`);
}

function signUpResident(data) {
  return instance.post("/sign-up", data);
}

const api = { login, getBuildings, getResidentsByBuildingId, signUpResident };
export default api;
