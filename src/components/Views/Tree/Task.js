import React from "react";
import "./task.scss";
import { FormattedMessage } from "react-intl";

// REACT BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

class Task extends React.Component {
  render() {
    return (
      <div className="task-container">
        <div className="task-settings-container">
          <ul>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="link" id="task-dropdown-basic">
                  <i className="uil uil-ellipsis-h"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <i className="uil uil-share-alt"></i>
                    <FormattedMessage id="share"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <i className="uil uil-copy-alt"></i>
                    <FormattedMessage id="duplicate_task"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <i className="uil uil-minus-path"></i>
                    <FormattedMessage id="move_task"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <i className="uil uil-history"></i>
                    <FormattedMessage id="task_activity"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <i className="uil uil-trash-alt"></i>
                    <FormattedMessage id="delete"></FormattedMessage>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="task-name-container">
          <p>Add circle icon at the beginning</p>
        </div>
        <div className="primary-options-container">
          <div className="complete-container"></div>
          <div className="calendar-container">
            <div className="calendar-frame">
              <i className="uil uil-schedule"></i>
              <p>
                <FormattedMessage id="date_reminder"></FormattedMessage>
              </p>
            </div>
          </div>
          <div className="priority-container">
            <div className="priority-frame">
              <Dropdown>
                <Dropdown.Toggle variant="link" id="priority-dropdown-basic">
                  <i className="uil uil-arrow-up"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <i className="uil uil-arrow-up priority-high"></i>
                    <FormattedMessage id="high"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <i className="uil uil-arrow-up priority-medium"></i>
                    <FormattedMessage id="medium"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <i className="uil uil-arrow-up priority-low"></i>
                    <FormattedMessage id="low"></FormattedMessage>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <i className="uil uil-arrow-up"></i>
                    <FormattedMessage id="none"></FormattedMessage>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
