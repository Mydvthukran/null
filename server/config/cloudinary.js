const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary config is automatically picked up from CLOUDINARY_URL in .env
cloudinary.config();

// Helper to create storage for different folders
const getCloudinaryStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      resource_type: 'auto', // Supports images, videos, and raw files like PDFs
    },
  });
};

const extractPublicId = (url) => {
  try {
    if (!url || !url.includes('cloudinary.com')) return null;
    
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(p => p === 'upload');
    if (uploadIndex === -1) return null;
    
    const resourceType = parts[uploadIndex - 1]; // e.g., 'image', 'video', 'raw'
    // version is uploadIndex + 1, so the rest is uploadIndex + 2
    let publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
    
    if (resourceType === 'raw') {
      // For raw files, Cloudinary public_id includes the extension
      return { publicId: publicIdWithExt, resourceType };
    } else {
      // For images/videos, it does not
      const lastDotIndex = publicIdWithExt.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        publicIdWithExt = publicIdWithExt.substring(0, lastDotIndex);
      }
      return { publicId: publicIdWithExt, resourceType };
    }
  } catch (err) {
    console.error('Error extracting public ID:', err);
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  const result = extractPublicId(url);
  if (result) {
    try {
      await cloudinary.uploader.destroy(result.publicId, { resource_type: result.resourceType });
      return true;
    } catch (err) {
      console.error('Cloudinary destroy error:', err);
    }
  }
  return false;
};

module.exports = {
  cloudinary,
  getCloudinaryStorage,
  extractPublicId,
  deleteFromCloudinary
};
