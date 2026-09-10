import React, { useState, useEffect, useRef } from "react";
import { getFileUrl } from "../utils/fileUrlHelper";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL;

const CATEGORIES = ["All", "Academic", "Fee", "Syllabus", "Timetable", "Prospectus", "Other"];

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("All");
  const [uploading, setUploading] = useState(null); // document_key being uploaded
  const uploadingDocKey = useRef(null);
  const fileInputRef = useRef(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => { fetchDocuments(); }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/documents`, { credentials: "include" });
      const data = await res.json();
      if (data.documents) setDocuments(data.documents);
    } catch (err) {
      console.error("Failed to fetch documents", err);
      showToast("Failed to load documents.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadingDocKey.current) return;
    setUploading(uploadingDocKey.current);
    showToast(`Uploading ${file.name}...`, "info", 8000);

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/documents/${uploadingDocKey.current}`, {
        method: "PUT",
        credentials: "include",
        body: formData
      });
      if (res.ok) {
        showToast("Document updated successfully!", "success");
        fetchDocuments();
      } else {
        showToast("Upload failed. Check server.", "error");
      }
    } catch (err) {
      console.error("Failed to upload document", err);
      showToast("Upload error: " + err.message, "error");
    } finally {
      setUploading(null);
      uploadingDocKey.current = null;
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filtered = filterCat === "All" ? documents : documents.filter(d => d.category === filterCat);

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer />
      <input type="file" ref={fileInputRef} onChange={handleDocUpload} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" style={{ display: "none" }} />

      <div className="document-upload-area" style={{ background: "rgba(56,189,248,0.05)", borderColor: "rgba(56,189,248,0.2)", marginBottom: "1.5rem" }}>
        <svg className="document-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
        <h3 style={{ color: "var(--ink-900)", marginBottom: "0.5rem" }}>System Document Manager</h3>
        <p style={{ color: "var(--ink-500)", margin: 0, maxWidth: "520px", marginInline: "auto" }}>
          Manage the permanent, structural documents of the website (Fee Structures, Syllabuses, Timetables). Click <strong>Update File</strong> on any row to replace it globally across the site.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>Website Documents ({documents.length})</h2>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{
              padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              background: filterCat === cat ? "var(--brand-teal)" : "var(--surface-muted)",
              color: filterCat === cat ? "#fff" : "var(--ink-700)",
              border: filterCat === cat ? "none" : "1px solid var(--border)",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="admin-activity-panel">
        <table className="admin-table">
          <thead>
            <tr><th>Document Name</th><th>Category</th><th>Last Updated</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>Loading documents...</td></tr>
            ) : filtered.length > 0 ? filtered.map(doc => (
              <tr key={doc.document_key}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <div>
                      <span style={{ fontWeight: 500, color: "var(--ink-900)", display: "block" }}>{doc.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--ink-300)" }}>{doc.document_key}</span>
                    </div>
                  </div>
                  {doc.filePath
                    ? <a href={getFileUrl(doc.filePath)} target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", color: "var(--brand-amber)", marginTop: "0.25rem", display: "inline-block" }}>View Current File</a>
                    : <span style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "0.25rem", display: "inline-block" }}>No file attached</span>}
                </td>
                <td><span className="admin-tag">{doc.category}</span></td>
                <td style={{ fontSize: "0.82rem", color: "var(--ink-500)" }}>{doc.updatedAt || "—"}</td>
                <td>
                  {doc.filePath
                    ? <span className="status-badge status-active">Uploaded</span>
                    : <span className="status-badge status-expired">Missing</span>}
                </td>
                <td>
                  <button
                    onClick={() => { uploadingDocKey.current = doc.document_key; fileInputRef.current?.click(); }}
                    className="admin-btn outline"
                    disabled={uploading === doc.document_key}
                    style={{ padding: "0.3rem 0.85rem", fontSize: "0.875rem" }}
                  >
                    {uploading === doc.document_key ? "Uploading..." : "Update File"}
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>
                {filterCat !== "All" ? `No documents in "${filterCat}" category.` : "No documents configured yet."}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;