import { useState } from "react";
 import axios from "axios";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

 

const handleUpdateProfile = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const { fullName, email, phone, address, currentPassword, newPassword } = profile;

    const res = await axios.put(
      `https://property-rental-management-w3uf.onrender.com/api/users/${user.id}`,
      {
        fullName,
        email,
        phone,
        address,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Updated:", res.data);

    localStorage.setItem("user", JSON.stringify(res.data.user || res.data));

    alert("Profile Updated Successfully");
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
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
        maxWidth: "900px",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>
        My Profile
      </h2>

      {/* Profile Image */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          width="100"
          height="100"
          style={{
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />

        <div>
          <h3>{profile.fullName}</h3>
          <p style={{ color: "gray" }}>
            {profile.email}
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
          }}
        >
          <div>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div>
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>
        </div>

        {/* Password Section */}
        <h3 style={{ marginTop: "30px" }}>
          Change Password
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
            marginTop: "15px",
          }}
        >
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={profile.currentPassword}
            onChange={handleChange}
            style={{
              padding: "10px",
            }}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={profile.newPassword}
            onChange={handleChange}
            style={{
              padding: "10px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;