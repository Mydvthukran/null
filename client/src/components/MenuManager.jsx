import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

const MenuItemEditor = ({ item, onChange, onRemove, onAddSubmenu, level }) => {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(15, 23, 42, 0.4)',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '0.5rem',
      marginLeft: `${level * 2}rem`
    }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Menu Label</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
            style={{
              width: '100%', padding: '0.5rem', borderRadius: '0.25rem',
              background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', outline: 'none'
            }}
          />
        </div>
        
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>URL / Link</label>
          <input
            type="text"
            value={item.href || ''}
            onChange={(e) => onChange({ ...item, href: e.target.value })}
            style={{
              width: '100%', padding: '0.5rem', borderRadius: '0.25rem',
              background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={item.external}
              onChange={(e) => onChange({ ...item, external: e.target.checked })}
              style={{ marginRight: '0.5rem' }}
            />
            External Link
          </label>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.75rem' }}>
          {level < 2 && (
            <button 
              type="button"
              onClick={onAddSubmenu}
              className="admin-btn outline"
              style={{ padding: '0.5rem' }}
            >
              + Submenu
            </button>
          )}
          <button 
            type="button"
            onClick={onRemove}
            className="admin-btn outline"
            style={{ padding: '0.5rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            Remove
          </button>
        </div>
      </div>

      {item.submenu && item.submenu.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {item.submenu.map((sub, idx) => (
            <MenuItemEditor
              key={sub.tempId || sub.id || idx}
              item={sub}
              level={level + 1}
              onChange={(updatedSub) => {
                const newSubmenu = [...item.submenu];
                newSubmenu[idx] = updatedSub;
                onChange({ ...item, submenu: newSubmenu });
              }}
              onRemove={() => {
                const newSubmenu = item.submenu.filter((_, i) => i !== idx);
                onChange({ ...item, submenu: newSubmenu.length > 0 ? newSubmenu : null });
              }}
              onAddSubmenu={() => {
                const newSubmenu = [...(sub.submenu || []), { tempId: Date.now(), name: 'New Link', href: '', external: false, submenu: null }];
                const updatedSub = { ...sub, submenu: newSubmenu };
                const newParentSubmenu = [...item.submenu];
                newParentSubmenu[idx] = updatedSub;
                onChange({ ...item, submenu: newParentSubmenu });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};


const MenuManager = ({ token }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/menus`);
      const data = await res.json();
      if (!data.error) {
        setMenus(data);
      }
    } catch (err) {
      console.error('Failed to fetch menus', err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/menus`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ menus })
      });
      if (res.ok) {
        alert('Menus updated successfully!');
        fetchMenus();
      } else {
        alert('Failed to save menus.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving menus.');
    }
    setSaving(false);
  };

  const handleAddMainMenu = () => {
    setMenus([...menus, { tempId: Date.now(), name: 'New Menu', href: '', external: false, submenu: null }]);
  };

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading menus...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>Navigation Menus</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleAddMainMenu} className="admin-btn outline">
            + Add Main Menu
          </button>
          <button onClick={handleSave} disabled={saving} className="admin-btn primary">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-activity-panel">
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Manage the top navigation bar. You can nest items up to 3 levels deep (Main Menu &gt; Submenu &gt; Nested Submenu).
        </p>
        
        {menus.map((menu, idx) => (
          <MenuItemEditor
            key={menu.tempId || menu.id || idx}
            item={menu}
            level={0}
            onChange={(updatedMenu) => {
              const newMenus = [...menus];
              newMenus[idx] = updatedMenu;
              setMenus(newMenus);
            }}
            onRemove={() => {
              setMenus(menus.filter((_, i) => i !== idx));
            }}
            onAddSubmenu={() => {
              const newSubmenu = [...(menu.submenu || []), { tempId: Date.now(), name: 'New Submenu', href: '', external: false, submenu: null }];
              const newMenus = [...menus];
              newMenus[idx] = { ...menu, submenu: newSubmenu };
              setMenus(newMenus);
            }}
          />
        ))}
        
        {menus.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
            No menus found. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManager;
