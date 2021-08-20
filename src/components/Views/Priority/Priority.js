import React from "react";
import { FormattedMessage } from "react-intl";
import "firebase/database";
import "./priority.scss";
// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

const Priority = (props) => {
  const addPriority = (prop) => {
    // firebase
    //   .database()
    //   .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks")
    //   .child(prop)
    //   .update({ priority: 2 });
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
    case 1: // Low
      return (
        <Tooltip
          title={<FormattedMessage id="low"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up priority-low"></i>
        </Tooltip>
      );
    case 2: // Medium
      return (
        <Tooltip
          title={<FormattedMessage id="medium"></FormattedMessage>}
          placement="bottom"
          arrow
        >
          <i className="uil uil-arrow-up priority-medium"></i>
        </Tooltip>
      );
    case 3:
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
};

export default Priority;
