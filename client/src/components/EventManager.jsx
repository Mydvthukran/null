import React, { useState, useRef, useEffect } from "react";
import "../css/adminDashboard.css";
import { getFileUrl } from "../utils/fileUrlHelper";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL;

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingFilePath, setEditingFilePath] = useState("");
  const [formData, setFormData] = useState({ title: "", date: "", status: "Upcoming", category: "Event" });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => { fetchEvents(); }, []);

  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers, credentials: "include" });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) { console.error("API Error:", err); return null; }
  };

  const fetchEvents = async () => {
    const data = await apiCall("/events");
    if (data) setEvents(data);
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingId(event.id);
      setEditingFilePath(event.file_path || "");
      setFormData({ title: event.title, date: event.date || "", status: event.status, category: event.category });
    } else {
      setEditingId(null);
      setEditingFilePath("");
      setFormData({ title: "", date: "", status: "Upcoming", category: "Event" });
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
    if (file) data.append("file", file);
    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/events/${editingId}` : "/events";
    const result = await apiCall(endpoint, { method, body: data });
    setSaving(false);
    if (result !== null) {
      showToast(editingId ? "Event updated successfully" : "Event added successfully", "success");
      setShowModal(false);
      window.dispatchEvent(new CustomEvent("siet:events-updated"));
      fetchEvents();
    } else {
      showToast("Failed to save event.", "error");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete event: "${title}"?`)) return;
    const result = await apiCall(`/events/${id}`, { method: "DELETE" });
    if (result !== null) {
      showToast("Event deleted.", "info");
      window.dispatchEvent(new CustomEvent("siet:events-updated"));
      fetchEvents();
    } else {
      showToast("Failed to delete event.", "error");
    }
  };

  const handleViewRegistrations = async (event) => {
    setSelectedEventForReg(event);
    const data = await apiCall(`/events/registrations/${event.id}`);
    if (data) setEventRegistrations(data.registrations || []);
    setShowRegModal(true);
  };

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-activity-panel" style={{ position: "relative" }}>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, color: "var(--ink-900)" }}>Manage Announcements & Events</h2>
        <button className="admin-btn primary" onClick={() => handleOpenModal()}>+ Add Event</button>
      </div>
      <div className="admin-filter-bar">
        <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="admin-search-input" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <span style={{ fontSize: "0.8rem", color: "var(--ink-500)", whiteSpace: "nowrap", alignSelf: "center" }}>{filtered.length} / {events.length}</span>
      </div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>File</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id}>
                <td style={{ color: "var(--ink-300)", fontSize: "0.8rem" }}>#{e.id}</td>
                <td style={{ fontWeight: 500 }}>{e.title}</td>
                <td><span className="admin-tag">{e.category}</span></td>
                <td>{e.date}</td>
                <td><span className={`status-badge ${e.status === "Upcoming" ? "status-pending" : e.status === "Completed" ? "status-active" : "status-expired"}`}>{e.status}</span></td>
                <td>{e.file_path ? <a href={getFileUrl(e.file_path)} target="_blank" rel="noreferrer" style={{ color: "var(--brand-amber)", fontSize: "0.82rem" }}>View File</a> : <span style={{ color: "var(--ink-300)" }}>—</span>}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <button onClick={() => handleViewRegistrations(e)} className="admin-btn outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", color: "#10b981", borderColor: "rgba(16,185,129,0.3)" }}>Registrations</button>
                    <button onClick={() => handleOpenModal(e)} className="admin-btn outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem" }}>Edit</button>
                    <button onClick={() => handleDelete(e.id, e.title)} className="admin-btn outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", color: "var(--danger)", borderColor: "rgba(206,62,62,0.3)" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--ink-500)" }}>No events found.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Event" : "Add Event"}</h3>
              <button onClick={() => setShowModal(false)} className="admin-modal-close">&#x2715;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="admin-label">Title *</label>
                <input type="text" placeholder="Event title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="admin-input">
                    <option value="Event">Event</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="admin-input">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Date</label>
                <input type="text" placeholder="e.g. 15 Oct 2026" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Attach Flyer (PDF / IMG)</label>
                {editingFilePath && !file && (
                  <div style={{ marginBottom: "0.5rem", fontSize: "0.82rem" }}>
                    Current: <a href={getFileUrl(editingFilePath)} target="_blank" rel="noreferrer" style={{ color: "var(--brand-amber)" }}>View existing file</a>
                  </div>
                )}
                <input type="file" onChange={e => setFile(e.target.files[0])} ref={fileInputRef} className="admin-input" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ padding: "0.5rem" }} />
                {file && <div style={{ marginTop: "0.35rem", fontSize: "0.82rem", color: "var(--success)" }}>Selected: {file.name} ({(file.size/1024).toFixed(0)} KB)</div>}
              </div>
              <div className="admin-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="admin-btn primary" style={{ flex: 1 }} disabled={saving}>
                  {saving ? "Saving..." : (editingId ? "Update Event" : "Add Event")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegModal && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowRegModal(false)}>
          <div className="admin-modal-card" style={{ maxWidth: "650px", maxHeight: "80vh", overflowY: "auto" }}>
            <div className="admin-modal-header">
              <h3>Registrations: {selectedEventForReg?.title}</h3>
              <button onClick={() => setShowRegModal(false)} className="admin-modal-close">&#x2715;</button>
            </div>
            {eventRegistrations.length === 0 ? (
              <p style={{ color: "var(--ink-500)", textAlign: "center", padding: "2rem" }}>No registrations yet.</p>
            ) : (
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Student ID</th><th>Date</th></tr></thead>
                <tbody>
                  {eventRegistrations.map(reg => (
                    <tr key={reg.id}>
                      <td>{reg.name}</td><td>{reg.email}</td>
                      <td>{reg.phone || "—"}</td><td>{reg.student_id || "—"}</td><td>{reg.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManager;