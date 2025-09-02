
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const { backendUrl } = useContext(AppContent);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/issues", { withCredentials: true });
        setIssues(res.data.issues || []);
      } catch (err) {
        setError("Failed to load issues.");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [backendUrl]);

  return (
    <div className="my-issues-container">
      <h2>My Reported Issues</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : issues.length === 0 ? (
        <div>No issues reported yet.</div>
      ) : (
        <div className="issues-list">
          {issues.map((issue) => (
            <div key={issue._id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              {issue.images && issue.images.length > 0 && (
                <div className="issue-images">
                  {issue.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${backendUrl}/uploads/${img}`}
                      alt="issue"
                      style={{ width: 80, height: 80, objectFit: "cover", marginRight: 8 }}
                    />
                  ))}
                </div>
              )}
              <div className="issue-meta">
                <span>Reported: {new Date(issue.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
