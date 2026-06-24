import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout() {
  return (
    <div>
    <Header />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main
          style={{
            marginLeft: "250px",
            // marginTop: "80px", // if header is fixed
            padding: "20px",
            background: "#f5f5f5",
            minHeight: "100vh",
            width: "calc(100% - 250px)",
          }}
        >
          <Outlet />
        </main>
      </div>

     
    </div>
     <Footer />
     </div>
  );
}

export default DashboardLayout;