import React, { useState } from "react";
import "./new-task.scss";
import firebase from "firebase/app";
import "firebase/database";
import { Input } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { FormattedMessage } from "react-intl";

import { useAuth } from "../../../../contexts/AuthContext";

function NewTask(props) {
  const { currentUser } = useAuth();

  const [priority, setPriority] = useState(0);
  const [taskState, setTaskState] = useState({ task: "" });
  const [userState, setUserState] = useState({
    task: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { task } = userState;

    if (task.trim() === "") {
      return;
    }

    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Milliseconds
    // const timestampSeconds = Math.floor(timestamp / 1000) // Seconds

    console.log(timestamp);

    var taskListRef = firebase.database().ref(currentUser.uid + "/tasks");
    var newTaskRef = taskListRef.push();
    newTaskRef.set({
      completed: 0,
      content: task,
      date_added: timestamp.toString(),
      date_completed: "",
      due: "",
      id: newTaskRef.key,
      priority: priority,
      project_id: "-MYDQJhtTY-2sQLqDUhh",
      user_id: "2ZX9urSBNmY5BWAtyrBVK1q92iz1",
    });

    setUserState({ task: "" });
    setPriority(0);
  }

  const handleChange = (event) => {
    const { task } = userState;
    setTaskState({ task: event.target.value });

    const { target } = event;

    setUserState({ task: target.id === "task" ? target.value : task });
  };

  return (
    <li
      className={`${
        props.showAddTask ? "show-add-task-item" : "add-task-item"
      }`}
    >
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          className="add-task-input"
          id="task"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          value={userState.task}
          autoFocus
        />
        <Dropdown>
          <Dropdown.Toggle variant="link" id="new-date-dropdown-button">
            <i className="uil uil-calender"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <i className="uil uil-align-center-alt"></i>
              <FormattedMessage id="custom"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <i className="uil uil-arrow-up"></i>
              <FormattedMessage id="priority"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <i className="uil uil-calender"></i>
              <FormattedMessage id="date"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <i className="uil uil-font"></i>
              <FormattedMessage id="title"></FormattedMessage>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="link" id="add-priority-dropdown-button">
            <i className={`uil uil-arrow-up priority-${priority}`}></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setPriority(3)}>
              <i className="uil uil-arrow-up priority-high"></i>
              <FormattedMessage id="high"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPriority(2)}>
              <i className="uil uil-arrow-up priority-medium"></i>
              <FormattedMessage id="medium"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPriority(1)}>
              <i className="uil uil-arrow-up priority-low"></i>
              <FormattedMessage id="low"></FormattedMessage>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPriority(0)}>
              <i className="uil uil-arrow-up"></i>
              <FormattedMessage id="none"></FormattedMessage>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </form>
    </li>
  );
}

export default NewTask;
