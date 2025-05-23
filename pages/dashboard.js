"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout, isAuthenticated } from "../utils/auth";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadMessage("Upload successful!");
      setExtractedSkills(response.data.extractedSkills);

      // Fetch job recommendations
      fetchJobRecommendations(response.data.extractedSkills);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("Upload failed! Try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchJobRecommendations = async (skills) => {
    if (!skills || skills.length === 0) return;

    try {
      const response = await axios.post(`http://localhost:5000/recommendations`, { skills });
      setJobRecommendations(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching job recommendations:", error);
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        
        {/* Resume Upload Section */}
        <div className="upload-section">
          <h3>Upload Your Resume</h3>
          <input type="file" id="file-upload" onChange={handleFileChange} hidden />
          <label htmlFor="file-upload" className="file-upload-label">Choose File</label>
          {file && <p className="file-name">Selected File: {file.name}</p>}
          <button className="upload-button" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
        </div>

        {/* Extracted Skills Section */}
        <div className="skills-section">
          <h3>Extracted Skills</h3>
          {extractedSkills.length > 0 ? (
            <ul>
              {extractedSkills.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills extracted</p>
          )}
        </div>

        {/* Job Recommendations Section */}
        <div className="recommendations-section">
          <h3>Job Recommendations</h3>
          {jobRecommendations.length > 0 ? (
            <ul>
              {jobRecommendations.map((job, index) => (
                <li key={index} className="job-item">
                  <strong>{job.title}</strong> at {job.company}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available</p>
          )}
        </div>
      </div>
    </div>
  );
}