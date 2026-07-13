import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentSectionCatalog } from '../../departmentSectionCatalog';

const TeacherProfileTemplate = ({ deptSlug, profile }) => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [profile]);

  if (!profile) {
    return null;
  }

  const departmentTitle = departmentSectionCatalog[deptSlug]?.title || 'Department';
  const associatedDepartments = (profile.departments || [])
    .map((slug) => departmentSectionCatalog[slug]?.title)
    .filter(Boolean);
  const qualificationItems = profile.qualification
    ? profile.qualification
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : ['Qualification details will be updated.'];
  const interests = profile.area_of_interest
    ? profile.area_of_interest.split(',').map((item) => item.trim()).filter(Boolean)
    : [];
  const coreExpertise = interests.slice(0, 4);
  const vidwanProfileId = profile.vidwan_link ? profile.vidwan_link.split('/').filter(Boolean).pop() : '';

  return (
    <div className="submenu-page teacher-profile-page">
      <section className="section submenu-content-section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="teacher-profile-shell">
            <div className="teacher-profile-actions">
              <Link to={`/departments/${deptSlug}#faculty`} className="submenu-action-btn secondary">
                Back to Faculty
              </Link>
              <a
                href={profile.vidwan_link}
                target="_blank"
                rel="noreferrer"
                className="submenu-action-btn"
              >
                VIDWAN Profile
              </a>
            </div>

            <article className="teacher-profile-surface">
              <header className="teacher-profile-header">
                <div className="teacher-profile-photo-wrap">
                  {profile.image_path ? (
                    <img src={`http://localhost:5000${profile.image_path}`} alt={profile.name} className="teacher-profile-photo" loading="eager" />
                  ) : (
                    <div className="teacher-profile-no-file">No photo</div>
                  )}
                </div>

                <div className="teacher-profile-heading">
                  <p className="submenu-kicker">FACULTY PROFILE</p>
                  <h1 className="submenu-title" style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.4rem)', color: 'var(--ink-900)' }}>
                    {profile.name}
                  </h1>
                  <p className="teacher-profile-designation">{profile.designation}</p>
                  <p className="teacher-profile-department">{departmentTitle}</p>
                </div>
              </header>

              <div className="teacher-profile-info-grid">
                <div className="teacher-profile-info-card">
                  <h2>Designation</h2>
                  <p>{profile.designation}</p>
                </div>
                <div className="teacher-profile-info-card">
                  <h2>Qualification</h2>
                  <p>{profile.qualification}</p>
                </div>
                <div className="teacher-profile-info-card">
                  <h2>Department Association</h2>
                  <p>{associatedDepartments.join(', ') || departmentTitle}</p>
                </div>
                <div className="teacher-profile-info-card">
                  <h2>Email</h2>
                  <p>
                    <a href={`mailto:${profile.email}`} className="teacher-inline-link">
                      {profile.email}
                    </a>
                  </p>
                </div>
              </div>

              <section className="teacher-profile-details-grid">
                <div className="teacher-profile-info-card teacher-profile-panel">
                  <h2>Academic Qualifications</h2>
                  <ul className="teacher-bullet-list">
                    {qualificationItems.map((qualification) => (
                      <li key={`${profile.slug}-${qualification}`}>{qualification}</li>
                    ))}
                  </ul>
                </div>
                <div className="teacher-profile-info-card teacher-profile-panel">
                  <h2>Core Expertise</h2>
                  <div className="teacher-profile-interest-list">
                    {coreExpertise.map((expertise) => (
                      <span key={`${profile.slug}-core-${expertise}`} className="teacher-interest-chip">
                        {expertise}
                      </span>
                    ))}
                  </div>
                  <p className="teacher-profile-note-text">
                    Currently shown under {departmentTitle}. You can adjust faculty ordering or mapping anytime.
                  </p>
                </div>
              </section>

              <section className="teacher-profile-interests">
                <h2 className="submenu-section-title" style={{ marginBottom: '0.75rem' }}>
                  Areas of Interest
                </h2>
                <div className="teacher-profile-interest-list">
                  {interests.map((interest) => (
                    <span key={`${profile.slug}-${interest}`} className="teacher-interest-chip">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>

              <section className="teacher-profile-links-panel">
                <h2 className="submenu-section-title" style={{ marginBottom: '0.75rem' }}>
                  Professional Links
                </h2>
                <div className="teacher-profile-link-list">
                  <a href={`mailto:${profile.email}`} className="teacher-inline-link">
                    Email: {profile.email}
                  </a>
                  {profile.vidwan_link && (
                    <a href={profile.vidwan_link} target="_blank" rel="noreferrer" className="teacher-inline-link">
                      VIDWAN: {profile.vidwan_link}
                    </a>
                  )}
                </div>
                <p className="teacher-profile-note-text">VIDWAN ID: {vidwanProfileId}</p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherProfileTemplate;
