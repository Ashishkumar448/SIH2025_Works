import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPass from "./pages/ResetPass";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { AppContent } from "./context/AppContext";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyIssues from "./pages/citizen/MyIssues";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const { isLoggedin, userData } = useContext(AppContent);
  
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPass />} />
          {isLoggedin && (
            <>
              <Route path="/citizen/report-issue" element={<ReportIssue />} />
              <Route path="/citizen/my-issues" element={<MyIssues />} />
            </>
          )}
          {isLoggedin && userData?.isAdmin && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
        </Routes>
    </div>
  );
};

export default App;
