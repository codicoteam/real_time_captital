// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin_Pages/Dashboard";
import Users from "./pages/Admin_Pages/Users";
import LoanManagement from "./pages/Admin_Pages/Loan_management";
import LoanTracking from "./pages/Admin_Pages/loan_tracking";
import Settings from "./pages/Admin_Pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/loan-tracking" element={<LoanTracking />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
