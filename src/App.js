import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";

import CustomerRegister from "./CustomerRegister";
import CustomerLogin from "./CustomerLogin";
import CustomerDashboard from "./CustomerDashboard";
import Vehicle from "./Vehicle";
import ViewVehicle from "./ViewVehicle";
// import CustomerViewProfile from "./CustomerViewProfile";
// import CustomerEditProfile from "./CustomerEditProfile";

import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import RegisterServiceCenter from "./RegisterServiceCenter";
import ViewServiceCenterStatus from "./ViewServiceCenterStatus";
// import AdminViewProfile from "./AdminViewProfile";
// import AdminEditProfile from "./AdminEditProfile";

import SuperAdminLogin from "./SuperAdminLogin";
import SuperAdminDashboard from "./SuperAdminDashboard";
import CenterApproval from "./CenterApproval";
import ApprovedRequest from "./ApprovedRequest";
import RejectedRequest from "./RejectedRequest";
import SuperAdminViewCenters from "./SuperAdminViewCenters";
// import SuperAdminViewProfile from "./SuperAdminViewProfile";
// import SuperAdminEditProfile from "./SuperAdminEditProfile";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* SuperAdmin Side */}
          <Route path="/superadmin-login" element={<SuperAdminLogin />} />
          <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/center-approval" element={<CenterApproval />} />
          <Route path="/approvedrequest" element={<ApprovedRequest />} />
          <Route path="/rejectedrequest" element={<RejectedRequest />} />
          <Route path="/superadmin-viewcenters" element={<SuperAdminViewCenters />} />

          {/* <Route path="/view-superadmin" element={<SuperAdminViewProfile />} />
          <Route path="/edit-superadmin" element={<SuperAdminEditProfile />} /> */}
         
          {/* Admin Side */}
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register-service-center" element={<RegisterServiceCenter />} />
          <Route path="/view-servicecenterstatus" element={<ViewServiceCenterStatus />} />
          {/* <Route path="/view-admin" element={<AdminViewProfile />} />
          <Route path="/edit-admin" element={<AdminEditProfile />} /> */}
         
          {/* Customer Side */}
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/view-vehicle" element={<ViewVehicle />} />
          {/* <Route path="/cusprofile" element={<CustomerViewProfile />} />
          <Route path="/edit-cusprofile" element={<CustomerEditProfile />} /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
