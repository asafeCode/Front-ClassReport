import axios from "axios";

const API = "https://lessonreportapi.azurewebsites.net";

const api = axios.create({
  baseURL: API,
});

// Adiciona automaticamente o token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
