import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../services/propertyApi";

function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    propertyType: "",
    address: "",
    city: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    image: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProperty(property);

      alert("Property Added Successfully");

      navigate("/dashboard/properties");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Property");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>
        Add Property
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Property Name"
            value={property.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="propertyType"
            placeholder="Property Type"
            value={property.propertyType}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={property.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={property.city}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent"
            value={property.rent}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
          />

          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
          />

          <input
            type="text"
            name="area"
            placeholder="Area (sq ft)"
            value={property.area}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={property.image}
            onChange={handleChange}
          />

          <select
            name="status"
            value={property.status}
            onChange={handleChange}
          >
            <option value="Available">
              Available
            </option>

            <option value="Rented">
              Rented
            </option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={property.description}
          onChange={handleChange}
          rows="5"
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;