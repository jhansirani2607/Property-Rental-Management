import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

export const getDashboardStats = async () => {
  return await axios.get(`${API_URL}/dashboard`);
};