import React, { useEffect, useState } from "react";
import "./task.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../../../contexts/AuthContext";
import Priority from "../Priority/Priority";

// REACT BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

const Task = (props) => {
  const { currentUser } = useAuth();
  const [currentTask, setCurrentTask] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState("-McgmHdNuHhjlgvIaCAt");

  useEffect(() => {
    console.log("use effect");
    firebase
      .database()
      .ref(currentUser.uid + "/tasks/" + currentTaskId)
      .on("value", (snapshot) => {
        let taskList = [];
        snapshot.forEach((snap) => {
          // console.log(snap.val());
          taskList.push(snap.val());
        });
        setCurrentTask({ currentTask: taskList });
      });
  }, []);

  return (
    <div className="task-container">
      <div className="task-empty-container">
        <div className="task-empty-frame">
          <i className="uil uil-left-indent"></i>
          <p>Click a task for it's detail</p>
        </div>
      </div>
      <div className="task-detail-container">
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
          {/* <p>{currentTask.currentTask[1]}</p> */}
        </div>
        <div className="primary-options-container">
          <div className="complete-container"></div>
          <div className="calendar-container">
            <div className="calendar-frame">
              <i className="uil uil-schedule"></i>
              {/* <RenderDate due={currentTask.currentTask[4]} /> */}
              {/* <p>
                <FormattedMessage id="date_reminder"></FormattedMessage>
              </p> */}
            </div>
          </div>
          <div className="priority-container">
            <div className="priority-frame">
              {/* <Priority
                taskId={currentTask.currentTask[5]}
                priority={currentTask.currentTask[6]}
              /> */}
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
    </div>
  );
};

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

export default Task;
