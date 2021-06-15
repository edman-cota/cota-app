/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import Profile from '../../assets/profile.png';
import { useAuth } from '../../contexts/AuthContext';

// MATERIAL DESIGN UI
import Tooltip from '@material-ui/core/Tooltip';

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItemMoon />
        <NavItemNotification />

        <NavItem>
            <DropdownMenu></DropdownMenu>
        </NavItem>
      </ul>
    </nav>
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
          <Tooltip title="Notifications" placement="bottom" arrow>
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
        <Tooltip title="Dark Mode" placement="bottom" arrow>
          <i className="uil uil-moon"></i>
        </Tooltip>
      </a>

      {open && props.children}
    </li>
  );
}

  
function DropdownMenu() {

  const [error, setError] = useState('');
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
        await logout();
        history.push('/login');
    } catch {
        setError('Fail to logout');
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
          My Profile
        </DropdownItem>
        <DropdownItem goTo="/settings">
          <i className="uil uil-setting"></i>
          Account Settings
        </DropdownItem>
        <DropdownItem goTo="/help-center">
          <i className="uil uil-question-circle"></i>
          Help
        </DropdownItem>
        <DropdownItem goTo="/pro">
          <i className="uil uil-shield-exclamation"></i>
          Go Pro
        </DropdownItem>
        <div className="horizontal-divider">
          <hr/>
        </div>
        <DropdownItemLogout>
          <i className="uil uil-signout"></i>
          Log out
        </DropdownItemLogout>
      </div>
    </div>
  );
}

  export default Navbar;
