import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <p className="navbar-brand">
            <img src="./assets/img/kitabisajual.jpg" className="h-5 w-5" alt="Logo" /> Navbar
          </p>
        </Link>
        <button
          className={`navbar-toggler ${isNavOpen ? "collapsed" : ""}`}
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <p className="nav-link">Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/link">
                <p className="nav-link">Link</p>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-success" type="submit">
              Contact
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
