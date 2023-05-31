import React from "react";
import { CgClose, CgInfo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import "./GlobalStyle.css";

const Task = ({ task, handleTaskClick, handleTaskDeletion }) => {
  const navigate = useNavigate();

  const handleTaskDetailsClick = () => {
    navigate(`/${task.title}`);
  };

  const taskContainerClass = task.completed
    ? "task-container completed"
    : "task-container";

  return (
    <div className={taskContainerClass}>
      <div className="task-title" onClick={() => handleTaskClick(task.id)}>
        {task.title}
      </div>

      <div className="buttons-container">
        <button
          className="see-task-details-button"
          onClick={handleTaskDetailsClick}
        >
          <CgInfo />
        </button>

        <button
          className="remove-task-button"
          onClick={() => handleTaskDeletion(task.id)}
        >
          <CgClose />
        </button>
      </div>
    </div>
  );
};

export default Task;
