import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Header2.css";

export function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);

  {
    /* Scroll effect */
  }

  useEffect(() => {
    const handleScroll = () => {
      let opacity = Math.max(0.5, 1 - window.scrollY / 200);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER 2 */}
      <header
        className="header"
        id="header"
        style={{ backgroundColor: `rgba(240, 237, 238, ${bgOpacity})` }}
      >
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <img src="/images/LaspotLogo.png" alt="logo image" />
            La Spot
          </a>

          <div
            className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="#home"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </a>
              </li>

              <li className="nav__item">
                
                <Link to="/user" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Parking
                </Link>

              </li>

              <li className="nav__item">
                <a
                  href="#parking"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  History
                </a>
              </li>
            </ul>

            {/* PROFILE IMAGE */}
            <div className="nav__profile">
              <Link to = "/userprofile" >
              <img
                src="/images/userProfile.jpg"
                alt="User Profile"
                className="profile__image"
              />
              </Link>
            </div>

            {/* CLOSE BUTTON */}
            <div
              className="nav__close"
              id="nav-close"
              onClick={() => setMenuOpen(false)}
            >
              <i className="ri-close-line"></i>
            </div>
          </div>

          {/* TOGGLE BUTTON FOR RESIZED MEDIA */}
          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <i className="ri-apps-2-line"></i>
          </div>
        </nav>
      </header>
    </>
  );
}
