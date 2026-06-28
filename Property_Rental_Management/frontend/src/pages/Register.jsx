import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import propertyImg from "../assets/property.png";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://property-rental-management-w3uf.onrender.com/api/register",
        { fullName, email, password }
      );

      alert(res.data.message);
      setFullName("");
      setEmail("");
      setPassword("");
      setMessage("");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* LEFT SIDE */}
        <div
          style={{
            ...styles.left,
            backgroundImage: `linear-gradient(rgba(22,55,120,0.55),rgba(22,55,120,0.55)),url(${propertyImg})`,
          }}
        >
          <div style={styles.overlay}>
            <h1 style={styles.logo}>🏠 Property Rental</h1>

            <h2 style={styles.heading}>
              Join Us.
              <br />
              Manage Properties.
              <br />
              Easily.
            </h2>

            <p style={styles.description}>
              Create your account and start managing properties, tenants,
              and rent payments in one place.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <div style={styles.loginCard}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <div style={styles.house}>🏡</div>
              <h2>Create Account</h2>
              <p style={{ color: "#777" }}>
                Sign up to get started
              </p>
            </div>

            {message && <div style={styles.error}>{message}</div>}

            <form onSubmit={handleRegister}>
              <label>Full Name</label>
              <input
                style={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
              />

              <label>Email</label>
              <input
                style={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />

              <label>Password</label>
              <input
                style={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <button type="submit" style={styles.button}>
                Sign Up
              </button>
            </form>

            <p style={styles.signup}>
              Already have an account?
              <Link to="/login" style={{ color: "#2563eb", marginLeft: 5 }}>
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    padding: 20,
  },

  card: {
    display: "flex",
    width: "1200px",
    height: "720px",
    borderRadius: 25,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 25px 60px rgba(0,0,0,.25)",
  },

  left: {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    display: "flex",
    alignItems: "center",
  },

  overlay: {
    padding: 60,
  },

  logo: {
    fontSize: 36,
    marginBottom: 60,
  },

  heading: {
    fontSize: 48,
    lineHeight: 1.2,
    marginBottom: 25,
  },

  description: {
    width: "85%",
    fontSize: 18,
    lineHeight: 1.7,
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  loginCard: {
    width: "80%",
    background: "#fff",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,.08)",
  },

  house: {
    fontSize: 50,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    padding: 14,
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 15,
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 15,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    background: "#ffe5e5",
    color: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },

  signup: {
    textAlign: "center",
    marginTop: 20,
  },
};

export default Register;