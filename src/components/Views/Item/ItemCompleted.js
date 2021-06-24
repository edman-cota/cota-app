import React from "react";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";
import { FormattedMessage } from "react-intl";

import Priority from "../Priority/Priority";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

const ItemCompleted = (props) => {
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

            <Priority taskId={props.taskId} priority={props.priority} />
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
};

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

export default ItemCompleted;
