import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Hhome from "./pages/Hhome.jsx";
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';
import MyReports from './pages/citizen/MyReports.jsx';
import ReportIssue from './pages/citizen/ReportIssue.jsx';
import NotFound from "./pages/NotFound.jsx";
import MapView from './pages/citizen/MapView.jsx';
import Feedback from './pages/citizen/Feedback.jsx';

function App() {
  return (  
    <Router>
      <Routes>
        {/* frontend route */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Hhome />} />

        <Route path="/myreports" element={<MyReports />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
