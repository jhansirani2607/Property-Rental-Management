import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPropertyById,
  updateProperty,
} from "../services/propertyApi";

function EditProperty() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await getPropertyById(id);
      setProperty(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProperty(id, property);

      alert("Property Updated Successfully");

      navigate("/dashboard/properties");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
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
      <h2>Edit Property</h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            placeholder="Property Name"
          />

          <input
            type="text"
            name="city"
            value={property.city}
            onChange={handleChange}
            placeholder="City"
          />

          <input
            type="number"
            name="rent"
            value={property.rent}
            onChange={handleChange}
            placeholder="Rent"
          />

          <input
            type="text"
            name="image"
            value={property.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <select
            name="status"
            value={property.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <textarea
          name="description"
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
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditProperty;