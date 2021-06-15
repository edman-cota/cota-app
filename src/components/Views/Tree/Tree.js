import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

// COMPONENTS
import List from './List';

// MATERIAL DESIGN UI
import Tooltip from '@material-ui/core/Tooltip';

export default function Tree() {

  return (
    <div className="main-web-container">
      <Sidebar />
      <div className="content-container">
      <Navbar>
      </Navbar>
      <div className="switch-view-container">
          <ul>
              <li className="i-item active">
                 <Tooltip title="Tree View" placement="bottom" arrow>
                  <Link to="/web/view=tree">
                        <i className="uil uil-align-right"></i>
                    </Link>
                  </Tooltip> 
              </li>
              <li className="i-item">
                  <Tooltip title="Board View" placement="bottom" arrow>
                    <Link to="/web/view=board">
                      <i className="uil uil-grids"></i>
                    </Link>
                  </Tooltip> 
              </li>
              <li className="i-item">
                <Tooltip title="Timeline View" placement="bottom" arrow>
                  <Link to="/web/view=timeline">
                    <i className="uil uil-align-alt"></i>
                  </Link>
                </Tooltip>
              </li>
          </ul>  
      </div>
      <div className="project-title">
          <h3>Projects</h3>
      </div>
      <List />
      </div>
    </div>
  )
}
