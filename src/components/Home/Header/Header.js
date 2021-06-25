import React, { useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const [show, setShow] = useState(false);

  const handleShowMenu = () => setShow(true);

  const handleCloseMenu = () => setShow(false);

  return (
    <header className="header" id="header">
      <div className="nav-header container">
        <Link to="/" className="nav__logo">
          Cota
        </Link>
        <div className={`nav__menu ${show ? "show-menu" : ""} `} id="nav-menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link
                to="/help-center"
                onClick={handleCloseMenu}
                href="#skills"
                className="nav__link"
              >
                <i className="uil uil-file-alt nav__icon"></i> Help Center
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/pro"
                onClick={handleCloseMenu}
                href="#services"
                className="nav__link"
              >
                <i className="uil uil-briefcase-alt nav__icon"></i> Premium
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/login"
                onClick={handleCloseMenu}
                href="#portafolio"
                className="nav__link nav__link_login"
              >
                <i className="uil uil-scenery nav__icon"></i> Login
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/signup"
                onClick={handleCloseMenu}
                href="#contact"
                className="nav__link nav__link__signup"
              >
                <i className="uil uil-message nav__icon"></i> Sing Up
              </Link>
            </li>
          </ul>
          <i
            onClick={handleCloseMenu}
            className="uil uil-times nav__close"
            id="nav-close"
          ></i>
        </div>

        <div className="nav__btns">
          <div onClick={handleShowMenu} className="nav__toggle" id="nav-toggle">
            <i className="uil uil-apps"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
