const pool = require('../config/db');

/**
 * Logs an activity to the activity_log table.
 * 
 * @param {Object} admin - The admin object from req.admin (needs id and name)
 * @param {String} module - The module name (e.g. 'Notices', 'Gallery')
 * @param {String} action - The action type (e.g. 'Create', 'Update', 'Delete')
 * @param {String} description - Detailed description of the action
 */
const logActivity = async (admin, module, action, description) => {
  try {
    const adminId = admin ? admin.id : null;
    // Older tokens and public actions may not include a display name. MySQL2
    // rejects undefined bind values, so always normalize the fallback.
    const adminName = admin?.name || admin?.username || 'System';

    await pool.execute(
      'INSERT INTO activity_log (admin_id, admin_name, module, action, description) VALUES (?, ?, ?, ?, ?)',
      [adminId, adminName, module, action, description]
    );
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

module.exports = { logActivity };
