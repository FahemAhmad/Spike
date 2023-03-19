import React from "react";
import CreateTasks from "../Components/Tasks/CreateTasks";
import TaskList from "../Components/Tasks/TaskList";

function TasksPage() {
  return (
    <>
      <CreateTasks />
      <TaskList />
    </>
  );
}

export default TasksPage;
