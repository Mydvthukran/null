import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFileUrl } from '../utils/fileUrlHelper';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    const fetchDocuments = () => fetch(`${apiBase}/documents`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch system documents:', err);
        setLoading(false);
      });

    fetchDocuments();
    window.addEventListener('siet:documents-updated', fetchDocuments);
    return () => window.removeEventListener('siet:documents-updated', fetchDocuments);
  }, []);

  // Helper function to get a document URL by its key
  const getDocUrl = (key, fallback = '#') => {
    const doc = documents.find(d => d.document_key === key);
    if (doc && doc.filePath) {
      return getFileUrl(doc.filePath);
    }
    return fallback;
  };

  return (
    <DocumentContext.Provider value={{ documents, loading, getDocUrl }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => useContext(DocumentContext);
