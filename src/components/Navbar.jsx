import React from "react";
import ProfilePic from "../assets/profile.png";

import { IoMdNotifications } from "react-icons/io";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ logged }) {
  console.log("logged", logged);
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
    window.location.reload();
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
              <li>Chats</li>
              <li>Notes</li>

              <li>Tasks</li>
              <li>Events</li>
            </ul>
          </div>
          <div className="profile">
            <IoMdNotifications size={"2em"} />
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            <h4>
              {logged.firstName} {logged.lastName}
            </h4>
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
