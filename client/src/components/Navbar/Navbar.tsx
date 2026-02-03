import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-link">
              Map
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activity" className="nav-link">
              Activity
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
