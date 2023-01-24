import React from "react";
import AddOptions from "../components/AddOptions";
import { BiSearchAlt2 } from "react-icons/bi";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChatComponent from "../components/ChatComponent";

function FriendsSidePanelComponent() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="chat-inbox">
      <div className="header">
        <div className="options">
          <AddOptions />
        </div>
        <div className="search">
          <i className="search-icon">
            <BiSearchAlt2 />
          </i>
          <input type="text" className="search-field" placeholder="Search" />
        </div>
      </div>
      <div className="inbox-tabs">
        <TabContext value={value}>
          <Box
            sx={{
              border: "1px solid black",
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: "divider",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="Friends & Groups Tab"
              TabIndicatorProps={{
                sx: {
                  top: 0,
                  bottom: "auto",
                  border: "2px solid #ededed",
                  padding: 0,
                  margin: 0,
                },
              }}
              sx={{
                "& button:focus": {
                  backgroundColor: "white",
                  border: "none",
                },
                "& button": {
                  backgroundColor: "#ededed",
                  border: "none",
                },
                "& button.Mui-selected": {
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                },
              }}
            >
              <Tab style={{ width: "50%" }} label="Friends" value="1" />
              <Tab style={{ width: "50%" }} label="Groups" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="list-of-chats">
              {[...Array(10)].map((value, index) => (
                <ChatComponent
                  key={index}
                  img={"hello"}
                  name="Faheem Ahmad"
                  messageCount="2"
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="list-of-chats"></div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default FriendsSidePanelComponent;
