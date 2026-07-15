import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/gallery')
      .then(res => res.json())
      .then(data => {
        // Only use images tagged as "Home Carousel"
        const filtered = (data.images || []).filter(img => img.category === 'Home Carousel');
        setBanners(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch home carousel', err);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (banners.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    if (banners.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollReveal>
      <section className="banner-section" aria-label="Campus banner images">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Institute Gallery</h2>
            <div className="title-underline"></div>
          </div>

          <div className="banner-carousel">
            {loading ? (
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Loading gallery...
              </div>
            ) : banners.length > 0 ? (
              <>
                {banners.map((banner, index) => (
                  <article
                    key={banner.id}
                    className={`banner-slide ${index === activeIndex ? 'active' : ''}`}
                    aria-hidden={index !== activeIndex}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${banner.imagePath}`}
                      alt={banner.title}
                      loading="lazy"
                    />
                    <div className="banner-overlay"></div>
                    <div className="banner-content">
                      <h3>{banner.title}</h3>
                      <p>{banner.category}</p>
                    </div>
                  </article>
                ))}

                <button type="button" className="banner-arrow banner-arrow-left" onClick={handlePrev} aria-label="Previous banner">
                  <span aria-hidden="true">‹</span>
                </button>
                <button type="button" className="banner-arrow banner-arrow-right" onClick={handleNext} aria-label="Next banner">
                  <span aria-hidden="true">›</span>
                </button>

                <div className="banner-controls">
                  {banners.map((banner, index) => (
                    <button
                      type="button"
                      key={banner.id}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                      className={`banner-dot ${index === activeIndex ? 'active' : ''}`}
                      aria-label={`Go to banner ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                No Home Carousel images found.
              </div>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default BannerCarousel;
