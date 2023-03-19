import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";

function EmailCard({ emailAddress, messageBody, setCurrentEmail }) {
  return (
    <List
      sx={{
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      onClick={() => setCurrentEmail(emailAddress)}
      style={{ cursor: "pointer", marginLeft: -5 }}
    >
      <ListItem style={{ color: "black" }}>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText
          primary={emailAddress.slice(0, 50)}
          secondary={messageBody.slice(0, 50)}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default EmailCard;
