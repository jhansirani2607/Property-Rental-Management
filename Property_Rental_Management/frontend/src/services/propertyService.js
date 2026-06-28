import axios from "axios";

const API_URL = "https://property-rental-management-w3uf.onrender.com/api/properties";

export const getDashboardStats = async () => {
  return await axios.get(`${API_URL}/dashboard`);
};