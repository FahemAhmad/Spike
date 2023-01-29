import { createRoot } from "react-dom/client";
import "./styles.scss";
// eslint-disable-next-line import/namespace
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CurrentChatPage from "./Pages/CurrentChatPage";
import EventsPage from "./Pages/EventsPage";
import TasksPage from "./Pages/TasksPage";
import NotesPage from "./Pages/NotesPage";
import useLocalStorage from "./Hooks/useLocalStorage";
import Signup from "./Pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChatContext } from "./Context/ChatContext";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import IncomingCallCard from "./components/IncomingCallCard";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, _] = useLocalStorage("user");
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [receivingCall, setReceivingCall] = useState(true);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callData, setCallData] = useState({
    caller: "",
    callerSignal: "",
  });

  const socket = useRef();

  const isLoggedIn = () => {
    if (user) {
      return user;
    }
    return false;
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    // receive a call
    socket.current.on("incomingCall", (data) => {
      setReceivingCall(true);
      setCallData({
        caller: data.from,
        callerSignal: data.signalData,
      });
    });

    //Call accepted or rejected
    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setCallData({
        ...callData,
        callerSignal: signal,
      });
    });
  }, []);

  useEffect(() => {
    if (user && user?.id) {
      socket?.current.emit("addUser", user.id);
      socket?.current.on("getMessage", (data) => {
        console.log("mesage", data);
        setNewMessage(data);
      });
    }
  }, [user]);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}

      {receivingCall && <IncomingCallCard />}
      <Router>
        <Navbar logged={isLoggedIn()} />
        <Routes>
          <Route
            index
            path="/"
            element={user?.email ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="ui" element={<Card />} />
          <Route path="profile" element={<Profile />}>
            <Route
              path=""
              element={
                <CurrentChatPage
                  socket={socket}
                  newMessage={newMessage}
                  receivingCall={receivingCall}
                  callAccepted={callAccepted}
                  setCallAccepted={setCallAccepted}
                  callerSignal={callData.callerSignal}
                />
              }
            />
            <Route path="notes" element={<NotesPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </ChatContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
