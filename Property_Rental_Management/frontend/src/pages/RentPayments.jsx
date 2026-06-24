import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/payments";

function RentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newPayment, setNewPayment] = useState({
    month: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewPayment({
      ...newPayment,
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
        body: JSON.stringify(newPayment),
      });

      if (!res.ok) throw new Error("Failed to add payment");

      const savedPayment = await res.json();
      setPayments([...payments, savedPayment]);

      setNewPayment({
        month: "",
        amount: "",
        status: "Pending",
      });

      setShowForm(false);
      alert("Payment Record Added");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayRent = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to update payment");

      const updated = await res.json();

      setPayments(
        payments.map((p) => (p._id === updated._id ? updated : p))
      );

      alert("Rent Payment Successful");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this payment record?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete payment");

    setPayments(payments.filter((p) => p._id !== id));
  } catch (err) {
    alert(err.message);
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
        <h2>Rent Payments</h2>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + New Payment
        </button>
      </div>

      {/* Popup Modal */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>New Payment</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="month"
                placeholder="Month (e.g. April)"
                value={newPayment.month}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newPayment.amount}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
              />

              <select
                name="status"
                value={newPayment.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  boxSizing: "border-box",
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Adding..." : "Add Payment"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1,
                    background: "#e5e7eb",
                    color: "#111",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        {loading ? (
          <p>Loading payments...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : payments.length === 0 ? (
          <p>No payment records yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "15px" }}>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td style={{ padding: "15px" }}>{payment.month}</td>

                  <td>₹{payment.amount}</td>

                  <td
                    style={{
                      color: payment.status === "Paid" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {payment.status}
                  </td>

                  <td>{payment.paymentDate}</td>

                  <td>
  {payment.status === "Pending" ? (
    <button
      onClick={() => handlePayRent(payment._id)}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px 15px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Pay Rent
    </button>
  ) : (
    <button
      onClick={() => handleDelete(payment._id)}
      style={{
        background: "#dc2626",
        color: "#fff",
        border: "none",
        padding: "8px 15px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  )}
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

export default RentPayments;