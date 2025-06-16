import React, { useState } from 'react';

const HomeRepairContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: '',
    description: '',
    budget: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const serviceTypes = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Roofing',
    'HVAC',
    'General Maintenance',
    'Other'
  ];

  const styles = {
    contactContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1a0a 0%, #1a2f1a 50%, #0d1f0d 100%)',
      padding: '2rem 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    contactFormWrapper: {
      maxWidth: '900px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1a2f1a 0%, #0d1f0d 100%)',
      borderRadius: '24px',
      padding: '3rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    formWrapperBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #22c55e, #16a34a, #15803d, #22c55e)',
      backgroundSize: '300% 100%',
      animation: 'shimmer 3s ease-in-out infinite'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#e8f5e8',
      textAlign: 'center',
      marginBottom: '1rem',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    formSubtitle: {
      fontSize: '1.1rem',
      color: '#c1e6c1',
      textAlign: 'center',
      marginBottom: '2.5rem',
      opacity: '0.9'
    },
    repairForm: {
      width: '100%'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    fullWidth: {
      gridColumn: '1 / -1'
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#e8f5e8',
      marginBottom: '0.5rem',
      letterSpacing: '0.5px'
    },
    input: {
      padding: '0.875rem 1rem',
      border: '2px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(26, 47, 26, 0.6)',
      color: '#e8f5e8',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#22c55e',
      boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)',
      transform: 'translateY(-2px)'
    },
    select: {
      padding: '0.875rem 1rem',
      border: '2px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(26, 47, 26, 0.6)',
      color: '#e8f5e8',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      outline: 'none',
      cursor: 'pointer'
    },
    textarea: {
      padding: '0.875rem 1rem',
      border: '2px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(26, 47, 26, 0.6)',
      color: '#e8f5e8',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      outline: 'none',
      resize: 'vertical',
      minHeight: '120px'
    },
    submitButton: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      border: 'none',
      borderRadius: '16px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    submitButtonHover: {
      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 32px rgba(34, 197, 94, 0.4)'
    },
    placeholder: {
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.contactContainer}>
      <div style={styles.contactFormWrapper}>
        <div style={styles.formWrapperBefore}></div>
        <h1 style={styles.title}>Request Home Repair Service</h1>
        <p style={styles.formSubtitle}>Tell us about your repair needs and we'll get back to you quickly!</p>
        
        <div onSubmit={handleSubmit} style={styles.repairForm}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label htmlFor="address" style={styles.label}>Service Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="serviceType" style={styles.label}>Type of Service *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select a service</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="urgency" style={styles.label}>Urgency Level</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="preferredDate" style={styles.label}>Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="preferredTime" style={styles.label}>Preferred Time</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="budget" style={styles.label}>Estimated Budget</label>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="Optional"
                value={formData.budget}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label htmlFor="description" style={styles.label}>Describe the Issue *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Please provide details about the repair needed..."
                style={styles.textarea}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.3)';
            }}
          >
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeRepairContact;