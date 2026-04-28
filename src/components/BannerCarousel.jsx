import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import galleryOne from '../assets/new-assets/home/gallery/1-1-1024x768.jpg';
import galleryTwo from '../assets/new-assets/home/gallery/3-1-edited.jpg';
import galleryThree from '../assets/new-assets/home/gallery/IMG_1922-1024x768.jpg';
import galleryFour from '../assets/new-assets/home/gallery/IMG_1927-1024x768.jpg';
import galleryFive from '../assets/new-assets/home/gallery/Inspection-Pic-1024x768.jpg';
import gallerySix from '../assets/new-assets/home/gallery/sportsmeetpic_nancy-edited.jpg';

const banners = [
  {
    id: 1,
    image: galleryOne,
    title: 'Campus Gallery',
    subtitle: 'Snapshots from campus life, academics, and events.'
  },
  {
    id: 2,
    image: galleryTwo,
    title: 'Institute Moments',
    subtitle: 'Highlights from activities and student engagement.'
  },
  {
    id: 3,
    image: galleryThree,
    title: 'Academic Spaces',
    subtitle: 'Learning spaces that support practical and outcome-focused education.'
  },
  {
    id: 4,
    image: galleryFour,
    title: 'Events & Activities',
    subtitle: 'A look at institute events and campus experiences.'
  },
  {
    id: 5,
    image: galleryFive,
    title: 'Visits & Highlights',
    subtitle: 'Official visits and campus highlights captured in photos.'
  },
  {
    id: 6,
    image: gallerySix,
    title: 'Sports & Wellness',
    subtitle: 'Sports meets and student participation moments.'
  }
];

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
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
            {banners.map((banner, index) => (
              <article
                key={banner.id}
                className={`banner-slide ${index === activeIndex ? 'active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                />
                <div className="banner-overlay"></div>
                <div className="banner-content">
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle}</p>
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
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default BannerCarousel;
