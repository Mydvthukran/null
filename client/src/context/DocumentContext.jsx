import React, { createContext, useContext, useState, useEffect } from 'react';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch system documents:', err);
        setLoading(false);
      });
  }, []);

  // Helper function to get a document URL by its key
  const getDocUrl = (key, fallback = '#') => {
    const doc = documents.find(d => d.document_key === key);
    if (doc && doc.filePath) {
      return `${import.meta.env.VITE_API_URL.replace("/api", "")}${doc.filePath}`;
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
