import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyApi";

function MyRental() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await getProperties();

      const rentedProperties = res.data.filter(
        (property) => property.status === "Rented"
      );

      setRentals(rentedProperties);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        My Rentals
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {rentals.map((property) => (
          <div
            key={property._id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={
                property.image ||
                "https://via.placeholder.com/300"
              }
              alt={property.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3>{property.title}</h3>

              <p>
                <strong>Location:</strong>{" "}
                {property.city}
              </p>

              <p>
                <strong>Rent:</strong> ₹
                {property.rent}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span style={{ color: "red" }}>
                  {property.status}
                </span>
              </p>

              <button
                style={{
                  marginTop: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {rentals.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            No Rented Properties Found
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRental;