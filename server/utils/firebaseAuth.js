/**
 * Firebase Auth Utility for Server
 * ================================
 * Cryptographically verifies Firebase ID tokens issued to authenticated users
 * by Google Identity / Firebase Authentication.
 * 
 * Complies with the official Firebase ID token verification spec:
 * - RS256 algorithm
 * - Google public X.509 certificate validation
 * - Audience check matches Firebase project ID
 * - Issuer check matches https://securetoken.google.com/<projectId>
 * - Subject (UID) check
 * - Expiration and authentication time validation
 */

const jwt = require('jsonwebtoken');

let cachedCertificates = null;
let certificateExpiry = 0;

/**
 * Fetch Google's public X.509 certificates for Firebase ID token verification.
 * Automatically caches certificates according to the HTTP Cache-Control header.
 */
async function getGooglePublicCertificates() {
  const now = Date.now();
  if (cachedCertificates && now < certificateExpiry) {
    return cachedCertificates;
  }

  const res = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
  if (!res.ok) {
    throw new Error(`Failed to fetch Google public certificates: ${res.status} ${res.statusText}`);
  }

  const cacheControl = res.headers.get('cache-control');
  let maxAgeSeconds = 3600; // default 1 hour
  if (cacheControl) {
    const match = cacheControl.match(/max-age=(\d+)/);
    if (match) {
      maxAgeSeconds = parseInt(match[1], 10);
    }
  }

  cachedCertificates = await res.json();
  certificateExpiry = now + (maxAgeSeconds * 1000);
  return cachedCertificates;
}

/**
 * Verifies a Firebase ID token.
 * 
 * @param {string} idToken - The raw Firebase ID token sent from the client
 * @param {string} [projectId] - The Firebase Project ID (defaults to process.env.FIREBASE_PROJECT_ID)
 * @returns {Promise<object>} Decoded token payload containing uid, email, etc.
 */
async function verifyFirebaseIdToken(idToken, projectId = process.env.FIREBASE_PROJECT_ID || 'college-website-cbebe') {
  if (!idToken || typeof idToken !== 'string') {
    throw new Error('Firebase ID token is required.');
  }

  // 1. Decode header to inspect algorithm and key ID
  const decodedToken = jwt.decode(idToken, { complete: true });
  if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
    throw new Error('Malformed Firebase ID token: missing header or key ID (kid).');
  }

  if (decodedToken.header.alg !== 'RS256') {
    throw new Error(`Invalid token algorithm: expected RS256, got ${decodedToken.header.alg}`);
  }

  const kid = decodedToken.header.kid;
  const publicKeys = await getGooglePublicCertificates();
  const certificate = publicKeys[kid];

  if (!certificate) {
    throw new Error(`No matching Google public key found for kid: ${kid}`);
  }

  // 2. Cryptographically verify signature and claims
  const expectedIssuer = `https://securetoken.google.com/${projectId}`;
  const payload = jwt.verify(idToken, certificate, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: expectedIssuer
  });

  // 3. Verify standard Firebase claims
  if (!payload.sub || typeof payload.sub !== 'string') {
    throw new Error('Invalid token: missing subject (sub).');
  }

  const currentTimeSeconds = Math.floor(Date.now() / 1000);
  if (payload.auth_time && payload.auth_time > currentTimeSeconds + 300) {
    throw new Error('Invalid token: auth_time is in the future.');
  }

  return {
    uid: payload.sub,
    email: payload.email || '',
    email_verified: Boolean(payload.email_verified),
    name: payload.name || (payload.email ? payload.email.split('@')[0] : 'Admin User'),
    picture: payload.picture || '',
    auth_time: payload.auth_time,
    exp: payload.exp
  };
}

module.exports = {
  verifyFirebaseIdToken,
  getGooglePublicCertificates
};

