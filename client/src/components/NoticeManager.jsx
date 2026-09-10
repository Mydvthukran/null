import React, { useState, useRef, useEffect } from "react";
import "../css/adminDashboard.css";
import { getFileUrl } from "../utils/fileUrlHelper";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL;

const NoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingFilePath, setEditingFilePath] = useState("");
  const [formData, setFormData] = useState({ title: "", date: "", status: "Active", category: "Notice", publish_date: "" });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => { fetchNotices(); }, []);

  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers, credentials: "include" });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) { console.error("API Error:", err); return null; }
  };

  const fetchNotices = async () => {
    const data = await apiCall("/notices/admin");
    if (data) setNotices(data);
  };

  const handleOpenModal = (notice = null) => {
    if (notice) {
      setEditingId(notice.id);
      setEditingFilePath(notice.file_path || "");
      const pDate = notice.publish_date ? new Date(notice.publish_date).toISOString().slice(0, 16) : "";
      setFormData({ title: notice.title, date: notice.date || "", status: notice.status, category: notice.category || "Notice", publish_date: pDate });
    } else {
      setEditingId(null);
      setEditingFilePath("");
      setFormData({ title: "", date: "", status: "Active", category: "Notice", publish_date: "" });
    }
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("status", formData.status);
    data.append("category", formData.category);
    data.append("publish_date", formData.publish_date);
    if (file) data.append("file", file);
    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/notices/${editingId}` : "/notices";
    const result = await apiCall(endpoint, { method, body: data });
    setSaving(false);
    if (result !== null) {
      showToast(editingId ? "Notice updated successfully" : "Notice added successfully", "success");
      setShowModal(false);
      window.dispatchEvent(new CustomEvent("siet:notices-updated"));
      fetchNotices();
    } else {
      showToast("Failed to save notice. Check server connection.", "error");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete notice: "${title}"?`)) return;
    const result = await apiCall(`/notices/${id}`, { method: "DELETE" });
    if (result !== null) {
      showToast("Notice deleted.", "info");
      window.dispatchEvent(new CustomEvent("siet:notices-updated"));
      fetchNotices();
    } else {
      showToast("Failed to delete notice.", "error");
    }
  };

  const filtered = notices.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || n.status === filterStatus;
    const matchCat = filterCategory === "All" || n.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  return (
    <div className="admin-activity-panel" style={{ position: "relative" }}>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, color: "var(--ink-900)" }}>Manage Notices</h2>
        <button className="admin-btn primary" onClick={() => handleOpenModal()}>+ Add Notice</button>
      </div>
      <div className="admin-filter-bar">
        <input type="text" placeholder="Search notices..." value={search} onChange={e => setSearch(e.target.value)} className="admin-search-input" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="admin-filter-select">
          <option value="All">All Categories</option>
          <option value="Notice">Notice</option>
          <option value="Admission">Admission</option>
          <option value="Academic">Academic</option>
          <option value="Fee">Fee</option>
        </select>
        <span style={{ fontSize: "0.8rem", color: "var(--ink-500)", whiteSpace: "nowrap", alignSelf: "center" }}>{filtered.length} / {notices.length}</span>
      </div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Title</th><th>Category</th><th>Date</th><th>Publish Date</th><th>Status</th><th>File</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(n => (
              <tr key={n.id}>
                <td style={{ color: "var(--ink-300)", fontSize: "0.8rem" }}>#{n.id}</td>
                <td style={{ fontWeight: 500 }}>{n.title}</td>
                <td><span className="admin-tag">{n.category}</span></td>
                <td>{n.date}</td>
                <td style={{ fontSize: "0.82rem" }}>{n.publish_date ? new Date(n.publish_date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : <span style={{ color: "var(--ink-300)" }}>Immediate</span>}</td>
                <td><span className={`status-badge ${n.status === "Active" ? "status-active" : "status-pending"}`}>{n.status}</span></td>
                <td>{n.file_path ? <a href={getFileUrl(n.file_path)} target="_blank" rel="noreferrer" style={{ color: "var(--brand-amber)", fontSize: "0.82rem" }}>View File</a> : <span style={{ color: "var(--ink-300)" }}>—</span>}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button onClick={() => handleOpenModal(n)} className="admin-btn outline" style={{ padding: "0.25rem 0.65rem", fontSize: "0.82rem" }}>Edit</button>
                    <button onClick={() => handleDelete(n.id, n.title)} className="admin-btn outline" style={{ padding: "0.25rem 0.65rem", fontSize: "0.82rem", color: "var(--danger)", borderColor: "rgba(206,62,62,0.3)" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>
                {search || filterStatus !== "All" || filterCategory !== "All" ? "No notices match your filter." : "No notices found."}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Notice" : "Add Notice"}</h3>
              <button onClick={() => setShowModal(false)} className="admin-modal-close">&#x2715;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="admin-label">Title *</label>
                <input type="text" placeholder="Notice title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="admin-input">
                    <option value="Notice">Notice</option>
                    <option value="Admission">Admission</option>
                    <option value="Academic">Academic</option>
                    <option value="Fee">Fee</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="admin-input">
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Date</label>
                <input type="text" placeholder="e.g. 10 Sep 2026" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Scheduled Publish Date (optional)</label>
                <input type="datetime-local" value={formData.publish_date} onChange={e => setFormData({...formData, publish_date: e.target.value})} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Attach File (PDF / DOC / PPT / IMG)</label>
                {editingFilePath && !file && (
                  <div style={{ marginBottom: "0.5rem", fontSize: "0.82rem" }}>
                    Current: <a href={getFileUrl(editingFilePath)} target="_blank" rel="noreferrer" style={{ color: "var(--brand-amber)" }}>View existing file</a>
                  </div>
                )}
                <input type="file" onChange={e => setFile(e.target.files[0])} ref={fileInputRef} className="admin-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png" style={{ padding: "0.5rem" }} />
                {file && <div style={{ marginTop: "0.35rem", fontSize: "0.82rem", color: "var(--success)" }}>Selected: {file.name} ({(file.size/1024).toFixed(0)} KB)</div>}
              </div>
              <div className="admin-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="admin-btn primary" style={{ flex: 1 }} disabled={saving}>
                  {saving ? "Saving..." : (editingId ? "Update Notice" : "Add Notice")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManager;