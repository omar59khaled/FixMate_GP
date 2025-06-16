import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { userContext } from '../Context/UserContext';
import logoImage from '../../../../src/assets/logos/fixMate_logo-removebg-preview.png';

const Navbar = () => {
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const logOut = () => {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg  transition-all ${scrolled ? 'navbar-scrolled' : 'navbar-top'}`}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand brand-modern" to="/">
          <img src={logoImage} alt="FixMate Logo" className="logo-img" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className={`navbar-toggler custom-toggler ${isOpen ? 'toggler-open' : ''}`}
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="toggler-line"></span>
          <span className="toggler-line"></span>
          <span className="toggler-line"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto nav-modern text-light">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/">
                <span className="nav-text ">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/services">
                <span className="nav-text">Services</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/technicians">
                <span className="nav-text">Best Technicians</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/about">
                <span className="nav-text">About Us</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/Booking-Summmaries">
                <span className="nav-text">My Bookings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-modern" to="/contact">
                <span className="nav-text">Contact</span>
              </NavLink>
            </li>
          </ul>
          {/* User Profile Icon - Responsive */}



          {/* Authentication Buttons */}
          <div className="navbar-auth-modern">
            {token !== null ? (
              <><Link 
  to="/user-profile" 
  className="profile-icon-link"
  onClick={() => setIsOpen(false)}
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
<button onClick={logOut} className=" nav-text btn-outline-modern">
                <span className='nav-text'>Logout</span>
              </button>

</>
              
            ) : (
              <Link to="/auth" className="btn btn-modern btn-primary-modern">
                <span>Sign Up / Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;