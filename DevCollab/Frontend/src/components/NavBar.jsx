import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>
        <a href="#home">DevCollab</a>
      </h1>

      <ul>
        <li>
          <a href="#home" className="nav-link">
            Home
          </a>
        </li>

        <li>
          <a href="#features" className="nav-link">
            Features
          </a>
        </li>

        <li>
          <a href="#workflow" className="nav-link">
            Workflow
          </a>
        </li>

        <li>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </li>

        <li>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
