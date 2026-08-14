import axios from "axios";

const api = axios.create({
  baseURL: "https://devcollab-ux7k.onrender.com/",

  withCredentials: true,
});

export default api;
