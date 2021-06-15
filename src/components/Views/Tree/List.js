import React from 'react';
import './list.scss';
import { useAuth } from '../../../contexts/AuthContext';
import firebase from "firebase/app";
import "firebase/database";
// import { app } from '../../../firebase';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = 
    {
      tasksList: []
    }
  }

  componentDidMount() {

    console.log("hola");


    firebase.database().ref('2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks').on('value', snapshot => { 
      let taskList = []; 
      snapshot.forEach(snap => {
        console.log(snap.val());
        taskList.push(snap.val());
      });
      this.setState({ tasksList: taskList});
    });
  }

  render () {
    return (
    
      <div className="list-container">
        <ul className="tree-list">
          {this.state.tasksList.map(data =>  {
            return (
              <Item taskName={data.content} />
            )
          })}
        </ul>
      </div>
    )
  }
}

function Item(props) {
  return (
    <li className="tree-item">
      <div className="tree-row">
        <div className="tree-row-front">
        </div>
        <div className="tree-row-content">
          <div className="task-menu-bar">
            <i className="uil uil-pricetag-alt"></i>
            <i className="uil uil-schedule"></i>
            <i className="uil uil-user"></i>
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
  )
};

export default List;