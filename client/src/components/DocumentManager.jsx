import React, { useState, useEffect, useRef } from 'react';
import { getFileUrl } from '../utils/fileUrlHelper';
import { getStoredDocuments, saveStoredDocument } from '../utils/documentStorage';

const API_BASE = import.meta.env.VITE_API_URL;

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'Academic',
    targetPath: '/academics/',
    file: null
  });

  const uploadingDocKey = useRef(null);
  const fileInputRef = useRef(null);
  const addFileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchDocuments = async () => {
    let localDocs = getStoredDocuments();
    try {
      const endpoint = API_BASE ? `${API_BASE}/documents` : '/documents';
      const res = await fetch(endpoint, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.documents && Array.isArray(data.documents) && data.documents.length > 0) {
          const docMap = new Map();
          // Put remote fetched documents first
          data.documents.forEach(rd => docMap.set(rd.document_key, rd));
          // Overlay local documents for defaults or offline edits
          localDocs.forEach(ld => {
            if (docMap.has(ld.document_key)) {
              docMap.set(ld.document_key, { ...ld, ...docMap.get(ld.document_key) });
            } else {
              docMap.set(ld.document_key, ld);
            }
          });
          setDocuments(Array.from(docMap.values()));
          return;
        }
      }
    } catch (err) {
      console.log('Using local document store:', err.message);
    }
    setDocuments(localDocs);
  };

  // Helper to read file to DataURL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    return Math.round(bytes / 1024) + ' KB';
  };

  // UPDATE DOCUMENT FILE
  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    const docKey = uploadingDocKey.current;

    if (!file || !docKey) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      uploadingDocKey.current = null;
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      const formattedSize = formatFileSize(file.size);
      const todayStr = new Date().toISOString().split('T')[0];

      // Try uploading to server if backend exists
      let remoteFilePath = null;
      if (API_BASE) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch(`${API_BASE}/documents/${docKey}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
          });
          if (res.ok) {
            const resData = await res.json();
            remoteFilePath = resData.filePath;
          }
        } catch (serverErr) {
          console.warn('Backend server upload offline, updating frontend state:', serverErr);
        }
      }

      const currentDoc = documents.find(d => d.document_key === docKey);
      const updatedDoc = {
        ...currentDoc,
        document_key: docKey,
        name: currentDoc ? currentDoc.name : docKey,
        size: formattedSize,
        updatedAt: todayStr,
        filePath: remoteFilePath || dataUrl,
        targetPath: currentDoc?.targetPath || `/academics/${docKey}`
      };

      saveStoredDocument(updatedDoc);

      setDocuments(prev => prev.map(d => d.document_key === docKey ? updatedDoc : d));
      showToast(`Document "${updatedDoc.name}" updated successfully!`, 'success');
    } catch (err) {
      console.error('Document upload failed:', err);
      showToast('Failed to update document file.', 'error');
    }

    uploadingDocKey.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ADD NEW DOCUMENT
  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.file) {
      showToast('Please provide a document name and select a PDF file.', 'error');
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(newDoc.file);
      const formattedSize = formatFileSize(newDoc.file.size);
      const todayStr = new Date().toISOString().split('T')[0];
      const docKey = `doc-${Date.now()}`;

      let targetPathClean = newDoc.targetPath.trim();
      if (!targetPathClean.startsWith('/')) {
        targetPathClean = '/' + targetPathClean;
      }

      const createdDoc = {
        document_key: docKey,
        name: newDoc.name,
        category: newDoc.category,
        size: formattedSize,
        updatedAt: todayStr,
        filePath: dataUrl,
        targetPath: targetPathClean
      };

      saveStoredDocument(createdDoc);
      setDocuments(prev => [createdDoc, ...prev]);

      setIsAddModalOpen(false);
      setNewDoc({ name: '', category: 'Academic', targetPath: '/academics/', file: null });
      if (addFileInputRef.current) addFileInputRef.current.value = '';

      showToast(`New Document "${createdDoc.name}" created! Target path: ${createdDoc.targetPath}`, 'success');
    } catch (err) {
      console.error('Failed to create document:', err);
      showToast('Error creating document.', 'error');
    }
  };

  return (
    <div>
      {/* Hidden File Input for Updates */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDocUpload}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        style={{ display: 'none' }}
      />

      {/* Toast Notification */}
      {toast.message && (
        <div style={{
          padding: '0.875rem 1.25rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          fontWeight: 500,
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
          color: toast.type === 'error' ? '#ef4444' : '#16a34a',
          border: `1px solid ${toast.type === 'error' ? '#ef4444' : '#22c55e'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div
        className="document-upload-area"
        style={{ background: 'rgba(56, 189, 248, 0.05)', borderColor: 'rgba(56, 189, 248, 0.2)' }}
      >
        <svg className="document-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        <h3 style={{ color: 'var(--ink-900)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>System Document Manager</h3>
        <p style={{ color: 'var(--ink-500)', margin: 0, maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
          Manage official institute documents. Click <strong>Update File</strong> to replace an existing document, or click <strong>+ Add Document</strong> to publish a new PDF with a custom land path.
        </p>
      </div>

      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>Website Documents</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            background: 'var(--brand-teal)',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Document
        </button>
      </div>

      {/* Add Document Modal / Panel */}
      {isAddModalOpen && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-mid)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--ink-900)', fontSize: '1.125rem' }}>Add New Document</h3>
          <form onSubmit={handleAddDocument} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-700)', marginBottom: '0.25rem', fontWeight: 500 }}>Document Name *</label>
              <input
                type="text"
                value={newDoc.name}
                onChange={e => setNewDoc({ ...newDoc, name: e.target.value })}
                placeholder="e.g. Code of Conduct 2026"
                required
                style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--border-strong)', background: 'var(--bg-main)', color: 'var(--ink-900)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-700)', marginBottom: '0.25rem', fontWeight: 500 }}>Category</label>
              <select
                value={newDoc.category}
                onChange={e => setNewDoc({ ...newDoc, category: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--border-strong)', background: 'var(--bg-main)', color: 'var(--ink-900)' }}
              >
                <option value="Academic">Academic</option>
                <option value="Admission">Admission</option>
                <option value="Facilities">Facilities</option>
                <option value="Placements">Placements</option>
                <option value="Student">Student</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-700)', marginBottom: '0.25rem', fontWeight: 500 }}>Target Land Path *</label>
              <input
                type="text"
                value={newDoc.targetPath}
                onChange={e => setNewDoc({ ...newDoc, targetPath: e.target.value })}
                placeholder="e.g. /academics/code-of-conduct"
                required
                style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--border-strong)', background: 'var(--bg-main)', color: 'var(--ink-900)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-700)', marginBottom: '0.25rem', fontWeight: 500 }}>Select File (PDF/Doc) *</label>
              <input
                type="file"
                ref={addFileInputRef}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={e => setNewDoc({ ...newDoc, file: e.target.files[0] })}
                required
                style={{ width: '100%', padding: '0.4rem', borderRadius: '0.375rem', border: '1px solid var(--border-strong)', background: 'var(--bg-main)', color: 'var(--ink-900)' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="admin-btn outline"
                style={{ padding: '0.5rem 1rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: 'var(--brand-teal)', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Save & Publish Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents Table */}
      <div className="admin-activity-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Category</th>
              <th>Target Path</th>
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
                    <span style={{ fontWeight: 500, color: 'var(--ink-900)' }}>{doc.name}</span>
                  </div>
                  {doc.filePath ? (
                    <a
                      href={getFileUrl(doc.filePath)}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.75rem', color: 'var(--brand-teal)', marginTop: '0.25rem', display: 'inline-block', fontWeight: 500 }}
                    >
                      View Current File
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.25rem', display: 'inline-block' }}>No file attached</span>
                  )}
                </td>
                <td>
                  <span className="status-badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#0284c7' }}>
                    {doc.category || 'General'}
                  </span>
                </td>
                <td>
                  {doc.targetPath ? (
                    <a
                      href={doc.targetPath}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8125rem', color: 'var(--brand-indigo, #6366f1)', textDecoration: 'underline' }}
                    >
                      {doc.targetPath}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--ink-400)', fontSize: '0.8125rem' }}>—</span>
                  )}
                </td>
                <td>{doc.size || '—'}</td>
                <td>{doc.updatedAt || '—'}</td>
                <td>
                  <button
                    onClick={() => {
                      uploadingDocKey.current = doc.document_key;
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                    className="admin-btn outline"
                    style={{ padding: '0.35rem 0.85rem', fontSize: '0.8125rem', cursor: 'pointer' }}
                  >
                    Update File
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--ink-500)', padding: '2rem' }}>No documents found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;
