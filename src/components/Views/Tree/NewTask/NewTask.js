import React, { useState } from "react";
import "./new-task.scss";
import firebase from "firebase/app";
import "firebase/database";

import { useAuth } from "../../../../contexts/AuthContext";

function NewTask(props) {
  const { currentUser } = useAuth();

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
      priority: 0,
      project_id: "-MYDQJhtTY-2sQLqDUhh",
      user_id: "2ZX9urSBNmY5BWAtyrBVK1q92iz1",
    });

    setUserState({ task: "" });
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
      </form>
    </li>
  );
}

export default NewTask;
