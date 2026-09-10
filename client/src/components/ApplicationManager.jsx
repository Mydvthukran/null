import React, { useState, useEffect } from "react";
import "../css/adminDashboard.css";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL;

const exportCSV = (rows, filename) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h] ?? "").toString().replace(/"/g, "'")}"`.replace(/\n/g, " ")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { showToast, ToastContainer } = useToast();

  useEffect(() => { fetchApplications(); }, []);

  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers, credentials: "include" });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) { console.error("API Error:", err); return null; }
  };

  const fetchApplications = async () => {
    const data = await apiCall("/applications");
    if (data) setApplications(data.applications || []);
  };

  const handleStatusChange = async (id, status) => {
    const result = await apiCall(`/applications/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
    if (result !== null) {
      showToast(`Status updated to "${status}"`, "success");
      fetchApplications();
    } else {
      showToast("Failed to update status.", "error");
    }
  };

  const filtered = applications.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.course || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="admin-activity-panel" style={{ position: "relative" }}>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, color: "var(--ink-900)" }}>Admission Applications</h2>
        <button
          className="admin-btn outline"
          onClick={() => exportCSV(filtered.map(a => ({ ID: a.id, Name: a.name, Course: a.course, Date: a.date, Status: a.status })), "applications.csv")}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {Object.entries(statusCounts).map(([s, c]) => (
          <div key={s} style={{ background: "var(--surface-muted)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-700)", cursor: "pointer", borderBottom: filterStatus === s ? "2px solid var(--brand-amber)" : undefined }} onClick={() => setFilterStatus(s === filterStatus ? "All" : s)}>
            {s}: {c}
          </div>
        ))}
      </div>

      <div className="admin-filter-bar">
        <input type="text" placeholder="Search by name or course..." value={search} onChange={e => setSearch(e.target.value)} className="admin-search-input" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
          <option value="All">All Statuses</option>
          <option value="Under Review">Under Review</option>
          <option value="Missing Docs">Missing Docs</option>
          <option value="Waitlisted">Waitlisted</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <span style={{ fontSize: "0.8rem", color: "var(--ink-500)", whiteSpace: "nowrap", alignSelf: "center" }}>{filtered.length} / {applications.length}</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Course</th><th>Date</th><th>Status</th><th>Update Status</th></tr>
          </thead>
          <tbody>
            {filtered.map(app => (
              <tr key={app.id}>
                <td style={{ color: "var(--ink-300)", fontSize: "0.8rem" }}>#{app.id}</td>
                <td style={{ fontWeight: 500 }}>{app.name}</td>
                <td>{app.course}</td>
                <td>{app.date}</td>
                <td><span className={`status-badge ${app.status === "Accepted" ? "status-active" : app.status === "Rejected" ? "status-expired" : "status-pending"}`}>{app.status}</span></td>
                <td>
                  <select value={app.status} onChange={e => handleStatusChange(app.id, e.target.value)} style={{ background: "var(--surface)", color: "var(--brand-amber)", border: "1px solid var(--border-strong)", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", cursor: "pointer", outline: "none" }}>
                    <option value="Under Review">Under Review</option>
                    <option value="Missing Docs">Missing Docs</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>No applications found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationManager;