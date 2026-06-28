import axios from "axios";

const API_URL = "https://property-rental-management-w3uf.onrender.com/api/properties";

// Get all properties
export const getProperties = async () => {
    return await axios.get(API_URL);
};

// Get single property
export const getPropertyById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Add property
export const addProperty = async (propertyData) => {
    return await axios.post(API_URL, propertyData);
};

// Update property
export const updateProperty = async (id, propertyData) => {
    return await axios.put(`${API_URL}/${id}`, propertyData);
};

// Delete property
export const deleteProperty = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};