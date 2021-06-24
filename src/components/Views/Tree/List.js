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
import Priority from "../Priority/Priority";
import Item from "../Item/Item";
import ItemCompleted from "../Item/ItemCompleted";

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
      completedTasks: [],
      currentProjectTitle: "jojo",
      filter: 0,
      showCompleted: false,
      showAddTask: false,
    };
  }

  // RETRIEVE PROJECT
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
            this.setState({ showCompleted: snap.val().show_completed });
          }
        });
      });

    // RETRIEVE TASKS
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
      .on("value", (snapshot) => {
        let taskList = [];
        let completedTask = [];
        snapshot.forEach((snap) => {
          if (snap.val().completed === 0) {
            taskList.push(snap.val());
          }
          if (snap.val().completed === 1) {
            completedTask.push(snap.val());
          }
        });
        this.setState({ tasksList: taskList });
        this.setState({ completedTasks: completedTask });
      });
  }

  hideShowCompleted(props) {
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/Projects")
      .child(props[0])
      .update({ show_completed: props[1] });
  }

  clearCompleted() {}

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
                          <Dropdown.Item
                            onClick={() =>
                              this.hideShowCompleted([
                                data.id,
                                !data.show_completed,
                              ])
                            }
                          >
                            <i className="uil uil-share-alt"></i>
                            {data.show_completed ? (
                              <FormattedMessage id="hide_completed"></FormattedMessage>
                            ) : (
                              <FormattedMessage id="show_completed"></FormattedMessage>
                            )}
                          </Dropdown.Item>
                          <Dropdown.Item>
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
            {this.state.completedTasks.map((data) => {
              if (this.state.showCompleted) {
                return (
                  <ItemCompleted
                    taskId={data.id}
                    completed={data.completed}
                    taskName={data.content}
                    dueDate={data.due}
                    priority={data.priority}
                  />
                );
              }
            })}
            <NewTask showAddTask={this.state.showAddTask} />
          </ul>
        </div>
        <Task />
      </div>
    );
  }
}

export default List;
