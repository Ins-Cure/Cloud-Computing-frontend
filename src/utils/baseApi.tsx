import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeoutErrorMessage: "Request timed out",
});
