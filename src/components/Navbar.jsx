import React from "react";

import { IoMdNotifications } from "react-icons/io";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ logged }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1>SPIKE</h1>
      </Link>
      {logged ? (
        <>
          <div className="features">
            <ul>
              <li>
                <Link to="/profile/">Chats</Link>
              </li>
              <li>
                <Link to="/profile/notes">Notes</Link>
              </li>

              <li>
                <Link to="/profile/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/profile/events">Events</Link>
              </li>
            </ul>
          </div>
          <div className="profile">
            {/* <IoMdNotifications size={"2em"} /> */}
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img src={logged?.picture} alt="ProfilePicture" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/">
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            </div>
            <h4>{logged.name}</h4>
          </div>
        </>
      ) : (
        <>
          <div style={{ flex: 1 }} />
          <Link to="/signup">
            <button className="primary-btn">Sign Up</button>
          </Link>
          <Link to="/">
            <button className="secondary-btn">Login</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
