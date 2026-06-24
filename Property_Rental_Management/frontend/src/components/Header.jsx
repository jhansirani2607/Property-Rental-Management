import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header
      style={{
        marginLeft: "260px",
        height: "80px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section */}
      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontWeight: "700",
          }}
        >
          Welcome 👋
        </h2>

        <p
          style={{
            margin: 0,
            color: "gray",
          }}
        >
          {user?.fullName || "Tenant"}
        </p>
      </div>
      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={42} color="#0f172a" />

          <div>
            <h5
              style={{
                margin: 0,
              }}
            >
              {user?.fullName || "Tenant"}
            </h5>

            <small style={{ color: "gray" }}>
              User
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;