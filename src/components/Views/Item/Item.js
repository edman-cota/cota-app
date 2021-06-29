import React from "react";
import moment from "moment";
import "firebase/database";
import { motion } from "framer-motion";
import { usePositionReorder } from "./usePositionReorder";
import { useMeasurePosition } from "./useMeasurePosition";
import { FormattedMessage } from "react-intl";

import Priority from "../Priority/Priority";
import RenderStatus from "./RenderStatus";
import Task from "../Tree/Task";

// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";

const Item = ({ name, updateOrder, updatePosition, ind }) => {
  const [isdragged, setIsDragged] = React.useState(false);

  const itemRef = useMeasurePosition((pos) => updatePosition(ind, pos));

  return (
    <li className="tree-item">
      <motion.div
        className="tree-row"
        style={{
          zIndex: isdragged ? 2 : 1,
          height: name.length * 10,
        }}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={1}
        layout
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          scale: isdragged ? 1.05 : 1,
        }}
        onViewportBoxUpdate={(_, delta) => {
          isdragged && updateOrder(ind, delta.y.translate);
        }}
        drag="y"
      >
        <div className="tree-row-front">
          <RenderStatus taskId={1} completed={0} />
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
            {name ? (
              <RenderDate due={name} />
            ) : (
              <Tooltip
                title={<FormattedMessage id="date"></FormattedMessage>}
                placement="bottom"
                arrow
              >
                <i className="uil uil-schedule"></i>
              </Tooltip>
            )}
            <Priority taskId={1} priority={0} />
          </div>
          <div className="task-name-wrapper">
            <div className="task-name-frame">
              <div className="task-name-frame-border">
                <span className="task-name">{name}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};

// const Item = (props) => {
//   console.log("hoasdifasdf");
//   return (
//     <li className="tree-item">
//       <div className="tree-row">
//         <div className="tree-row-front">
//           <RenderStatus taskId={props.taskId} completed={props.completed} />
//         </div>
//         <div className="tree-row-content">
//           <div className="task-menu-bar">
//             <Tooltip
//               title={<FormattedMessage id="tag"></FormattedMessage>}
//               placement="bottom"
//               arrow
//             >
//               <i className="uil uil-pricetag-alt"></i>
//             </Tooltip>
//             {props.dueDate ? (
//               <RenderDate due={props.dueDate} />
//             ) : (
//               <Tooltip
//                 title={<FormattedMessage id="date"></FormattedMessage>}
//                 placement="bottom"
//                 arrow
//               >
//                 <i className="uil uil-schedule"></i>
//               </Tooltip>
//             )}

//             <Priority taskId={props.taskId} priority={props.priority} />
//           </div>
//           <div className="task-name-wrapper">
//             <div className="task-name-frame">
//               <div className="task-name-frame-border">
//                 <span className="task-name">{props.taskName}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// };

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

export default Item;
