import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { searchableLinks } from '../data/searchIndex';
/**
 * Navbar Component
 * Sticky navigation with responsive mobile menu
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const navigate = useNavigate();
  const searchWrapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 920px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onPointerDown = (e) => {
      const wrap = searchWrapRef.current;
      if (!wrap) return;
      if (!wrap.contains(e.target)) {
        setIsSearchOpen(false);
        setActiveSuggestion(-1);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isSearchOpen]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchableLinks
      .filter((item) => item.label.toLowerCase().includes(q))
      .slice(0, 6);
  }, [searchQuery]);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      submenu: null
    },
    {
      name: 'About Us',
      href: '/about',
      submenu: [
        { name: 'History', href: '/about/history' },
        { name: 'About Institute', href: '/about/about-institute' },
        { name: 'Vision & Mission', href: '/about/vision-mission' },
        { name: "Director - Principal's Desk", href: '/about/directors-message' },
        { name: 'Unnat Bharat Abhiyan', href: 'https://unnatbharatabhiyan.gov.in/', external: true }
      ]
    },
    {
      name: 'Departments',
      href: '/departments',
      submenu: [
        {
          name: 'Computer Science & Engineering',
          href: '/departments/cse',
          submenu: [
            { name: 'About Department', href: '/departments/cse#about-department' },
            { name: 'Vision & Mission', href: '/departments/cse#vision-mission' },
            { name: 'Faculty', href: '/departments/cse#faculty' },
            { name: 'Time Table', href: '/departments/cse#time-table' }
          ]
        },
        {
          name: 'Computer Science & Engineering(AI & Machine Learning)',
          href: '/departments/ai-ml',
          submenu: [
            { name: 'About Department', href: '/departments/ai-ml#about-department' },
            { name: 'Vision & Mission', href: '/departments/ai-ml#vision-mission' },
            { name: 'Faculty', href: '/departments/ai-ml#faculty' },
            { name: 'Time Table', href: '/departments/ai-ml#time-table' }
          ]
        },
        {
          name: 'Computer Science & Engineering(Cyber Security)',
          href: '/departments/cyber-security',
          submenu: [
            { name: 'About Department', href: '/departments/cyber-security#about-department' },
            { name: 'Vision & Mission', href: '/departments/cyber-security#vision-mission' },
            { name: 'Faculty', href: '/departments/cyber-security#faculty' },
            { name: 'Time Table', href: '/departments/cyber-security#time-table' }
          ]
        },
        {
          name: 'Robotics & Automation',
          href: '/departments/robotics',
          submenu: [
            { name: 'About Department', href: '/departments/robotics#about-department' },
            { name: 'Vision & Mission', href: '/departments/robotics#vision-mission' },
            { name: 'Faculty', href: '/departments/robotics#faculty' },
            { name: 'Time Table', href: '/departments/robotics#time-table' }
          ]
        },
        {
          name: 'Electrical Engineering',
          href: '/departments/electrical-engineering',
          submenu: [
            { name: 'About Department', href: '/departments/electrical-engineering#about-department' },
            { name: 'Vision & Mission', href: '/departments/electrical-engineering#vision-mission' },
            { name: 'Faculty', href: '/departments/electrical-engineering#faculty' },
            { name: 'Time Table', href: '/departments/electrical-engineering#time-table' }
          ]
        },
        {
          name: 'Electronics Engineering (VLSI Design)',
          href: '/departments/electronics-vlsi',
          submenu: [
            { name: 'About Department', href: '/departments/electronics-vlsi#about-department' },
            { name: 'Vision & Mission', href: '/departments/electronics-vlsi#vision-mission' },
            { name: 'Faculty', href: '/departments/electronics-vlsi#faculty' },
            { name: 'Time Table', href: '/departments/electronics-vlsi#time-table' }
          ]
        }
      ]
    },
    {
      name: 'Student',
      href: '/academics',
      submenu: [
        { name: 'Academic Calendar', href: '/academics/academic-calendar' },
        { name: 'Syllabus', href: '/academics/syllabus' },
        { name: 'Admission Form', href: '/admission-form' },
        { name: 'Admission Prospectus', href: '/academics/admission-prospectus' },
        { name: 'Exam Schedule', href: '/academics/exam-schedule' },
        { name: 'Grievance Portal', href: 'https://grievance.sietpanchkula.ac.in/', external: true },
        { name: 'Code of Conduct', href: '/academics/code-of-conduct' },
        { name: 'Anti-Ragging', href: '/academics/anti-ragging' }
      ]
    },
    {
      name: 'Facilities',
      href: '/facilities',
      submenu: [
        { name: 'Infrastructure', href: '/facilities/infrastructure' },
        { name: 'Library', href: '/facilities/library' },
        { name: 'Hostels', href: '/facilities/hostels' },
        { name: 'Sports', href: '/facilities/sports' },
        { name: 'Smart Classrooms', href: '/facilities/smart-classrooms' },
        { name: 'Laboratories', href: '/facilities/laboratories' },
        { name: 'Cafeteria', href: '/facilities/cafeteria' },
        { name: 'Healthcare', href: '/facilities/healthcare' },
        { name: 'Security', href: '/facilities/security' }
      ]
    },
    {
      name: 'Training & Placements',
      href: 'https://siettpo.vercel.app/',
      external: true,
      submenu: null
    },
    {
      name: 'Alumni',
      href: '/alumni',
      submenu: [
        { name: 'Alumni Directory', href: '/alumni/alumni-directory' },
        { name: 'Alumni Registration', href: '/alumni/alumni-registration' },
        { name: 'Alumni Events', href: '/alumni/alumni-events' }
      ]
    },
    {
      name: 'Life @ SIET',
      href: '/life-at-siet',
      submenu: [
        { name: 'Life @ SIET Overview', href: '/life-at-siet' },
        { name: 'Events', href: '/events' },
        { name: 'Student Helpline', href: '/student-helpline' },
        { name: 'Top-Level Sections', href: '/top-level-sections' },
        
        { name: 'Content Differences', href: '/content-differences' }
      ]
    }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenNestedDropdown(null);
  };
  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
    setOpenNestedDropdown(null);
  };
  const toggleNestedDropdown = (key) => setOpenNestedDropdown((prev) => (prev === key ? null : key));
  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setOpenDropdown(null);
    closeMobileMenu();
    setIsSearchOpen(false);
    setActiveSuggestion(-1);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setOpenDropdown(null);
    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  };

  const runSuggestion = (item) => {
    if (!item) return;
    setIsSearchOpen(false);
    setActiveSuggestion(-1);
    setSearchQuery('');
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(item.href);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="nav-brand">
            SIET
          </Link>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`navbar-quick-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="mobile-search-item">
              <form className="mobile-nav-search-form" role="search" onSubmit={submitSearch}>
                <input
                  className="mobile-nav-search-input"
                  type="search"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveSuggestion(-1);
                  }}
                  aria-label="Search site"
                />
                <button type="submit" className="mobile-nav-search-btn">Go</button>
              </form>
            </li>

            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item ${item.submenu ? 'has-submenu' : ''}`}
                onMouseEnter={() => !isMobile && item.submenu && setOpenDropdown(index)}
                onMouseLeave={() => !isMobile && item.submenu && setOpenDropdown(null)}
              >
                <div className="nav-link-row">
                  {item.external ? (
                    <a
                      href={item.href}
                      className="nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setOpenDropdown(null);
                        closeMobileMenu();
                      }}
                    >
                      {item.name}
                    </a>
                  ) : item.submenu ? (
                    <button
                      type="button"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(index);
                      }}
                    >
                      {item.name}
                      <span className={`dropdown-arrow ${openDropdown === index ? 'open' : ''}`}>▼</span>
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setOpenDropdown(null);
                        closeMobileMenu();
                      }}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>

                {item.submenu && (
                  <ul className={`dropdown-menu ${openDropdown === index ? 'active' : ''}`}>
                    {item.submenu.map((subitem, subindex) => (
                      <li
                        key={subindex}
                        className={`dropdown-item ${subitem.submenu ? 'has-submenu' : ''}`}
                        onMouseEnter={() => {
                          if (!isMobile && subitem.submenu) {
                            setOpenNestedDropdown(`${index}-${subindex}`);
                          }
                        }}
                        onMouseLeave={() => {
                          if (!isMobile && subitem.submenu) {
                            setOpenNestedDropdown(null);
                          }
                        }}
                      >
                        {subitem.submenu ? (
                          <>
                            <div className="dropdown-link-row">
                              <Link
                                to={subitem.href}
                                className="dropdown-link nested-parent-link"
                                onClick={() => {
                                  closeMobileMenu();
                                  setOpenDropdown(null);
                                  setOpenNestedDropdown(null);
                                }}
                              >
                                {subitem.name}
                              </Link>
                              <button
                                type="button"
                                className={`nested-arrow-btn ${openNestedDropdown === `${index}-${subindex}` ? 'open' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleNestedDropdown(`${index}-${subindex}`);
                                }}
                                aria-label="Toggle submenu"
                              >
                                <span className="dropdown-arrow">▶</span>
                              </button>
                            </div>

                            <ul className={`nested-dropdown-menu ${openNestedDropdown === `${index}-${subindex}` ? 'active' : ''}`}>
                              {subitem.submenu.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex} className="nested-dropdown-item">
                                  <Link
                                    to={nestedItem.href}
                                    className="dropdown-link nested-dropdown-link"
                                    onClick={() => {
                                      closeMobileMenu();
                                      setOpenDropdown(null);
                                      setOpenNestedDropdown(null);
                                    }}
                                  >
                                    {nestedItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : subitem.external ? (
                          <a
                            href={subitem.href}
                            className="dropdown-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              closeMobileMenu();
                              setOpenDropdown(null);
                            }}
                          >
                            {subitem.name}
                          </a>
                        ) : (
                          <Link
                            to={subitem.href}
                            className="dropdown-link"
                            onClick={() => {
                              closeMobileMenu();
                              setOpenDropdown(null);
                            }}
                          >
                            {subitem.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className={`nav-search-wrap ${isSearchOpen ? 'open' : ''}`} ref={searchWrapRef}>
              <button
                type="button"
                className="nav-search-icon"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                onClick={() => {
                  if (isSearchOpen) {
                    setIsSearchOpen(false);
                    setActiveSuggestion(-1);
                  } else {
                    openSearch();
                  }
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10.5 18.5C14.6421 18.5 18 15.1421 18 11C18 6.85786 14.6421 3.5 10.5 3.5C6.35786 3.5 3 6.85786 3 11C3 15.1421 6.35786 18.5 10.5 18.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <form className="nav-search-form" role="search" onSubmit={submitSearch}>
                <input
                  ref={searchInputRef}
                  className="nav-search-input"
                  type="search"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveSuggestion(-1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                      setActiveSuggestion(-1);
                      return;
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      if (suggestions.length === 0) return;
                      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      if (suggestions.length === 0) return;
                      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
                    }
                    if (e.key === 'Enter' && activeSuggestion >= 0) {
                      e.preventDefault();
                      runSuggestion(suggestions[activeSuggestion]);
                    }
                  }}
                  aria-label="Search site"
                />
              </form>

              {isSearchOpen && suggestions.length > 0 ? (
                <div className="nav-search-suggestions" role="listbox" aria-label="Search suggestions">
                  {suggestions.map((item, idx) => (
                    <button
                      key={`${item.label}-${item.href}`}
                      type="button"
                      className={`nav-search-suggestion ${idx === activeSuggestion ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSuggestion(idx)}
                      onClick={() => runSuggestion(item)}
                      role="option"
                      aria-selected={idx === activeSuggestion}
                    >
                      <span className="nav-search-suggestion-title">{item.label}</span>
                      <span className="nav-search-suggestion-meta">{item.external ? 'External' : 'Page'}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <a href="#contact" className="nav-cta" onClick={closeMobileMenu}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
