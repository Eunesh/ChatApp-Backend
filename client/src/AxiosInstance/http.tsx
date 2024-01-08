import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const http_for_files = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
export default http;
