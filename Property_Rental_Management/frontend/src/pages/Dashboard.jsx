import { useEffect, useState } from "react";

import {
  FaHome,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTools,
} from "react-icons/fa";

import { getDashboardStats } from "../services/propertyService";

function Dashboard() {

   const user = JSON.parse(localStorage.getItem("user"));
   const [stats, setStats] = useState({
    totalProperties: 0,
    rentedProperties: 0,
    availableProperties: 0,
    recentProperties: [],
    pendingMaintenanceCount: 0,
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadActivities();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadActivities = async () => {
    try {
      const res = await fetch("https://property-rental-management-w3uf.onrender.com/api/activities");
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        // marginLeft: "260px",
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Welcome Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#0f172a" }}>
          Welcome Back, {user?.fullName || "Admin"} 👋
        </h2>

        <p style={{ color: "gray" }}>
          Manage your properties, rentals, payments and maintenance requests from one place.
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {/* Total Properties */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <FaHome size={35} color="#2563eb" />
          <h3>Total Properties</h3>
          <h2>{stats.totalProperties}</h2>
          <p style={{ color: "gray" }}>Registered Properties</p>
        </div>

        {/* Rented Properties */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <FaMoneyBillWave size={35} color="green" />
          <h3>Rented Properties</h3>
          <h2>{stats.rentedProperties}</h2>
          <p style={{ color: "gray" }}>Currently Occupied</p>
        </div>

        {/* Available Properties */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <FaCalendarAlt size={35} color="orange" />
          <h3>Available Properties</h3>
          <h2>{stats.availableProperties}</h2>
          <p style={{ color: "gray" }}>Ready For Rent</p>
        </div>

        {/* Maintenance Requests */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <FaTools size={35} color="red" />
          <h3>Maintenance Requests</h3>
          <h2>{stats.pendingMaintenanceCount}</h2>
          <p style={{ color: "gray" }}>Pending Issues</p>
        </div>
      </div>

      {/* Recent Properties */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Recent Properties
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={{ padding: "15px" }}>Property</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentProperties.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No properties yet
                </td>
              </tr>
            ) : (
              stats.recentProperties.map((property) => (
                <tr key={property._id}>
                  <td style={{ padding: "15px" }}>{property.title}</td>
                  <td>{property.city}</td>
                  <td>₹{property.rent}</td>
                  <td
                    style={{
                      color: property.status === "Available" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {property.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Recent Activities */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Recent Activities
        </h3>

        <ul style={{ lineHeight: "2" }}>
          {activities.length === 0 ? (
            <li style={{ color: "gray" }}>No recent activity yet</li>
          ) : (
            activities.map((activity) => (
              <li key={activity._id}>
                {activity.icon} {activity.message}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;