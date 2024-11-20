import { Link, Outlet } from "react-router-dom";
import CompanyLogos from "../components/CompanyLogos";

const Home = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="https://st2.depositphotos.com/5142301/7711/v/450/depositphotos_77110131-stock-illustration-j-letter-one-line-colorful.jpg"
              alt="Jobee logo"
              style={{
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            <strong>Jobee</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <strong>Home</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/allcompanies">
                  <strong>Companies</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  <strong>Jobs</strong>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <strong>Login</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <strong>Signup</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>

      <footer style={{ marginTop: 'auto', padding: '1rem 0', backgroundColor: '#f8f9fa' }}>
        <CompanyLogos />
      </footer>
    </div>
  );
};

export default Home;
