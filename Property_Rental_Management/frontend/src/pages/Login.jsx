import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import propertyImg from "../assets/property.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("https://property-rental-management-w3uf.onrender.com/api/login", {
        email,
        password,
      });
  
      // ✅ save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
  
      alert(res.data.message);
      setMessage("");
  
      // ✅ go to dashboard
      navigate("/dashboard");
  
    } catch (err) {
      setMessage("Invalid Email or Password");
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
              Manage Properties.
              <br />
              Tenants.
              <br />
              Payments.
            </h2>

            <p style={styles.description}>
              Complete solution to manage rental properties, leases, tenants,
              and rent payments efficiently.
            </p>

            <div style={styles.features}>
              <div>
                <span style={styles.icon}>🏢</span>
                <p>Property</p>
              </div>

              <div>
                <span style={styles.icon}>👨‍💼</span>
                <p>Tenant</p>
              </div>

              <div>
                <span style={styles.icon}>📄</span>
                <p>Lease</p>
              </div>

              <div>
                <span style={styles.icon}>💰</span>
                <p>Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div style={styles.right}>
          <div style={styles.loginCard}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div style={styles.house}>🏡</div>

              <h2 style={{ marginBottom: 8 }}>Welcome Back!</h2>

              <p style={{ color: "#777" }}>
                Sign in to access your dashboard
              </p>
            </div>

            {message && (
              <div style={styles.error}>{message}</div>
            )}

            <form onSubmit={handleLogin}>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />

              <div style={styles.row}>
                <div>
                  <input type="checkbox" /> Remember me
                </div>

                <Link
                  to="/forgot-password"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" style={styles.button}>
                Sign In
              </button>
            </form>

            <div style={styles.divider}>
              <span>OR</span>
            </div>

            <button style={styles.googleBtn}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt=""
                width="22"
              />
              Continue with Google
            </button>

            <p style={styles.signup}>
               Don't have an account?
               <Link
                    to="/register"
                    style={{
                    color: "#2563eb",
                    marginLeft: 5,
                    textDecoration: "none",
                    fontWeight: "bold",
                    }}
                >
               Sign Up
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
  flex: 1,   // reduced from 1.2
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  display: "flex",
  alignItems: "center",
},

right: {
  flex: 1,   // increase right side to balance
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8fafc",
},

  overlay: {
    padding: 60,
  },

  logo: {
    fontSize: 36,
    marginBottom: 60,
  },

  heading: {
    fontSize: 52,
    lineHeight: 1.2,
    marginBottom: 25,
  },

  description: {
    width: "80%",
    fontSize: 18,
    lineHeight: 1.7,
    marginBottom: 70,
  },

  features: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    textAlign: "center",
    fontSize: 15,
  },

  icon: {
    fontSize: 40,
  },

  

  loginCard: {
    width: "80%",
    background: "#fff",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,.08)",
  },

  house: {
    fontSize: 55,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    padding: 14,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    fontSize: 14,
  },

  button: {
    width: "100%",
    padding: 15,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "bold",
    cursor: "pointer",
  },

  divider: {
    textAlign: "center",
    margin: "25px 0",
    color: "#888",
    position: "relative",
  },

  googleBtn: {
    width: "100%",
    padding: 13,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    fontSize: 15,
  },

  signup: {
    marginTop: 25,
    textAlign: "center",
  },

  error: {
    background: "#ffe5e5",
    color: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
};

export default Login;