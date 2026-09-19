/**
 * Document Storage Utility
 * Client-side persistence and resolution for system & user-created documents.
 */

export const STORAGE_KEY = 'siet_documents_store';

export const DEFAULT_DOCUMENTS = [
  {
    document_key: 'academic-calendar',
    name: 'Academic Calendar',
    category: 'Academic',
    size: '396 KB',
    updatedAt: '2026-07-26',
    filePath: '/Mandatory Disclosure 2026-27.pdf',
    targetPath: '/academics/academic-calendar'
  },
  {
    document_key: 'btech-admission-form',
    name: 'B.Tech Admission Form',
    category: 'Admission',
    size: '513 KB',
    updatedAt: '2026-07-15',
    filePath: '/Application Form Visiting Faculty.pdf',
    targetPath: '/admission-form'
  },
  {
    document_key: 'btech-leet-prospectus',
    name: 'B.Tech LEET Prospectus',
    category: 'Admission',
    size: '1.1 MB',
    updatedAt: '2026-07-13',
    filePath: '/BTechLE-Prospectus-2026 (1).pdf',
    targetPath: '/academics/admission-prospectus'
  },
  {
    document_key: 'mandatory-disclosure',
    name: 'Mandatory Disclosure 2026-27',
    category: 'Academic',
    size: '1.6 MB',
    updatedAt: '2026-08-01',
    filePath: '/Mandatory Disclosure 2026-27.pdf',
    targetPath: '/about/mandatory-disclosure'
  },
  {
    document_key: 'code-of-conduct',
    name: 'Code of Conduct',
    category: 'Academic',
    size: '1.1 MB',
    updatedAt: '2026-09-01',
    filePath: '/codeofconduct.pdf',
    targetPath: '/academics/code-of-conduct'
  },
  {
    document_key: 'awards-scholarships',
    name: 'Awards & Scholarships',
    category: 'Student',
    size: '850 KB',
    updatedAt: '2026-08-10',
    filePath: '/Scholarships.pdf',
    targetPath: '/academics/scholarships'
  },
  {
    document_key: 'placement-brochure',
    name: 'Placement Brochure 2026-27',
    category: 'Placements',
    size: '2.4 MB',
    updatedAt: '2026-08-15',
    filePath: 'https://tpo.sietpanchkula.ac.in/brochure.pdf',
    targetPath: '/placements/placement-brochure'
  }
];

/**
 * Gets all documents merged with custom localStorage updates.
 */
export const getStoredDocuments = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DOCUMENTS;
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored) || stored.length === 0) return DEFAULT_DOCUMENTS;

    // Merge stored items with defaults
    const docMap = new Map();
    DEFAULT_DOCUMENTS.forEach(d => docMap.set(d.document_key, d));
    stored.forEach(d => docMap.set(d.document_key, { ...docMap.get(d.document_key), ...d }));

    return Array.from(docMap.values());
  } catch (err) {
    console.error('Failed to read stored documents:', err);
    return DEFAULT_DOCUMENTS;
  }
};

/**
 * Saves or updates a document in localStorage store.
 */
export const saveStoredDocument = (updatedDoc) => {
  try {
    const current = getStoredDocuments();
    const index = current.findIndex(d => d.document_key === updatedDoc.document_key);
    let nextList;
    if (index >= 0) {
      nextList = [...current];
      nextList[index] = { ...nextList[index], ...updatedDoc };
    } else {
      nextList = [updatedDoc, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    return nextList;
  } catch (err) {
    console.error('Failed to save document:', err);
    return null;
  }
};

/**
 * Finds a document matching a target land path (e.g. /academics/code-of-conduct).
 */
export const findDocumentByPath = (path) => {
  if (!path) return null;
  const cleanPath = path.toLowerCase().replace(/\/$/, '');
  const docs = getStoredDocuments();
  return docs.find(d => d.targetPath && d.targetPath.toLowerCase().replace(/\/$/, '') === cleanPath) || null;
};
