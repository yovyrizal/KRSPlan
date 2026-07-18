import axios from "axios";
console.log(1)
const api = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
console.log(2)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("krsplan_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
