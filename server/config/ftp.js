const ftp = require("basic-ftp");
const path = require("path");
const { Readable } = require("stream");
require("dotenv").config();

const FTP_HOST = process.env.FTP_HOST;
const FTP_USER = process.env.FTP_USER;
const FTP_PASSWORD = process.env.FTP_PASSWORD;
const FTP_BASE_DIR = process.env.FTP_BASE_DIR;
const FTP_BASE_URL = process.env.FTP_BASE_URL;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD || !FTP_BASE_DIR || !FTP_BASE_URL) {
  throw new Error("Missing required FTP environment variables!");
}

async function getClient() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: false
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
  
  const client = await getClient();
  try {
    const relativePath = url.replace(FTP_BASE_URL, "");
    const remotePath = `${FTP_BASE_DIR}${relativePath}`;
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
