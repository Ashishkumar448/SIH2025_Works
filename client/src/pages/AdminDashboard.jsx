import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/issues/admin/analysis",
          { withCredentials: true }
        );
        setAnalysis(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch admin analysis"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [backendUrl]);

  if (loading) return <div>Loading...</div>;
  if (!userData?.isAdmin)
    return <div>Access denied. Admins only.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Issue Analysis</h2>
      <h4>Total Issues: {analysis?.totalIssues}</h4>
      <h4>Category Counts:</h4>
      <ul>
        {analysis?.analysis &&
          Object.entries(analysis.analysis).map(([cat, count]) => (
            <li key={cat}>
              <b>{cat}:</b> {count}
            </li>
          ))}
      </ul>

      <h3 style={{ marginTop: 32 }}>All Issues List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Title</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Description</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Category</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>User ID</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Location</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {analysis?.categorized &&
            Object.entries(analysis.categorized).flatMap(([cat, issues]) =>
              issues.map((issue) => (
                <tr key={issue._id}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.title}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.description}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cat}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.user?._id || issue.user}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>
                    {issue.location && (issue.location.address || (issue.location.lat && issue.location.lng
                      ? `${issue.location.lat}, ${issue.location.lng}`
                      : ''))}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{new Date(issue.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          {analysis?.uncategorized &&
            analysis.uncategorized.map((issue) => (
              <tr key={issue._id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.title}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.description}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>Uncategorized</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{issue.user?._id || issue.user}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>
                  {issue.location && (issue.location.address || (issue.location.lat && issue.location.lng
                    ? `${issue.location.lat}, ${issue.location.lng}`
                    : ''))}
                </td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{new Date(issue.createdAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
