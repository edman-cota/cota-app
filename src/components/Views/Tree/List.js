import React, { useEffect, useState } from "react";
import "./list.scss";
import "./project-title.scss";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";
import { usePositionReorder } from "./usePositionReorder";
import { useMeasurePosition } from "./useMeasurePosition";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";
import Task from "./Task";
import NewTask from "./NewTask/NewTask";
import Item from "../Item/Item";
import ItemCompleted from "../Item/ItemCompleted";
import Modal from "../../Modal/Modal";

// REACT BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

// const Lista = [
//   "Get current profile picture",
//   "Improve UI Design",
//   "Re-design add task input",
//   "Item Five",
// ];

function List() {
  const { currentUser } = useAuth();
  const [tasksList, setTasksList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState(0);

  // const [updatedList, updatePosition, updateOrder] = usePositionReorder(Lista);

  // RETRIEVE PROJECT
  useEffect(() => {
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/Projects")
      .on("value", (snapshot) => {
        let projectList = [];
        snapshot.forEach((snap) => {
          if (snap.val().name === "Inbox") {
            projectList.push(snap.val());
            setProjectsList(projectList);
            setShowCompleted(snap.val().show_completed);
          }
        });
      });
  }, []);

  useEffect(() => {
    // RETRIEVE TASKS
    firebase
      .database()
      .ref(currentUser.uid + "/tasks")
      .on("value", (snapshot) => {
        let taskList = [];
        let completedTask = [];
        snapshot.forEach((snap) => {
          if (snap.val().completed === 0) {
            // taskList.push(snap.val());
            taskList.push(snap.val());
          }
          if (snap.val().completed === 1) {
            completedTask.push(snap.val());
          }
        });

        setTasksList(taskList);
        setCompletedTasks(completedTask);
      });
  }, []);

  const [updatedList, updatePosition, updateOrder] =
    usePositionReorder(tasksList);

  function hideShowCompleted(props) {
    firebase
      .database()
      .ref("2ZX9urSBNmY5BWAtyrBVK1q92iz1/Projects")
      .child(props[0])
      .update({ show_completed: props[1] });
  }

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
                  {projectsList.map((data) => {
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
          {projectsList.map((data) => {
            return (
              <div className="project-title-center">
                {/* <h4>{data.name}</h4> */}
              </div>
            );
          })}

          <div className="project-title-last">
            <div className="project-title-more-frame">
              <button
                className="add-task-btn"
                onClick={() => setShowAddTask(!showAddTask)}
              >
                <i className="uil uil-plus"></i>
              </button>
              {/* <Dropdown>
                <Dropdown.Toggle variant="link" id="more-dropdown-button">
                  <i className="uil uil-ellipsis-h"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {projectsList.map((data) => {
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
              </Dropdown> */}
            </div>
          </div>
        </div>
        <ul className="tree-list">
          {/* {updatedList.map((name, index) => (
            <Item
              key={name}
              ind={index}
              updateOrder={updateOrder}
              updatePosition={updatePosition}
              name={name}
            />
          ))} */}
          {tasksList.map((data) => {
            return (
              <Item
                key={data.id}
                taskId={data.id}
                completed={data.completed}
                taskName={data.content}
                dueDate={data.due}
                priority={data.priority}
              />
            );
          })}
          {/* {updatedList.map(
            (name, index) => console.log(updatedList)
            <Item
              key={name}
              ind={index}
              updateOrder={updateOrder}
              updatePosition={updatePosition}
              name={name}
            />
          )} */}

          <NewTask showAddTask={showAddTask} />
        </ul>

        {completedTasks.length > 0 && showCompleted ? (
          <p className="completed-title">Completed</p>
        ) : (
          ""
        )}
        <ul className="completed-tree-list">
          {completedTasks.map((data) => {
            if (showCompleted) {
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
        </ul>
      </div>
      <Task />
      <Modal show={true} />
    </div>
  );
}

export default List;
