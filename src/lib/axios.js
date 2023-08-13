import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const axiosInstanceWithToken = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: Cookies.get("access_token"),
  },
});
