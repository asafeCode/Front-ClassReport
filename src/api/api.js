import axios from "axios";
import {getToken} from "../utils/TokenStorage";

const API = "https://lessonreportapi.azurewebsites.net";

const api = axios.create({
  baseURL: API,
});
export default api;
