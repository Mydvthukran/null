import React, { useState, useEffect } from 'react';
/**
 * Life @ SIET Page Component
 * Media section and gallery
 */
const LifeAtSIET = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/gallery')
      .then(res => res.json())
      .then(data => {
        // Filter out Home Carousel images if you want, or just show everything else
        const filtered = (data.images || []).filter(img => img.category !== 'Home Carousel');
        setGalleryImages(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch gallery', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="life-at-siet-page">
      <section className="section gallery-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Gallery</h1>
            <div className="title-underline"></div>
          </div>
          <div className="gallery-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', width: '100%', color: '#94a3b8' }}>
                Loading gallery...
              </div>
            ) : galleryImages.length > 0 ? (
              galleryImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${image.imagePath}`} alt={image.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <p className="gallery-title">{image.title}</p>
                    <span className="gallery-category">{image.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', width: '100%', color: '#94a3b8' }}>
                No images available in the gallery.
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LifeAtSIET;
