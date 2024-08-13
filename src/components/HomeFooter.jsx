import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const HomeFooter = () => {
  return (
    <footer className="container-fluid bg-dark text-white p-4" style={{ width: '100%' }}>
      <div className="row">
        <div className="col-md-4 mb-3">
          <h5>Jobee</h5>
          <p>Empowering your career journey with the best job opportunities and career resources.</p>
        </div>
        <div className="col-md-4 mb-3">
          <ul className="list-unstyled">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/" className="text-white">About Us</Link></li>
            <li><Link to="/" className="text-white">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5>Contact Us</h5>
          <p>Email: <a href="mailto:support@jobee.com" className="text-white">support@jobee.com</a></p>
          <p>Phone: +1 234 567 890</p>
          <div>
            <Link to="https://facebook.com" className="text-white me-2" aria-label="Facebook"><FaFacebook /></Link>
            <Link to="https://twitter.com" className="text-white me-2" aria-label="Twitter"><FaTwitter /></Link>
            <Link to="https://linkedin.com" className="text-white me-2" aria-label="LinkedIn"><FaLinkedin /></Link>
            <Link to="https://instagram.com" className="text-white" aria-label="Instagram"><FaInstagram /></Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="mb-0">&copy; {new Date().getFullYear()} Jobee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default HomeFooter;
