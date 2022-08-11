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

function getNews(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return instance.get("/news", config);
}

function getEvents(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return instance.get("/lists", config);
}

function addNewList(token, data) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return instance.post("/lists", data, config);
}

function getOneList(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return instance.get(`/lists/${id}`, config);
}

function getGuestInfo(guestToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${guestToken}`,
    },
  };
  return instance.get("/guest", config);
}

function confirmGuest(guestToken, data) {
  const config = {
    headers: {
      Authorization: `Bearer ${guestToken}`,
    },
  };
  return instance.post("/guest", data, config);
}

const api = {
  login,
  getBuildings,
  getResidentsByBuildingId,
  signUpResident,
  getNews,
  getEvents,
  addNewList,
  getOneList,
  getGuestInfo,
  confirmGuest,
};
export default api;
