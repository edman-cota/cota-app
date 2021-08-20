import "./web.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Kanban from "../Kanban/Kanban";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { FormattedMessage } from "react-intl";
import Modal from "../Modal/Modal";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

function Content() {
  const { currentUser } = useAuth();

  return (
    <div className="main-web-container">
      <Sidebar />
      <Modal show={true} />
      <div className="content-container">
        <Navbar></Navbar>
        <div className="switch-view-container">
          <ul>
            <li className="i-item">
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
            <li className="i-item active">
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
        <div className="project-title">
          <h3>Projects</h3>
          <p>{currentUser.uid}</p>
        </div>
        <Kanban />
      </div>
    </div>
  );
}

export default Content;
