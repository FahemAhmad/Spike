import React from "react";
import ProfilePic from "../assets/profile.png";

import { IoMdNotifications } from "react-icons/io";
import { Button, Menu, MenuItem } from "@mui/material";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <h1>SPIKE</h1>
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
            <img src={ProfilePic} alt="ProfilePicture" />
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
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <h4>Lorem Ipsum</h4>
      </div>
    </div>
  );
}

export default Navbar;
