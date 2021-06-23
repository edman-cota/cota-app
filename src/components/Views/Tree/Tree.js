import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { FormattedMessage } from "react-intl";

// COMPONENTS
import List from "./List";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

export default function Tree() {
  return (
    <div className="main-web-container">
      <Sidebar />
      <div className="content-container">
        <Navbar></Navbar>
        <div className="switch-view-container">
          <ul>
            <li className="i-item active">
              <Tooltip
                title={<FormattedMessage id="tree_view"></FormattedMessage>}
                placement="bottom"
                arrow
              >
                <Link to="/web/view=tree">
                  <i className="uil uil-align-right"></i>
                </Link>
              </Tooltip>
            </li>
            <li className="i-item">
              <Tooltip
                title={<FormattedMessage id="board_view"></FormattedMessage>}
                placement="bottom"
                arrow
              >
                <Link to="/web/view=board">
                  <i className="uil uil-grids"></i>
                </Link>
              </Tooltip>
            </li>
            <li className="i-item">
              <Tooltip
                title={<FormattedMessage id="timeline_view"></FormattedMessage>}
                placement="bottom"
                arrow
              >
                <Link to="/web/view=timeline">
                  <i className="uil uil-align-alt"></i>
                </Link>
              </Tooltip>
            </li>
          </ul>
        </div>
        <List />
      </div>
    </div>
  );
}
