import axios from "axios";
import { getUserToken } from "./user";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  config => {
    const token = getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => Promise.reject(error)
);

export default axiosClient;
