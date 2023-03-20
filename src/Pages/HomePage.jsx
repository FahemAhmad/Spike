import React, { useEffect, useState } from "react";
import EmailCard from "../Components/EmailCard";
import EmailSendingComponent from "../Components/EmailSending";
import EmailViewComponent from "../Components/EmailViewComponent";
import apiCalls from "../backend/apiCalls";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { GrAttachment } from "react-icons/gr";
import axios from "axios";

function HomePage() {
  const [value, setValue] = React.useState("1");
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to attach the access token to the headers of an Axios request
  const fetchUserData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        // Handle error - access token not found in localStorage
        return;
      }

      const response = await apiCalls.getAllEmails();
      const data = response.data;

      // Use the user's data
      console.log(data);
      const groupedEmails = data.reduce((acc, email) => {
        const sender = email.from;
        if (!acc[sender]) {
          acc[sender] = [email];
        } else {
          acc[sender].push(email);
        }
        return acc;
      }, {});

      console.log("email", groupedEmails);
      setEmails(groupedEmails);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const [file, setFile] = useState();
  const [newMessageText, setNewMessageText] = useState("");

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      console.log("Submitted");
    }
  };

  function handleFileSelect(e) {
    setFile(e.target.files[0]);
  }

  async function sendEmail(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("to", currentEmail);
      formData.append("body", newMessageText);

      formData.append("subject", "Mail through spike");

      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        // Handle error - access token not found in localStorage
        return;
      }

      // Set the Authorization header with the existing access token
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

      const res = await axios.post(
        "http://localhost:4000/emails/send",
        formData
      );
      if (res.status === 200) {
        window.location.reload();
      }
      setNewMessageText("");
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEmailClick = (email) => {
    setCurrentEmail(email);
  };

  return (
    <>
      <div className="left-container">
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
              <Tab style={{ width: "100%" }} label="Emails" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div>
              {emails &&
                Object.keys(emails).map((email) =>
                  emails[email].map((emailObj, index) => (
                    <EmailCard
                      key={email + index}
                      emailAddress={email}
                      messageBody={emailObj.subject}
                      setCurrentEmail={handleEmailClick}
                    />
                  ))
                )}
            </div>
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </div>
      <div className="right-container">
        <div className="email-view">
          {Object.keys(currentEmail).length !== 0 && (
            <EmailViewComponent emails={emails[currentEmail]} />
          )}
        </div>
        <div className="email-reply">
          <div className="send-message">
            <input
              type={"text"}
              placeholder="Type a Message"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={(e) => sendEmail(e)}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
