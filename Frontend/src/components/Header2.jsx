import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Header2.css";

export function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [profileImage, setProfileImage] = useState("/images/userProfile.jpg");

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      let opacity = Math.max(0.5, 1 - window.scrollY / 200);
      setBgOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch profile image
    axios
      .get("http://localhost:8080/personalized-account", { withCredentials: true })
      .then((res) => {
        if (res.data.profile_image) {
          setProfileImage(res.data.profile_image);
        }
      })
      .catch((err) => {
        console.error("Error fetching header profile image:", err);
      });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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

        <div className={`nav__menu ${menuOpen ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li className="nav__item">
              <Link to="/user" className="nav__link" onClick={() => setMenuOpen(false)}>
                Parking
              </Link>
            </li>
            <li className="nav__item">
              <a href="#parking" className="nav__link" onClick={() => setMenuOpen(false)}>
                History
              </a>
            </li>
          </ul>

          {/* Dynamic profile image */}
          <div className="nav__profile">
            <Link to="/userprofile">
              <img
                src={profileImage}
                alt="User Profile"
                className="profile__image"
              />
            </Link>
          </div>

          <div className="nav__close" id="nav-close" onClick={() => setMenuOpen(false)}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={() => setMenuOpen(true)}>
          <i className="ri-apps-2-line"></i>
        </div>
      </nav>
    </header>
  );
}
