import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../../../contexts/AuthContext";
import { FormattedMessage } from "react-intl";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

const RenderStatus = (props) => {
  const { currentUser } = useAuth();
  const switchTaskStatus = (prop) => {
    console.log(prop);
    firebase
      .database()
      .ref(currentUser.uid + "/tasks")
      .child(prop)
      .update({ completed: 1 });
  };

  const uncompleteTaskStatus = (propb) => {
    console.log(propb);
    firebase
      .database()
      .ref(currentUser.uid + "/tasks")
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
};

export default RenderStatus;
