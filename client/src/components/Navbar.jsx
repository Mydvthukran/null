import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { searchableLinks } from '../data/searchIndex';
import useMediaQuery from '../hooks/useMediaQuery';
/**
 * Navbar Component
 * Sticky navigation with responsive mobile menu
 */
const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
  const isMobile = useMediaQuery('(max-width: 920px)');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchWrapRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menus from database
    fetch('https://null-e3uj.onrender.com/api/menus')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) setNavItems(data);
      })
      .catch(err => console.error('Error fetching menus:', err));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
