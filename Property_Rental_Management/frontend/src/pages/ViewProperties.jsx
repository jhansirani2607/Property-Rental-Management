import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProperties,
  deleteProperty,
} from "../services/propertyApi";

function ViewProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      setProperties(
        properties.filter(
          (property) => property._id !== id
        )
      );

      alert("Property Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Property");
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2>Properties</h2>

        <Link
          to="/dashboard/add-property"
          style={{
            textDecoration: "none",
            background: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: "8px",
          }}
        >
          + Add Property
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
         <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>Image</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Property</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Location</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Rent</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((property) => (
              <tr key={property._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "15px", verticalAlign: "middle" }}>
                  <img
                    src={property.image || "https://via.placeholder.com/80"}
                    alt="property"
                    width="80"
                    height="60"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </td>

                <td style={{ padding: "15px", verticalAlign: "middle" }}>
                  {property.title}
                </td>

                <td style={{ padding: "15px", verticalAlign: "middle" }}>
                  {property.city}
                </td>

                <td style={{ padding: "15px", verticalAlign: "middle" }}>
                  ₹{property.rent}
                </td>

                <td style={{ padding: "15px", verticalAlign: "middle" }}>
                  <span
                    style={{
                      color: property.status === "Available" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {property.status}
                  </span>
                </td>

                <td style={{ padding: "15px", verticalAlign: "middle", whiteSpace: "nowrap" }}>
                  <Link
                    to={`/dashboard/edit-property/${property._id}`}
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(property._id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {properties.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Properties Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProperties;