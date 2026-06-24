import { Link } from "react-router-dom";
import '../Home.css';

function Home() {
  const highlightSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      section.classList.add("section-highlight");

      setTimeout(() => {
        section.classList.remove("section-highlight");
      }, 1500);
    }
  };
  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4 shadow sticky-top"  style={{ minHeight: "80px" }}>
        <Link className="navbar-brand fw-bold" to="/">
          🏠 RentEase
        </Link>

        <div className="d-flex gap-4">
          <a
            className="nav-link text-white"
            href="#properties"
            onClick={() => highlightSection("properties")}
          >
            Properties
          </a>

          <a
            className="nav-link text-white"
            href="#features"
            onClick={() => highlightSection("features")}
          >
            Features
          </a>

          <a
            className="nav-link text-white"
            href="#contact"
            onClick={() => highlightSection("contact")}
          >
            Contact
          </a>

          <a
            className="nav-link text-white"
            href="#help"
            onClick={() => highlightSection("help")}
          >
            Help
          </a>

          <Link className="btn btn-light fw-bold" to="/login">Login</Link>
          <Link className="btn btn-warning fw-bold" to="/register">Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <div
        id="home"
        style={{
          height: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "12px"
          }}
        >
          <h1 className="fw-bold">
            Find Your Dream Rental Home
          </h1>

          <p className="lead">
            Search • Rent • Live Comfortably
          </p>

          <Link to="/register" className="btn btn-warning mt-3 fw-bold">
            Get Started
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="container text-center py-4">
        <div className="row">

          <div className="col-md-3">
            <h2 className="fw-bold text-primary">1200+</h2>
            <p>Verified Listings</p>
          </div>

          <div className="col-md-3">
            <h2 className="fw-bold text-primary">800+</h2>
            <p>Happy Tenants</p>
          </div>

          <div className="col-md-3">
            <h2 className="fw-bold text-primary">500+</h2>
            <p>Owners</p>
          </div>

          <div className="col-md-3">
            <h2 className="fw-bold text-primary">24/7</h2>
            <p>Support</p>
          </div>

        </div>
      </div>

      {/* FEATURED SECTION (like Rentsy cards) */}
      
      <div id="features" className="pt-0 pb-0"  style={{
          background: "linear-gradient(to right, #e0f7fa, #e8f5e9)"
           }}>
        <div className="container">
          <div id="properties" className="container py-5">
        <h2 className="fw-bold text-center mb-4">Featured Properties</h2>

        <div className="row g-4">

          {[
            {
              title: "2 Room Set for RENT",
              city: "New Ashok Nagar",
              price: "₹14,000",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
              tag: "FLAT",
              beds: 2,
              baths: 1
            },
            {
              title: "Small Shop for Rent",
              city: "New Ashok Nagar",
              price: "₹15,000",
              img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
              tag: "SHOP",
              beds: 0,
              baths: 1
            },
            {
              title: "1 Room Set Near Noida",
              city: "Noida",
              price: "₹7,000",
              img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
              tag: "ROOM",
              beds: 1,
              baths: 1
            }
          ].map((item, i) => (

            <div className="col-md-4" key={i}>
              <div className="card property-card border-0 shadow-lg position-relative">

                {/* IMAGE */}
                <img src={item.img} className="card-img-top" />

                {/* TAG */}
                <span className="badge bg-dark position-absolute top-0 start-0 m-2 badge-tag">
                  {item.tag}
                </span>

                {/* GOLD BADGE (like screenshot) */}
                <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                  GOLD
                </span>

                <div className="card-body">

                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted mb-2">{item.city}</p>

                  {/* ICONS ROW */}
                  <div className="icon-row mb-2">
                    <span>🛏️ {item.beds}</span>
                    <span>🚿 {item.baths}</span>
                    <span>📍 Map</span>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="d-flex justify-content-between align-items-center">

                    <h6 className="text-primary fw-bold m-0">
                      {item.price}
                    </h6>

                    <div className="d-flex gap-3">
                      <span className="icon-heart">❤️</span>
                      <span>📌</span>
                      <span>📤</span>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          ))}

        </div>
      </div>

    <div
        className="container py-5"
        style={{
          background: "#f0fdf4",
          borderRadius: "15px"
        }}
      >
      <h2 className="fw-bold mb-4">
        Live Better, Rent Smarter
      </h2>

      <div className="row g-3 px-3">

        <div className="col-md-3">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
            className="img-fluid rounded shadow"
            alt=""
          />
        </div>

        <div className="col-md-3">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            className="img-fluid rounded shadow"
            alt=""
          />
        </div>

        <div className="col-md-3">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            className="img-fluid rounded shadow"
            alt=""
          />
        </div>

        <div className="col-md-3">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
            className="img-fluid rounded shadow"
            alt=""
          />
        </div>

      </div>
    </div>

    {/* TITLE */}
    <div className="text-center mb-5">
      <h2 className="fw-bold display-6">Why RentEase?</h2>
      <p className="text-muted">
        A smarter way to find, rent, and manage properties without stress.
      </p>
    </div>

    {/* CARDS */}
    <div className="row g-4">

      <div className="col-md-4">
        <div className="p-4 bg-white shadow-sm rounded h-100 text-center">
          <div style={{ fontSize: "40px" }}>🛡️</div>
          <h5 className="fw-bold mt-3">Trusted & Verified Listings</h5>
          <p className="text-muted">
            Every property is manually verified to ensure safety, accuracy, and zero fake listings.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-4 bg-white shadow-sm rounded h-100 text-center">
          <div style={{ fontSize: "40px" }}>⚡</div>
          <h5 className="fw-bold mt-3">Instant Connection with Owners</h5>
          <p className="text-muted">
            Contact property owners directly and close deals faster without middlemen delays.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-4 bg-white shadow-sm rounded h-100 text-center">
          <div style={{ fontSize: "40px" }}>🔐</div>
          <h5 className="fw-bold mt-3">Secure & Transparent Process</h5>
          <p className="text-muted">
            Safe rental process with clear agreements and secure communication between users.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* CTA */}
      <div className="container py-5 text-center">
        <div className="bg-dark text-white p-5 rounded">
          <h2 className="fw-bold">Start Renting Today</h2>
          <p>Join thousands of users already using RentEase</p>
          <Link to="/register" className="btn btn-warning fw-bold px-4">
            Create Account
          </Link>
        </div>
      </div>

      {/* CONTACT */}
      <div
        id="contact"
        className="pt-0 pb-0" style={{
          background: "linear-gradient(to right, #e0f7fa, #e8f5e9)"
           }}
      >
        <h2 className="text-center fw-bold mb-5">
          Contact Us
        </h2>

        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="card border-0 shadow-lg overflow-hidden">
              <div className="row g-0">

                {/* LEFT SIDE */}
                <div
                  className="col-md-5 text-white p-5"
                  style={{ backgroundColor: "#212529" }}
                >
                  <h3 className="fw-bold mb-4">
                    Get In Touch
                  </h3>

                  <p>
                    Looking for a rental property? Our team is here to help you.
                  </p>

                  <hr />

                  <p className="mb-3">
                    📞 +91 9876543210
                  </p>

                  <p className="mb-3">
                    📧 support@rentease.com
                  </p>

                  <p>
                    📍 Hyderabad, Telangana
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-7 bg-white p-5">

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Name"
                  />

                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Your Email"
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Subject"
                  />

                  <textarea
                    rows="5"
                    className="form-control mb-4"
                    placeholder="Your Message"
                  ></textarea>

                  <button
                    className="btn w-100 fw-bold"
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#000"
                    }}
                    onClick={() => alert("✅ Message Sent Successfully! We will get back to you soon.")}
                  >
                    Send Message
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div  id="help" className="container-fluid py-5"
          style={{background: "#ede9fe"}}>
        <h2 className="text-center">Help & Support</h2>

       <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>🔑 Login Issues</h3>
              <p>Can't access your account?</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>🏠 Property Issues</h3>
              <p>Problems with listings.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>💳 Payment Help</h3>
              <p>Refunds and billing support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3">
        © 2026 RentEase | Rental Property System
      </footer>

    </div>
  );
}

export default Home;