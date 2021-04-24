import React, { FC } from "react";
import { TaskType } from "../audits";
import TaskDetail from "./TaskDetail";
import "./Task.css";

const Task = (props: TaskType) => {
  return (
    <div className="task">
      <h3 className="task-title">
        {props.title}
        {props.failedSummary && (
          <p className="task-failed-summary">{props.failedSummary}</p>
        )}
      </h3>
      <p className="task-description">{props.meta.description}</p>
      <TaskDetail headings={props.headings} details={props.details} />
    </div>
  );
};

export default Task;
