import React from 'react';
import './list.scss';
import moment from 'moment';
import firebase from "firebase/app";
import "firebase/database";

// MATERIAL DESIGN UI
import Tooltip from '@material-ui/core/Tooltip';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = { tasksList: [] };
  }

  componentDidMount() {

    firebase.database().ref('2ZX9urSBNmY5BWAtyrBVK1q92iz1/tasks').on('value', snapshot => { 
      let taskList = []; 
      snapshot.forEach(snap => {
        taskList.push(snap.val());
      });
      this.setState({ tasksList: taskList});
    });
  }

  render() {
    return (
      <div className="list-view-container">
        <div className="list-container">
          <ul className="tree-list">
            {this.state.tasksList.map(data =>  {
              return (
                <Item taskName={data.content} dueDate={data.due} priority={data.priority} />
              )
            })}
          </ul>
        </div>
        <div className="task-container">

        </div>
      </div>
    )
  }

  handleSelection() {
    console.log("Handle");
  }
}

function Item(props) {

  const demo =(props) => {
    <p>Hola mundo</p>
    console.log(props);
  }

  return (
    <li className="tree-item">
      <div className="tree-row">
        <div className="tree-row-front">
          <RenderPriority priority={props.priority} />
        </div>
        <div className="tree-row-content">
          <div className="task-menu-bar">
            <Tooltip title="Tag" placement="bottom" arrow>
              <i className="uil uil-pricetag-alt"></i>
            </Tooltip>
            {props.dueDate ? 
              <RenderDate due={props.dueDate} /> 
              : <Tooltip title="Date" placement="bottom" arrow><i className="uil uil-schedule"></i></Tooltip> }
            <Tooltip title="Priority" placement="bottom" arrow>
              <i className="uil uil-user"></i>
            </Tooltip>
          </div>
          <div className="task-name-wrapper">
            <div className="task-name-frame" onClick={() => demo(props.taskName)}>
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

function RenderPriority(props) {
  switch (props.priority) {
    case 0:
      return <i className="uil uil-circle"></i>;
    case 1: 
      return <i className="uil uil-circle"></i>;
    case 2: 
      return <i className="uil uil-circle low"></i>;
    case 3: 
      return <i className="uil uil-circle medium"></i>;
    case 4: 
      return <i className="uil uil-circle high"></i>;
    default:  
      return <i className="uil uil-circle"></i>
  }
}

function RenderDate(props) {
  var timestamp = Math.floor(props.due / 1000);
  var today = moment().format('L');
  var dateSaved = moment.unix(timestamp).format('MM/DD/YYYY')

  if(today === dateSaved) {
    return <p className="uil-schedule-text-today"> Today</p>
  }

  return <p className="uil-schedule-text"> {moment.unix(props.due / 1000).format('MMM DD')} </p>
}

export default List;