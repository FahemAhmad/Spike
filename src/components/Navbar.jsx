import { Logout } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./componentStyles.scss";

function Navbar() {
  const [loading, setLoading] = useState();

  const handleLogout = () => {
    setLoading(true);
    // clear the access token from local storage or from state if you're using context

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiry_date");
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="navbar-container">
      <div className="left-section">
        <div className="logo">
          <h2 to="/">Spikey</h2>
        </div>
      </div>
      <div className="middle-section">
        <ul>
          <Link to="/profile/">Emails</Link>
          <Link to="/profile/tasks">
            <li>Tasks</li>
          </Link>
          <Link to="/profile/events">
            <li>Events</li>
          </Link>
          <Link to="/profile/meet">
            <li>Meet</li>
          </Link>
        </ul>
      </div>
      <div className="right-section">
        <Button
          variant="outlined"
          onClick={handleLogout}
          startIcon={
            loading ? <CircularProgress size={20} /> : <Logout size={20} />
          }
        >
          {loading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
