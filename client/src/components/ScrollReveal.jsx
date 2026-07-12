import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ children, className = '', threshold = 0.2 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={sectionRef} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
};

export default ScrollReveal;
