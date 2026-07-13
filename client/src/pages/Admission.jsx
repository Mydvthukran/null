import React, { useState } from 'react';
const initialFormData = {
  studentName: '',
  fatherName: '',
  contactNo: '',
  alternativeContactNo: '',
  address: '',
  jeeScore: '',
  jeeRank: '',
  class12Marks: ''
};

const Admission = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const phonePattern = /^[+]?\d{10,13}$/;
    const class12Marks = Number(formData.class12Marks);
    const jeeScore = formData.jeeScore === '' ? null : Number(formData.jeeScore);
    const jeeRank = formData.jeeRank === '' ? null : Number(formData.jeeRank);

    if (!phonePattern.test(formData.contactNo)) {
      nextErrors.contactNo = 'Contact number should contain 10 to 13 digits.';
    }

    if (formData.alternativeContactNo && !phonePattern.test(formData.alternativeContactNo)) {
      nextErrors.alternativeContactNo = 'Alternative contact should contain 10 to 13 digits.';
    }

    if (formData.alternativeContactNo && formData.alternativeContactNo === formData.contactNo) {
      nextErrors.alternativeContactNo = 'Alternative contact should be different from contact number.';
    }

    if (Number.isNaN(class12Marks) || class12Marks < 0 || class12Marks > 100) {
      nextErrors.class12Marks = 'Class 12th marks should be between 0 and 100.';
    }

    if (jeeScore !== null && (Number.isNaN(jeeScore) || jeeScore < 0 || jeeScore > 300)) {
      nextErrors.jeeScore = 'JEE score should be between 0 and 300.';
    }

    if (jeeRank !== null && (!Number.isInteger(jeeRank) || jeeRank <= 0)) {
      nextErrors.jeeRank = 'JEE rank should be a positive whole number.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.studentName,
          course: 'B.Tech' // Default course since form doesn't have course field right now
        })
      });

      if (res.ok) {
        setErrors({});
        setIsSubmitted(true);
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error!', error.message);
      alert('There was a problem submitting the form. Please try again.');
    }
  };

  return (
    <div className="admission-page">
      <section className="page-hero">
        <div className="container">
          
        </div>
      </section>

      <section className="section registration-form-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Query Form</h2>
            <div className="title-underline"></div>
          </div>
          <div className="form-container admission-form-container">
            <p className="form-intro">
              Please fill in your details carefully. Fields marked with * are required.
            </p>
            <form onSubmit={handleSubmit} className="admission-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="studentName">Name *</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter student name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Father&apos;s Name *</label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactNo">Contact No. *</label>
                  <input
                    type="tel"
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                    placeholder="Enter contact number with country code"
                  />
                  {errors.contactNo && <p className="form-error">{errors.contactNo}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="alternativeContactNo">Alternative Contact No.</label>
                  <input
                    type="tel"
                    id="alternativeContactNo"
                    name="alternativeContactNo"
                    value={formData.alternativeContactNo}
                    onChange={handleChange}
                    placeholder="Enter alternative contact number"
                  />
                  {errors.alternativeContactNo && (
                    <p className="form-error">{errors.alternativeContactNo}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Enter full address"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jeeScore">JEE Examination Score (if given)</label>
                  <input
                    type="text"
                    id="jeeScore"
                    name="jeeScore"
                    value={formData.jeeScore}
                    onChange={handleChange}
                    placeholder="Enter JEE score"
                  />
                  {errors.jeeScore && <p className="form-error">{errors.jeeScore}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="jeeRank">JEE Rank (if given)</label>
                  <input
                    type="text"
                    id="jeeRank"
                    name="jeeRank"
                    value={formData.jeeRank}
                    onChange={handleChange}
                    placeholder="Enter JEE rank"
                  />
                  {errors.jeeRank && <p className="form-error">{errors.jeeRank}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="class12Marks">Class 12th Marks (%) *</label>
                <input
                  type="text"
                  id="class12Marks"
                  name="class12Marks"
                  value={formData.class12Marks}
                  onChange={handleChange}
                  required
                  placeholder="Enter marks in percentage"
                />
                {errors.class12Marks && <p className="form-error">{errors.class12Marks}</p>}
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Query Form
              </button>
              {isSubmitted && (
                <p className="form-success">
                  Query form submitted successfully. Our admissions team will contact you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
