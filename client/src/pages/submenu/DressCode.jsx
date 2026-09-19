import React from 'react';
import '../../css/submenu.css';

const DressCode = () => {
  const categories = [
    {
      icon: '☀️',
      title: 'Summer Uniform',
      accentColor: '#c5a059',
      items: [
        { label: 'Shirt / Top', value: 'Plain Light Sky Blue shirt.' },
        { label: 'Trousers', value: 'Dark Grey formal trousers.' },
        { label: 'Belt', value: 'Formal Black belt (Mandatory).' },
        { label: 'Tie / Scarf', value: 'Dark Blue (Optional).' },
      ],
      traditional: {
        title: 'Traditional Attire Option (Female Students)',
        options: [
          'Light Sky Blue Kurta with Dark Grey Salwar & Navy Blue Dupatta',
          'Navy Blue Saree with a Sky Blue Blouse'
        ],
        note: 'Note: Students may select the fabric of their choice.'
      }
    },
    {
      icon: '❄️',
      title: 'Winter Uniform',
      accentColor: '#0a192f',
      items: [
        { label: 'Outerwear', value: 'Navy Blue V-neck Sweater OR Navy Blue Blazer.' },
        { label: 'Base Layer', value: 'Light Sky Blue shirt with Dark Grey formal trousers.' },
      ]
    },
    {
      icon: '🛠️',
      title: 'Workshop & Lab Uniform',
      accentColor: '#1f8d63',
      items: [
        { label: 'Practical Classes', value: 'Khaki color apron mandatory during Lab / Workshop sessions.' }
      ]
    },
    {
      icon: '👞',
      title: 'Footwear & Accessories',
      accentColor: '#4a5568',
      items: [
        { label: 'Shoes', value: 'Formal Black shoes.' },
        { label: 'Socks', value: 'Light Grey socks.' }
      ]
    }
  ];

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main" style={{ width: '100%', maxWidth: 'none', flex: 'none' }}>
              <div className="submenu-content-card" style={{ padding: '2.5rem clamp(1rem, 3vw, 2.5rem)' }}>
                
                {/* Header */}
                <div className="section-header">
                  <h1 className="section-title">Dress Code Guidelines</h1>
                  <div className="title-underline"></div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  maxWidth: '960px',
                  margin: '0 auto 2.5rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <p style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', color: '#1e293b', lineHeight: '1.6' }}>
                    📢 <strong>Official Announcement:</strong> Please review the official office order and standard uniform requirements for the academic session to ensure consistency and professionalism on campus.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href="/Office Order Dress Code.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.3rem',
                        backgroundColor: '#0a192f',
                        color: '#ffffff',
                        fontWeight: '600',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      📄 View Official Office Order (PDF)
                    </a>
                    <a
                      href="/Office Order Dress Code.pdf"
                      download="Office_Order_Dress_Code.pdf"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.3rem',
                        backgroundColor: '#c5a059',
                        color: '#ffffff',
                        fontWeight: '600',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      ⬇️ Download PDF
                    </a>
                  </div>
                </div>

                {/* Symmetrical 2x2 Cards Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '960px',
                  margin: '0 auto 2.5rem'
                }}>
                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderTop: `4px solid ${cat.accentColor}`,
                        borderRadius: '12px',
                        padding: '1.6rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                          {cat.title}
                        </h2>
                      </div>

                      <div style={{ display: 'grid', gap: '0.65rem' }}>
                        {cat.items.map((item, itemIdx) => (
                          <div key={itemIdx} style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
                            <strong style={{ color: '#0f172a' }}>{item.label}:</strong> {item.value}
                          </div>
                        ))}
                      </div>

                      {cat.traditional && (
                        <div style={{
                          marginTop: '0.5rem',
                          paddingTop: '0.85rem',
                          borderTop: '1px dashed #cbd5e1'
                        }}>
                          <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                            {cat.traditional.title}
                          </h3>
                          <ul style={{ margin: '0 0 0.4rem 0', paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {cat.traditional.options.map((opt, optIdx) => (
                              <li key={optIdx}>{opt}</li>
                            ))}
                          </ul>
                          <p style={{ margin: 0, fontSize: '0.84rem', fontStyle: 'italic', color: '#64748b' }}>
                            {cat.traditional.note}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reminder Box */}
                <div style={{
                  background: '#fffbe6',
                  border: '1px solid #ffe58f',
                  borderRadius: '10px',
                  padding: '1.1rem 1.5rem',
                  maxWidth: '960px',
                  margin: '0 auto',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: 0, fontWeight: '600', color: '#873800', fontSize: '0.95rem' }}>
                    📌 Reminder: Adherence to the uniform code is strictly maintained across all departments and laboratories.
                  </p>
                </div>

                {/* Official PDF Document Viewer Panel */}
                <div style={{ marginTop: '2.5rem', maxWidth: '960px', margin: '2.5rem auto 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <div style={{ padding: '1rem 1.5rem', background: '#0a192f', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#fff', fontWeight: '600' }}>Official Office Order Preview</h3>
                    <a
                      href="/Office Order Dress Code.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#c5a059', textDecoration: 'underline', fontWeight: '600', fontSize: '0.9rem' }}
                    >
                      Open PDF in New Tab ↗
                    </a>
                  </div>
                  <div style={{ height: '700px', width: '100%' }}>
                    <iframe
                      title="Official Office Order Dress Code PDF preview"
                      src="/Office Order Dress Code.pdf"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DressCode;
