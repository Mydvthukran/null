const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyAdmin } = require('../middleware/auth');

// Helper to build tree
const buildMenuTree = (items, parentId = null) => {
  return items
    .filter(item => item.parent_id === parentId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(item => {
      const submenu = buildMenuTree(items, item.id);
      return {
        id: item.id,
        name: item.name,
        href: item.href,
        external: !!item.is_external,
        submenu: submenu.length > 0 ? submenu : null
      };
    });
};

// Get navigation menus (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM navigation_menus ORDER BY sort_order ASC');
    const menuTree = buildMenuTree(rows);
    res.json(menuTree);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
});

// Update entire navigation structure (Admin only)
router.put('/', verifyAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { menus } = req.body; // Expects the full tree structure
    
    // Clear existing menus
    await connection.query('DELETE FROM navigation_menus');
    
    // Helper to insert tree recursively
    const insertMenu = async (items, parentId = null) => {
      let order = 1;
      for (const item of items) {
        const isExternal = item.external ? 1 : 0;
        const [result] = await connection.execute(
          'INSERT INTO navigation_menus (parent_id, name, href, is_external, sort_order) VALUES (?, ?, ?, ?, ?)',
          [parentId, item.name, item.href || '', isExternal, order]
        );
        const newId = result.insertId;
        
        if (item.submenu && Array.isArray(item.submenu) && item.submenu.length > 0) {
          await insertMenu(item.submenu, newId);
        }
        order++;
      }
    };

    if (menus && Array.isArray(menus)) {
      await insertMenu(menus);
    }

    await connection.commit();
    res.json({ success: true, message: 'Menus updated successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating menus:', error);
    res.status(500).json({ error: 'Failed to update menus' });
  } finally {
    connection.release();
  }
});

module.exports = router;
