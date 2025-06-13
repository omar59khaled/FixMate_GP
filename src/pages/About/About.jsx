import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="header-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1>Welcome to FixMate</h1>
              <p className="lead">The Smart Solution for Home Maintenance Services!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="content-block">
                <p>
                  FixMate is an innovative graduation project designed to connect users with reliable technicians 
                  using artificial intelligence. We aim to simplify the process of requesting home repair services 
                  like plumbing, electrical work, and air conditioning through a secure and fully digital experience.
                </p>
                <p>
                  We are final-year students from the Faculty of Computers and Artificial Intelligence – Sadat City 
                  University. By combining our skills in software development, data analysis, and AI, we've built a 
                  smart platform that solves a real-world problem many people face.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🏠</div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div class="row">
            <div className="col-12">
              <h2>FixMate Features</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="feature-item">
                <h4>Sentiment Analysis</h4>
                <p>Our system automatically analyzes customer reviews to evaluate satisfaction and ensure service quality.</p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="feature-item">
                <h4>Check Problem Model</h4>
                <p>The AI can detect and classify the type of issue based on a customer's description or an uploaded image, helping assign the right technician.</p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="feature-item">
                <h4>Instant and Easy Booking</h4>
                <p>Book your service within minutes through our mobile or web app.</p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="feature-item">
                <h4>Verified Technicians</h4>
                <p>All technicians undergo a strict review and verification process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🚀</div>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-block">
                <h2>Our Vision</h2>
                <p>
                  To become the leading platform for intelligent home service solutions in Egypt and the Arab world 
                  by combining advanced technology with a seamless user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="content-block">
                <h2>Our Team</h2>
                <p>
                  We are a team of final-year students passionate about solving real-life problems using technology. 
                  FixMate is our graduation project that brings web development, artificial intelligence, and system design.
                </p>
                <div className="university-info">
                  <h5>Faculty of Computers and Artificial Intelligence</h5>
                  <p className="university-name">Sadat City University</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">👥</div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;