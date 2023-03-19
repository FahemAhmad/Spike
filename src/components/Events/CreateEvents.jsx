import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

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
      const response = await axios.post("http://localhost:4000/events", {
        summary: eventData.title,
        description: eventData.description,
        startDateTime: new Date(eventData.startDateTime).toISOString(),
        endDateTime: new Date(eventData.endDateTime).toISOString(),
      });
      console.log(response);
      // Show success message or redirect to a success page
    } catch (error) {
      console.error(`Error creating event: ${error}`);
      // Show error message or redirect to an error page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={eventData.title}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={eventData.description}
        onChange={handleChange}
        multiline
        fullWidth
        margin="normal"
      />
      <TextField
        name="startDateTime"
        label="Start date/time"
        type="datetime-local"
        value={eventData.startDateTime}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="endDateTime"
        label="End date/time"
        type="datetime-local"
        value={eventData.endDateTime}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Event
      </Button>
    </form>
  );
};

export default CreateEventForm;
