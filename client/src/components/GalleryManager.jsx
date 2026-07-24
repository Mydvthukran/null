import React, { useState, useEffect, useRef } from 'react';
import { getFileUrl } from '../utils/fileUrlHelper';

const GalleryManager = ({ token }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Campus');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/gallery');
      const data = await res.json();
      if (res.ok) setImages(data.images || []);
    } catch (err) {
      console.error('Failed to fetch gallery', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    if (!file) return alert('Please select an image file first.');
    if (!title) return alert('Please provide a title for the image.');

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/gallery', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setCategory('Campus');
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchGallery();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting image.');
    }
  };

  const handleEditSave = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title: editTitle, category: editCategory }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchGallery();
      } else {
        alert('Failed to update image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating image.');
    }
  };

  const startEditing = (img) => {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>Gallery Manager</h2>
      </div>

      <div className="admin-stat-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: '#f8fafc', marginBottom: '1rem' }}>Upload New Image</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Title/Description</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Sports Meet 2026"
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', outline: 'none'
              }}
              required
            />
          </div>
          
          <div style={{ flex: '1 1 150px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', outline: 'none'
              }}
            >
              <option value="Campus">Campus</option>
              <option value="Academics">Academics</option>
              <option value="Events">Events</option>
              <option value="Home Carousel">Home Carousel</option>
            </select>
          </div>

          <div style={{ flex: '1 1 250px' }}>
             <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Image File</label>
             <input
               type="file"
               ref={fileInputRef}
               accept="image/jpeg, image/png, image/webp"
               required
               style={{
                  width: '100%', padding: '0.65rem 1rem', borderRadius: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', outline: 'none'
               }}
             />
          </div>

          <button 
            type="submit" 
            className="admin-btn primary"
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>

      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {images.length > 0 ? images.map((img) => (
          <div key={img.id} style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '180px', overflow: 'hidden' }}>
              <img 
                src={getFileUrl(img.imagePath)} 
                alt={img.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {editingId === img.id ? (
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      width: '100%', padding: '0.5rem', borderRadius: '0.25rem',
                      background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none', marginBottom: '0.5rem'
                    }}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{
                      width: '100%', padding: '0.5rem', borderRadius: '0.25rem',
                      background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none', marginBottom: '0.5rem'
                    }}
                  >
                    <option value="Campus">Campus</option>
                    <option value="Academics">Academics</option>
                    <option value="Events">Events</option>
                    <option value="Home Carousel">Home Carousel</option>
                  </select>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEditSave(img.id)}
                      className="admin-btn primary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', flex: 1 }}
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="admin-btn outline"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', flex: 1 }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#f8fafc', fontSize: '1.1rem' }}>{img.title}</h4>
                  <span style={{ 
                    display: 'inline-block',
                    background: 'rgba(56, 189, 248, 0.1)', 
                    color: '#38bdf8',
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '1rem', 
                    fontSize: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    {img.category}
                  </span>
                </div>
              )}
              
              {editingId !== img.id && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => startEditing(img)}
                    className="admin-btn outline"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="admin-btn outline"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            No images uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
