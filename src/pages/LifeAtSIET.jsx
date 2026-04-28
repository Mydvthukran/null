import React from 'react';
/**
 * Life @ SIET Page Component
 * Media section and gallery
 */
const LifeAtSIET = () => {
  const galleryPool = import.meta.glob('../assets/new-assets/life at siet/gallery/**/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default'
  });

  const galleryImages = Object.values(galleryPool)
    .slice(0, 12)
    .map((image, index) => ({
      id: index + 1,
      src: image,
      title: `Campus Moment ${index + 1}`,
      category: index % 3 === 0 ? 'campus' : index % 3 === 1 ? 'academics' : 'events'
    }));

  return (
    <div className="life-at-siet-page">
      <section className="section gallery-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Gallery</h1>
            <div className="title-underline"></div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="gallery-overlay">
                  <p className="gallery-title">{image.title}</p>
                  <span className="gallery-category">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LifeAtSIET;
