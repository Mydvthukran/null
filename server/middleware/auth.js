/**
 * JWT Authentication Middleware
 * Protects admin routes from unauthorized access.
 */
const jwt = require('jsonwebtoken');
const { verifyFirebaseIdToken } = require('../utils/firebaseAuth');

const getCookie = (header, name) => {
  const entry = header?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = bearerToken || getCookie(req.headers.cookie, 'siet_admin_session');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (err) {
    // Check if token is a direct Firebase ID token
    try {
      const firebaseUser = await verifyFirebaseIdToken(token);
      req.admin = {
        id: firebaseUser.uid,
        username: firebaseUser.email || firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name,
        role: 'super_admin',
        firebaseUid: firebaseUser.uid,
        permissions: [
          'overview', 'applications', 'notices', 'documents',
          'events', 'gallery', 'faculty', 'forms', 'settings', 'menus', 'grievances', 'users'
        ]
      };
      return next();
    } catch (fbErr) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
  }
};

/**
 * Role-based access middleware factory.
 * Usage: requireRole('super_admin')
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }
    next();
  };
};

/**
 * Permission-based access middleware factory.
 * Super admin users bypass permission checks.
 * Usage: requirePermission('notices')
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (req.admin.role === 'super_admin') {
      return next();
    }
    const permissions = Array.isArray(req.admin.permissions) ? req.admin.permissions : [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ error: `Insufficient permissions: '${permission}' access required.` });
    }
    next();
  };
};

module.exports = authMiddleware;
module.exports.requireRole = requireRole;
module.exports.requirePermission = requirePermission;
