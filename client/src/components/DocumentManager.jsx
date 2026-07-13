import React, { useState, useEffect, useRef } from 'react';

const API_BASE = 'http://localhost:5000/api';

const DocumentManager = ({ token }) => {
  const [documents, setDocuments] = useState([]);
  const [uploadingDocKey, setUploadingDocKey] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_BASE}/documents`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadingDocKey) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/documents/${uploadingDocKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        fetchDocuments();
      }
    } catch (err) {
      console.error('Failed to upload document', err);
    }
    
    setUploadingDocKey(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <div
        className="document-upload-area"
        style={{ background: 'rgba(56, 189, 248, 0.05)', borderColor: 'rgba(56, 189, 248, 0.2)' }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleDocUpload}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          style={{ display: 'none' }}
        />
        <svg className="document-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '1.25rem' }}>System Document Manager</h3>
        <p style={{ color: '#94a3b8', margin: 0, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Manage the permanent, structural documents of the website (e.g. Fee Structures, Syllabuses, Timetables). Click "Update File" on a row below to replace it globally.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>Website Documents</h2>
      </div>

      <div className="admin-activity-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? documents.map((doc) => (
              <tr key={doc.document_key}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <span style={{ fontWeight: 500, color: '#f8fafc' }}>{doc.name}</span>
                  </div>
                  {doc.filePath ? (
                    <a href={`http://localhost:5000${doc.filePath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.25rem', display: 'inline-block' }}>View Current File</a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'inline-block' }}>No file attached</span>
                  )}
                </td>
                <td>{doc.category}</td>
                <td>{doc.size}</td>
                <td>{doc.updatedAt}</td>
                <td>
                  <button
                    onClick={() => {
                      setUploadingDocKey(doc.document_key);
                      fileInputRef.current?.click();
                    }}
                    className="admin-btn outline"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                  >
                    Update File
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>Loading documents...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;
