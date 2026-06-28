import { useState, useEffect } from "react";

const API_URL = "https://property-rental-management-w3uf.onrender.com/api/maintenance"; // adjust to your backend port

function Maintenance() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
  });

  // Fetch all requests on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch maintenance requests");
      const data = await res.json();
      setRequests(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleComplete = async (id) => {
  const confirmed = window.confirm("Mark this request as completed? This will remove it from the list.");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to mark as completed");

    setRequests(requests.filter((req) => req._id !== id));
  } catch (err) {
    alert(err.message);
  }
};


  const handleChange = (e) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      const savedRequest = await res.json();

      // Add new request to top of list
      setRequests([savedRequest, ...requests]);

      setNewRequest({
        title: "",
        description: "",
      });

      setShowForm(false);
      alert("Maintenance Request Submitted");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
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
          marginBottom: "20px",
        }}
      >
        <h2>Maintenance Requests</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + New Request
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Issue Title"
              value={newRequest.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <textarea
              name="description"
              placeholder="Issue Description"
              value={newRequest.description}
              onChange={handleChange}
              required
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        {loading ? (
          <p>Loading maintenance requests...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : requests.length === 0 ? (
          <p>No maintenance requests yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "15px" }}>Issue</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td style={{ padding: "15px" }}>{request.title}</td>

                  <td>{request.description}</td>

                  <td>{request.date}</td>

                  <td style={{ color: "orange", fontWeight: "bold" }}>
                    Pending
                  </td>

                  <td>
                    <button
                      onClick={() => handleComplete(request._id)}
                      style={{
                        background: "#16a34a",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Mark Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Maintenance;