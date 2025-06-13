import React from 'react';
import { Link } from 'react-router-dom';
import './TechnichanNav.css';

const TechnichanNav = ({ 
  title = "Dashboard", 
  userInfo, 
  onLogout, 
  showProfileLink = true 
}) => {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
      <div className="user-info">
        {showProfileLink && (
          <Link 
            to="/user-profile" 
            className="profile-icon-link"
            title="Go to Profile"
          >
            <div className="profile-icon me-3">
              <svg 
                className="profile-icon-svg"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        )}
        
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default TechnichanNav;