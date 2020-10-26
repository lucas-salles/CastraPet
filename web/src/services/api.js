import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/castra-pet",
});

api.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
