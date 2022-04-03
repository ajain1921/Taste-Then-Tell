import axios from "axios";

const BASE_URL = "http://localhost:9000/api";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/JSON",
  },
  withCredentials: true,
});
