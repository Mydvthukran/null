const ftp = require("basic-ftp");
const path = require("path");
const { Readable } = require("stream");
require("dotenv").config();

const FTP_HOST = process.env.FTP_HOST;
const FTP_USER = process.env.FTP_USER;
const FTP_PASSWORD = process.env.FTP_PASSWORD;
const FTP_BASE_DIR = process.env.FTP_BASE_DIR;
const FTP_BASE_URL = process.env.FTP_BASE_URL;

const isFtpConfigured = Boolean(FTP_HOST && FTP_USER && FTP_PASSWORD && FTP_BASE_DIR && FTP_BASE_URL);

if (!isFtpConfigured) {
  console.warn("⚠️ FTP environment variables not fully configured. Local fallback mode enabled.");
}

async function getClient() {
  if (!isFtpConfigured) {
    throw new Error("FTP storage is not configured. Please set FTP environment variables.");
  }
  const client = new ftp.Client();
  client.ftp.verbose = false;
  const secureOption = process.env.FTP_SECURE === 'true' || process.env.FTP_SECURE === '1' 
    ? true 
    : (process.env.FTP_SECURE === 'explicit' ? 'explicit' : false);

  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: secureOption
  });
  return client;
}

/**
 * Uploads a file buffer directly to FTP
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {string} folderName - Target folder name (e.g. 'gallery')
 * @param {string} originalName - Original file name to extract extension
 * @returns {Promise<string>} - Public URL of the uploaded file
 */
const uploadToFTP = async (buffer, folderName, originalName) => {
  const client = await getClient();
  try {
    const ext = path.extname(originalName);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const remoteDir = `${FTP_BASE_DIR}/${folderName}`;
    const remotePath = `${remoteDir}/${uniqueName}`;
    
    await client.ensureDir(remoteDir);
    
    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, remotePath);
    
    return `${FTP_BASE_URL}/${folderName}/${uniqueName}`;
  } catch (err) {
    console.error("FTP upload error:", err);
    throw err;
  } finally {
    client.close();
  }
};

/**
 * Deletes a file from FTP given its public URL
 * @param {string} url - Public URL of the file
 */
const deleteFromFTP = async (url) => {
  if (!url || !url.startsWith(FTP_BASE_URL)) return false;
  
  // Guard against path traversal attacks (e.g. ../ sequences)
  const relativePath = url.slice(FTP_BASE_URL.length);
  const normalizedRelative = path.posix.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '');
  if (normalizedRelative.includes('..')) {
    console.warn("Blocked potential path traversal in FTP deletion:", url);
    return false;
  }

  const client = await getClient();
  try {
    const remotePath = path.posix.join(FTP_BASE_DIR, normalizedRelative);
    if (!remotePath.startsWith(path.posix.normalize(FTP_BASE_DIR))) {
      console.warn("Attempted path traversal outside FTP_BASE_DIR:", remotePath);
      return false;
    }
    await client.remove(remotePath);
    return true;
  } catch (err) {
    console.error("FTP delete error:", err);
    return false;
  } finally {
    client.close();
  }
};

module.exports = {
  uploadToFTP,
  deleteFromFTP
};
