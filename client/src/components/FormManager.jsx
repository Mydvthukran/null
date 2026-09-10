import React, { useState, useEffect } from "react";
import "../css/adminDashboard.css";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL;

const exportCSV = (rows, filename) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h] ?? "").toString().replace(/"/g, "'").replace(/\n/g, " ")}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const FormManager = ({ title = "Contact Us Inquiries" }) => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { showToast, ToastContainer } = useToast();

  useEffect(() => { fetchInquiries(); }, []);

  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers, credentials: "include" });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) { console.error("API Error:", err); return null; }
  };

  const fetchInquiries = async () => {
    const data = await apiCall("/contact");
    if (data) setInquiries(data.inquiries || []);
  };

  const handleStatusChange = async (id, status) => {
    const result = await apiCall(`/contact/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
    if (result !== null) {
      showToast(`Marked as "${status}"`, "success");
      fetchInquiries();
    } else {
      showToast("Failed to update status.", "error");
    }
  };

  const filtered = inquiries.filter(i => {
    const matchSearch =
      (i.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.subject || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.message || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-activity-panel" style={{ position: "relative" }}>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, color: "var(--ink-900)" }}>{title}</h2>
        <button
          className="admin-btn outline"
          onClick={() => exportCSV(filtered.map(i => ({ ID: i.id, Name: i.name, Email: i.email, Phone: i.phone, Subject: i.subject, Message: i.message, Status: i.status, Date: i.created_at })), "contact-forms.csv")}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          Export CSV
        </button>
      </div>

      <div className="admin-filter-bar">
        <input type="text" placeholder="Search by name, email, subject..." value={search} onChange={e => setSearch(e.target.value)} className="admin-search-input" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <span style={{ fontSize: "0.8rem", color: "var(--ink-500)", whiteSpace: "nowrap", alignSelf: "center" }}>{filtered.length} / {inquiries.length}</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map(inq => (
              <tr key={inq.id}>
                <td style={{ color: "var(--ink-300)", fontSize: "0.8rem" }}>#{inq.id}</td>
                <td style={{ fontWeight: 500 }}>{inq.name}</td>
                <td style={{ fontSize: "0.85rem" }}>{inq.email}</td>
                <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.subject}</td>
                <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "0.82rem", color: "var(--ink-500)" }} title={inq.message}>{inq.message}</td>
                <td>
                  <span className={`status-badge ${inq.status === "Resolved" ? "status-active" : inq.status === "In Progress" ? "status-pending" : "status-expired"}`}>
                    {inq.status || "New"}
                  </span>
                </td>
                <td>
                  <select value={inq.status || "New"} onChange={e => handleStatusChange(inq.id, e.target.value)} style={{ background: "var(--surface)", color: "var(--brand-amber)", border: "1px solid var(--border-strong)", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", cursor: "pointer", outline: "none" }}>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>No submissions found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormManager;