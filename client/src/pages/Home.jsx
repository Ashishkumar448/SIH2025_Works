
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const Home = () => {
  const { isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Header />
      {isLoggedin && (
        <div className="flex gap-4 mt-8">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/citizen/report-issue")}
          >
            Report an Issue
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => navigate("/citizen/my-issues")}
          >
            View My Issues
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
