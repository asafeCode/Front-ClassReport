import axios from "axios";

const API = "https://lessonreportapi.azurewebsites.net";

const api = axios.create({
  baseURL: API,
});
export default api;
