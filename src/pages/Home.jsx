import { Link, Outlet } from "react-router-dom";
import CompanyLogos from "../components/CompanyLogos";


const Home = () => {
  return (
    <div>
      
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <div>
      <img src="https://st2.depositphotos.com/5142301/7711/v/450/depositphotos_77110131-stock-illustration-j-letter-one-line-colorful.jpg" alt="logo"  style={ { width:'20px',height:'20px', marginRight: '10px', marginBottom: '5px', marginLeft:"60px" }} />
      <Link className="navbar-brand" to="/">Jobee</Link>
    </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/allcompanies">Companies</Link>
          </li>
          </ul>
          <ul className="navbar-nav" style={{marginRight: '60px'}}>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register" >Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Outlet />
  <div>
    <CompanyLogos />
  </div>
  </div>

  )
}

export default Home;

