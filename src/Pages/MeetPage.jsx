import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

function MeetPage() {
  const [meetLink, setMeetLink] = useState("");

  const handleCreateMeet = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      // Handle error - access token not found in localStorage
      return;
    }

    // Set the Authorization header with the existing access token
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    const response = await axios.post("http://localhost:4000/meet");
    console.log("res", response);
    setMeetLink(response.data.meetLink);

    // Open the Google Meet link in a new tab
    window.open(meetLink, "_blank");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleCreateMeet}>
        Create Meeting
      </Button>
    </div>
  );
}

export default MeetPage;
