import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [sharedWith, setSharedWith] = useState("");
  const [taskId, setTaskId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        // Handle error - access token not found in localStorage
        return;
      }

      // Set the Authorization header with the existing access token
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const response = await axios.post("http://localhost:4000/tasks", {
        title: title,
        notes: notes,
        sharedWith: sharedWith ? [sharedWith] : null,
      });
      setTaskId(response.data.taskId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <TextField
          label="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <br />
        <TextField
          label="Shared with (optional)"
          value={sharedWith}
          onChange={(event) => setSharedWith(event.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Create Task
        </Button>
      </form>
      {taskId && <p>New task created with ID: {taskId}</p>}
    </>
  );
};

export default CreateTasks;
