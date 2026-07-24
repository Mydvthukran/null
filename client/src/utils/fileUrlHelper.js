/**
 * Resolves the URL for a file/image path.
 * If the path is already an absolute HTTP/HTTPS URL (e.g. Cloudinary), returns it as-is.
 * Otherwise, prepends the backend API URL for local uploads.
 * 
 * @param {string} path - The file path from the database.
 * @returns {string} The resolved full URL.
 */
export const getFileUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${import.meta.env.VITE_API_URL.replace("/api", "")}${path}`;
};
