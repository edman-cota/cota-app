import React from 'react';
import './sidebar.scss';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo.png';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo-container">
        <img src={LogoImg} alt="Logo" width="50" height="50" />
      </div>
      <div className="sidebar__menu-container">
        <Link to="/web/view=board" className="sidebar-item">
          <i className="uil uil-estate"></i> Overview
        </Link>
        <Link to="/web/view=board" className="sidebar-item">
          <i className="uil uil-chart-line"></i>Stats
        </Link>
        <div className="menu-item">
          <Link to="/web/view=board" className="sidebar-item active">
            <i className="uil uil-folder"></i>Projects
            <span></span>
          </Link>
          <div className="selected-marker">
            <Link to="/web/view=board">
              <span></span>
            </Link>
          </div>
        </div>

        <Link to="/web/view=board" className="sidebar-item">
          <i className="uil uil-chat"></i>Chats
        </Link>
        <Link to="/web/view=board" className="sidebar-item">
          <i className="uil uil-calendar-alt"></i>Calendar
        </Link>
      </div>
    </div>
  )
}
