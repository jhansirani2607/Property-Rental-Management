import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import MyRental from "./pages/MyRental";
import RentPayments from "./pages/RentPayments";
import Maintenance from "./pages/Maintenance";
import Profile from "./pages/Profile";

import AddProperty from "./pages/AddProperty";
import ViewProperties from "./pages/ViewProperties";
import EditProperty from "./pages/EditProperty";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED DASHBOARD ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="myrental" element={<MyRental />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="properties" element={<ViewProperties />} />
          <Route path="edit-property/:id" element={<EditProperty />} />
          <Route path="payments" element={<RentPayments />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;