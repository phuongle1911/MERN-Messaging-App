import axios from "axios";


const API_HOST = import.meta.env.API_HOST || 'http://localhost:3000';
const API_BASE_URL = `${API_HOST}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

export default api;