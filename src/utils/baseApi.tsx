import axios from "axios";

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEAPI,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeoutErrorMessage: "Request timed out",
});
