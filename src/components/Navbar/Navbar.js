/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./navbar.scss";
import { Link, useHistory } from "react-router-dom";
import Profile from "../../assets/profile.png";
import { useAuth } from "../../contexts/AuthContext";
import { FormattedMessage } from "react-intl";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

function Navbar(props) {
  return (
    <div className="main-navbar">
      <ul className="ul-navbar-nav">
        <NavItemMoon />
        <NavItemNotification />

        <NavItem>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </ul>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <img className="image-profile" src={Profile} alt="User profile" />
      </a>

      {open && props.children}
    </li>
  );
}

function NavItemNotification(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <Tooltip
          title={<FormattedMessage id="notifications"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-bell"></i>
        </Tooltip>
      </a>

      {open && props.children}
    </li>
  );
}

function NavItemMoon(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <Tooltip
          title={<FormattedMessage id="dark_mode"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-moon"></i>
        </Tooltip>
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Fail to logout");
    }
  }

  function DropdownItem(props) {
    return (
      <Link to={props.goTo} className="menu-item">
        {props.children}
      </Link>
    );
  }

  function DropdownItemLogout(props) {
    return (
      <a onClick={handleLogout} className="menu-item">
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown">
      <div className="menu">
        <DropdownItem goTo="/profile">
          <i className="uil uil-user"></i>
          <FormattedMessage id="my_profile"></FormattedMessage>
        </DropdownItem>
        <DropdownItem goTo="/settings">
          <i className="uil uil-setting"></i>
          <FormattedMessage id="account_settings"></FormattedMessage>
        </DropdownItem>
        <DropdownItem goTo="/help-center">
          <i className="uil uil-question-circle"></i>
          <FormattedMessage id="help"></FormattedMessage>
        </DropdownItem>
        <DropdownItem goTo="/pro">
          <i className="uil uil-shield-exclamation"></i>
          <FormattedMessage id="go_pro"></FormattedMessage>
        </DropdownItem>
        <div className="horizontal-divider">
          <hr />
        </div>
        <DropdownItemLogout>
          <i className="uil uil-signout"></i>
          <FormattedMessage id="log_out"></FormattedMessage>
        </DropdownItemLogout>
      </div>
    </div>
  );
}

export default Navbar;
