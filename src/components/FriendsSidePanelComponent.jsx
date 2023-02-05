import React, { useEffect, useState } from "react";
import AddOptions from "../components/AddOptions";
import { BiSearchAlt2 } from "react-icons/bi";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChatComponent from "../components/ChatComponent";
import * as Toastify from "../components/Toastify.jsx";
import ProfilePicture from "../assets/profile.png";
import {
  getUserChatGroupsEndpoint,
  getUserFriendsEndpoint,
} from "../backend/apiCalls";

function FriendsSidePanelComponent() {
  const [userFriends, setUserFriends] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserFriends = async () => {
    await getUserFriendsEndpoint().then(
      (res) => {
        setUserFriends(res.data.data);
      },
      (err) => Toastify.showFailure(err.response.data.message)
    );
  };

  const getUserGroups = async () => {
    await getUserChatGroupsEndpoint().then(
      (res) => {
        setUserGroups(res.data.chatGroups);
      },
      (err) => {
        Toastify.showFailure(err.response.data.message);
      }
    );
  };

  useEffect(() => {
    getUserFriends();
    getUserGroups();
  }, []);

  return (
    <>
      <div className="chat-inbox">
        <div className="header">
          <div className="options">
            <AddOptions callback={getUserFriends} callback2={getUserGroups} />
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
                {userFriends?.length === 0 ? (
                  <div className="not-found"> No Friend Found</div>
                ) : (
                  userFriends.map((value) => (
                    <ChatComponent
                      value={value}
                      key={value._id}
                      img={value.profilePicture}
                      name={value.name}
                      messageCount="0"
                    />
                  ))
                )}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="list-of-chats">
                {userGroups?.length === 0 ? (
                  <div className="not-found"> No Group Added</div>
                ) : (
                  userGroups?.map((value) => (
                    <ChatComponent
                      value={value}
                      key={value._id}
                      img={ProfilePicture}
                      name={value.title}
                      messageCount="0"
                    />
                  ))
                )}
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
}

export default FriendsSidePanelComponent;
