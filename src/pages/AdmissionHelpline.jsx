import React from 'react';

const AdmissionHelpline = () => {
  return (
    <section className="section" aria-label="Admission helpline page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Admission Helpline</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Reach out to our faculty coordinators for admission-related queries.</p>
        </div>

        <div className="submenu-layout" style={{ display: 'block' }}>
          <main className="submenu-main" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="submenu-content-card" style={{ marginBottom: '2rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', padding: '1.5rem', borderRadius: '8px' }}>
              <h2 className="submenu-section-title" style={{ marginTop: 0 }}>Admission Related Queries</h2>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '1.05rem' }}>
                  <strong>Admissions Inquiry Email:</strong> <a href="mailto:admissions@sietpanchkula.ac.in" style={{ color: '#0a192f', textDecoration: 'underline' }}>admissions@sietpanchkula.ac.in</a>
                </p>
              </div>
            </div>

            {/* First Table */}
            <div className="submenu-content-card" style={{ marginBottom: '2rem' }}>
              <h2 className="submenu-section-title">Department Coordinators</h2>
              <div className="table-responsive" style={{ overflowX: 'auto', marginTop: '1rem' }}>
                <table className="helpline-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Faculty</th>
                      <th>Contact No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Computer Science & Engineering</td>
                      <td>Dr. Divya Singla</td>
                      <td>92532 89394</td>
                    </tr>
                    <tr>
                      <td>CSE AI&ML</td>
                      <td>Dr. Divya Garg</td>
                      <td>90342 39244</td>
                    </tr>
                    <tr>
                      <td>CSE Cyber Security</td>
                      <td>Ms. Ankita Jiwan</td>
                      <td>78372 13387</td>
                    </tr>
                    <tr>
                      <td>Robotics & Automation</td>
                      <td>Ms. Ritu Kadiyan</td>
                      <td>82220 37009</td>
                    </tr>
                    <tr>
                      <td>Electrical Engineering</td>
                      <td>Ms. Luxmi Sharma</td>
                      <td>94677 17859</td>
                    </tr>
                    <tr>
                      <td>Electronics Engineering VLSI Design</td>
                      <td>Dr. Elam Siwach</td>
                      <td>89303 43834</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Second Table */}
            <div className="submenu-content-card">
              <h2 className="submenu-section-title">General Admission Queries</h2>
              <div className="table-responsive" style={{ overflowX: 'auto', marginTop: '1rem' }}>
                <table className="helpline-table">
                  <thead>
                    <tr>
                      <th>Faculty</th>
                      <th>Contact No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dr. Milap Sharma</td>
                      <td>97968 11397</td>
                    </tr>
                    <tr>
                      <td>Ms. Priyanka Diwan Goyal</td>
                      <td>74064 45666</td>
                    </tr>
                    <tr>
                      <td>Ms. Nivedita Kapoor</td>
                      <td>89880 33413</td>
                    </tr>
                    <tr>
                      <td>Ms. Reena Dhull</td>
                      <td>74040 14302</td>
                    </tr>
                    <tr>
                      <td>Ms. Monika</td>
                      <td>89013 10114</td>
                    </tr>
                    <tr>
                      <td>Mr. Tushar</td>
                      <td>94160 65275</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </main>
          <div className="submenu-content-card" style={{ marginTop: '2rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', padding: '1.5rem', borderRadius: '8px' }}>
            <h2 className="submenu-section-title" style={{ marginTop: 0 }}>Office Contact</h2>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '1.05rem' }}>
                <strong>Contact No:</strong> <a href="tel:01722979887" style={{ color: '#0a192f', textDecoration: 'underline' }}>0172-2979887</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .helpline-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          background-color: #ffffff;
          color: #000000;
          font-size: 16px;
        }
        .helpline-table th, .helpline-table td {
          border: 2px solid #000000;
          padding: 8px 12px;
        }
        .helpline-table th {
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default AdmissionHelpline;
