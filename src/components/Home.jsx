import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";
import "./Home.css";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setConvert("");
    setDownloadError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }

    setLoading(true);
    setConvert("");
    setDownloadError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://app.aspireths.com/convertFile",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

      setSelectedFile(null);
      setConvert("File Converted Successfully ✔️");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDownloadError("Error: " + error.response.data.message);
      } else {
        setDownloadError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Convert Word to PDF Online</h1>
        <p>Easily convert Word documents to PDF format without installing software.</p>

        <div className="content">
          <input
            type="file"
            accept=".doc,.docx"
            onChange={handleFileChange}
            className="fileInput"
            id="FileInput"
          />

          <label htmlFor="FileInput" className="fileLabel">
            <FaFileWord className="fileIcon" />
            <span>{selectedFile ? selectedFile.name : "Choose Word File"}</span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
            className="convertBtn"
          >
            {loading ? "Converting..." : "Convert File"}
          </button>

          {convert && <div className="success">{convert}</div>}
          {downloadError && <div className="error">{downloadError}</div>}
        </div>
      </div>
    </div>
  );
}

export default Home;
