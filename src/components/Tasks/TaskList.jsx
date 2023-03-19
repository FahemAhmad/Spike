import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) {
          // Handle error - access token not found in localStorage
          return;
        }

        // Set the Authorization header with the existing access token
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const response = await axios.get("http://localhost:4000/tasks");
        console.log("Response data:", response.data);
        setTasks(response.data.taskItems);
      } catch (error) {
        console.error(`Error retrieving tasks: ${error}`);
      }
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = async (event, taskId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/tasks/${taskId}`,
        {
          completed: event.target.checked,
        }
      );
      const updatedTask = response.data.task;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(`Error updating task: ${error}`);
    }
  };

  return (
    <div>
      <Typography variant="h4">My Tasks</Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={!!task.completed} // Convert task.completed to a boolean
              onChange={(event) => handleCheckboxChange(event, task.id)}
            />
            <ListItemText
              primary={task.title}
              secondary={task.notes}
              style={task.completed ? { textDecoration: "line-through" } : {}}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
