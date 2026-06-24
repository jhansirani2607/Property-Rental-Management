import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaPlusCircle,
  FaKey,
  FaMoneyBillWave,
  FaTools,
  FaUser,
  FaPowerOff,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Properties",
      path: "/dashboard/properties",
      icon: <FaBuilding />,
    },
    {
      name: "Add Property",
      path: "/dashboard/add-property",
      icon: <FaPlusCircle />,
    },
    {
      name: "My Rentals",
      path: "/dashboard/myrental",
      icon: <FaKey />,
    },
    {
      name: "Rent Payments",
      path: "/dashboard/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Maintenance",
      path: "/dashboard/maintenance",
      icon: <FaTools />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        paddingTop: "20px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          borderBottom: "1px solid #334155",
          paddingBottom: "20px",
        }}
      >
        <h2>🏠 RentalMS</h2>
      </div>

      {/* Menu */}
      <div>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "15px 20px",
              color:
                location.pathname === item.path
                  ? "#38bdf8"
                  : "white",
              textDecoration: "none",
              background:
                location.pathname === item.path
                  ? "#1e293b"
                  : "transparent",
              transition: "0.3s",
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "15px 20px",
            color: "#16a34a",
            background: "transparent",
            border: "none",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            marginTop: "10px",
            borderTop: "1px solid #334155",
          }}
        >
          <FaPowerOff /> Logout 
        </button>
      </div>
    </div>
  );
}

export default Sidebar;