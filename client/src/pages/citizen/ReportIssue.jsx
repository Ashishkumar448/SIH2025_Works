
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";

const ReportIssue = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: '', lng: '', address: '' });
  const [locError, setLocError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      setError("You can upload up to 3 images only.");
      return;
    }
    setImages([...e.target.files]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
  formData.append("category", category);
  formData.append("location", JSON.stringify(location));
  images.forEach((img) => formData.append("images", img));
      const res = await axios.post(backendUrl + "/api/issues", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Issue reported successfully!");
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to report issue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-container">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit} className="report-issue-form">
        <label>Title<span style={{color:'red'}}>*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter issue title"
        />
        <label>Category<span style={{color:'red'}}>*</span></label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="slums">Slums</option>
          <option value="potholes">Potholes</option>
          <option value="garbage">Garbage</option>
          <option value="open drains">Open Drains</option>
          <option value="broken streetlights">Broken Streetlights</option>
          <option value="stray animals">Stray Animals</option>
          <option value="polluted water bodies">Polluted Water Bodies</option>
          <option value="air pollution">Air Pollution</option>
        </select>
        <label>Location<span style={{color:'red'}}>*</span></label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input
            type="text"
            value={location.address}
            onChange={e => setLocation({ ...location, address: e.target.value })}
            placeholder="Enter address or use current location"
            required
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={async () => {
              setLocError("");
              if (!navigator.geolocation) {
                setLocError("Geolocation is not supported by your browser.");
                return;
              }
              navigator.geolocation.getCurrentPosition(
                async (pos) => {
                  const lat = pos.coords.latitude;
                  const lng = pos.coords.longitude;
                  let address = '';
                  try {
                    // Use OpenStreetMap Nominatim API for reverse geocoding
                    const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                    const data = await resp.json();
                    address = data.display_name || '';
                  } catch (e) {
                    address = '';
                  }
                  setLocation(loc => ({ ...loc, lat, lng, address }));
                },
                (err) => {
                  setLocError("Failed to get current location.");
                }
              );
            }}
            style={{ padding: '4px 10px', fontSize: 12 }}
          >
            Use Current Location
          </button>
        </div>
        {locError && <div className="error-message">{locError}</div>}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue (optional)"
        />
        <label>Upload Images (max 3)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        {images.length > 0 && (
          <div className="preview-images">
            {Array.from(images).map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                style={{ width: 80, height: 80, objectFit: "cover", marginRight: 8 }}
              />
            ))}
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Reporting..." : "Report Issue"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
