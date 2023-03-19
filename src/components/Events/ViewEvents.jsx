import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

function ViewEvents() {
  const containerStyle = {
    marginTop: "4rem",
  };

  const paperStyle = {
    padding: "2rem",
    marginBottom: "2rem",
  };

  const titleStyle = {
    color: red[500],
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      // Handle error - access token not found in localStorage
      return;
    }

    // Set the Authorization header with the existing access token
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    axios.get("http://localhost:4000/events").then((response) => {
      console.log("response heck", response);
      setEvents(response.data);
    });
  }, []);

  return (
    <Container style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" style={titleStyle}>
            My Calendar Events
          </Typography>
        </Grid>
        {events.map((event) => (
          <Grid item xs={12} key={event.id}>
            <Paper style={paperStyle}>
              <Typography variant="h6">{event.summary}</Typography>
              <Typography>
                Date: {format(new Date(event.start), "MMMM dd, yyyy")}
              </Typography>
              <Typography>
                Time:{" "}
                {`${format(new Date(event.start), "hh:mm a")} - ${format(
                  new Date(event.end),
                  "hh:mm a"
                )}`}
              </Typography>
              <Typography>Location: {event.location}</Typography>
              <Typography>Description: {event.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewEvents;
