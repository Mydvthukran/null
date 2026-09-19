/**
 * Resolves the URL for a file/image path.
 * If the path is an absolute URL, data URL, or blob URL, returns it as-is.
 * If it's a relative web asset starting with '/', returns it directly.
 * Otherwise, prepends the backend API URL for server uploads.
 * 
 * @param {string} path - The file path or DataURL.
 * @returns {string} The resolved full URL.
 */
export const getFileUrl = (path) => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  // Public static assets served directly from client/public
  if (path.startsWith('/') && !path.startsWith('/uploads')) {
    return path;
  }
  const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
  const hostBase = apiBase.replace(/\/api\/?$/, '');
  return `${hostBase}${path.startsWith('/') ? '' : '/'}${path}`;
};
