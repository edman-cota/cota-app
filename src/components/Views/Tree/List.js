import React from "react";
import "./list.scss";
import "./project-title.scss";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";

import Task from "./Task";
import NewTask from "./NewTask/NewTask";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

// REACT BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      projectsList: [],
      currentProjectTitle: "jojo",
      filter: 0,
      showCompleted: true,
      showAddTask: false,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/Projects")
      .on("value", (snapshot) => {
        let projectList = [];
        snapshot.forEach((snap) => {
          if (snap.val().name === "Inbox") {
            projectList.push(snap.val());
            this.setState({ projectsList: projectList });
          }
        });
      });

    // RETRIEVE TASKS
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
      .on("value", (snapshot) => {
        let taskList = [];
        snapshot.forEach((snap) => {
          taskList.push(snap.val());
        });
        this.setState({ tasksList: taskList });
      });
  }

  render() {
    return (
      <div className="list-view-container">
        <div className="list-container">
          <div className="project-title">
            <div className="project-title-front">
              <div className="filter-container">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <i className="uil uil-filter"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.state.projectsList.map((data) => {
                      return (
                        <>
                          <Dropdown.Item
                            href="#/action-1"
                            className={`${data.ordered === 0 ? "active" : ""}`}
                          >
                            <i className="uil uil-align-center-alt"></i>
                            <FormattedMessage id="custom"></FormattedMessage>
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            className={`${data.ordered === 1 ? "active" : ""}`}
                          >
                            <i className="uil uil-arrow-up"></i>
                            <FormattedMessage id="priority"></FormattedMessage>
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-3"
                            className={`${data.ordered === 2 ? "active" : ""}`}
                          >
                            <i className="uil uil-calender"></i>
                            <FormattedMessage id="date"></FormattedMessage>
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-3"
                            className={`${data.ordered === 3 ? "active" : ""}`}
                          >
                            <i className="uil uil-font"></i>
                            <FormattedMessage id="title"></FormattedMessage>
                          </Dropdown.Item>
                        </>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {this.state.projectsList.map((data) => {
              return (
                <div className="project-title-center">
                  <h4>{data.name}</h4>
                </div>
              );
            })}

            <div className="project-title-last">
              <div className="project-title-more-frame">
                <button
                  className="add-task-btn"
                  onClick={() =>
                    this.setState({ showAddTask: !this.state.showAddTask })
                  }
                >
                  <i className="uil uil-plus"></i>
                </button>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="more-dropdown-button">
                    <i className="uil uil-ellipsis-h"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.state.projectsList.map((data) => {
                      return (
                        <>
                          <Dropdown.Item href="#/action-1">
                            <i className="uil uil-share-alt"></i>
                            {data.show_completed ? (
                              <FormattedMessage id="hide_completed"></FormattedMessage>
                            ) : (
                              <FormattedMessage id="show_completed"></FormattedMessage>
                            )}
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            <i className="uil uil-copy-alt"></i>
                            <FormattedMessage id="clear_completed"></FormattedMessage>
                          </Dropdown.Item>
                        </>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <ul className="tree-list">
            {this.state.tasksList.map((data) => {
              return (
                <Item
                  taskId={data.id}
                  completed={data.completed}
                  taskName={data.content}
                  dueDate={data.due}
                  priority={data.priority}
                />
              );
            })}
            <NewTask showAddTask={this.state.showAddTask} />
          </ul>
        </div>
        <Task />
      </div>
    );
  }
}

function Item(props) {
  return (
    <li className="tree-item">
      <div className="tree-row">
        <div className="tree-row-front">
          <RenderStatus taskId={props.taskId} completed={props.completed} />
        </div>
        <div className="tree-row-content">
          <div className="task-menu-bar">
            <Tooltip
              title={<FormattedMessage id="tag"></FormattedMessage>}
              placement="bottom"
              arrow
            >
              <i className="uil uil-pricetag-alt"></i>
            </Tooltip>
            {props.dueDate ? (
              <RenderDate due={props.dueDate} />
            ) : (
              <Tooltip
                title={<FormattedMessage id="date"></FormattedMessage>}
                placement="bottom"
                arrow
              >
                <i className="uil uil-schedule"></i>
              </Tooltip>
            )}
            <RenderPriority taskId={props.taskId} priority={props.priority} />
          </div>
          <div className="task-name-wrapper">
            <div className="task-name-frame">
              <div className="task-name-frame-border">
                <span className="task-name">{props.taskName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function RenderStatus(props) {
  const switchTaskStatus = (prop) => {
    console.log(prop);
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
      .child(prop)
      .update({ completed: 1 });
  };

  const uncompleteTaskStatus = (propb) => {
    console.log(propb);
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
      .child(propb)
      .update({ completed: 0 });
  };

  switch (props.completed) {
    case 0:
      return (
        <Tooltip
          title={<FormattedMessage id="complete"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i
            className="uil uil-circle"
            onClick={() => switchTaskStatus(props.taskId)}
          ></i>
        </Tooltip>
      );
    case 1:
      return (
        <Tooltip
          title={<FormattedMessage id="completed"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i
            className="uil uil-check-circle"
            onClick={() => uncompleteTaskStatus(props.taskId)}
          ></i>
        </Tooltip>
      );
    default:
      return (
        <Tooltip
          title={<FormattedMessage id="complete"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i
            className="uil uil-circle"
            onclick={() => switchTaskStatus(props.taskId)}
          ></i>
        </Tooltip>
      );
  }
}

function RenderPriority(props) {
  const addPriority = (prop) => {
    console.log(prop);
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
      .child(prop)
      .update({ priority: 2 });
  };

  switch (props.priority) {
    case 0: // None
      return (
        <Tooltip
          title={<FormattedMessage id="priority"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i
            className="uil uil-arrow-up"
            onClick={() => addPriority(props.taskId)}
          ></i>
        </Tooltip>
      );
    case 1: // None
      return (
        <Tooltip
          title={<FormattedMessage id="priority"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i
            className="uil uil-arrow-up"
            onClick={() => addPriority(props.taskId)}
          ></i>
        </Tooltip>
      );
    case 2: // Low
      return (
        <Tooltip
          title={<FormattedMessage id="low"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up priority-low"></i>
        </Tooltip>
      );
    case 3: // Medium
      return (
        <Tooltip
          title={<FormattedMessage id="medium"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up priority-medium"></i>
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip
          title={<FormattedMessage id="high"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up priority-high"></i>
        </Tooltip>
      );
    default:
      return (
        <Tooltip
          title={<FormattedMessage id="priority"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up"></i>
        </Tooltip>
      );
  }
}

function RenderDate(props) {
  var todayDate = new Date().setHours(0, 0, 0, 0);
  var dateSaved = new Date(parseInt(props.due)).setHours(0, 0, 0, 0);

  if (todayDate - dateSaved === 86400000) {
    return (
      <p className="uil-schedule-text-yesterday">
        <FormattedMessage id="yesterday"></FormattedMessage>
      </p>
    );
  }

  if (todayDate - dateSaved > 86400000) {
    return (
      <p className="uil-schedule-text-yesterday">
        {" "}
        {moment.unix(props.due / 1000).format("MMM DD")}{" "}
      </p>
    );
  }

  if (todayDate === dateSaved) {
    return (
      <p className="uil-schedule-text-today">
        <FormattedMessage id="today"></FormattedMessage>
      </p>
    );
  }

  if (dateSaved - todayDate === 86400000) {
    return (
      <p className="uil-schedule-text-tomorrow">
        <FormattedMessage id="tomorrow"></FormattedMessage>
      </p>
    );
  }

  return (
    <p className="uil-schedule-text">
      {" "}
      {moment.unix(props.due / 1000).format("MMM DD")}{" "}
    </p>
  );
}

export default List;
