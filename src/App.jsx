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
import CurrentChatPage from "./Pages/CurrentChatPage";
import EventsPage from "./Pages/EventsPage";
import TasksPage from "./Pages/TasksPage";
import NotesPage from "./Pages/NotesPage";
import useLocalStorage from "./Hooks/useLocalStorage";
import Signup from "./Pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChatContext } from "./Context/ChatContext";
import { useState } from "react";
import SocketContextProvider from "./Context/SocketContext";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, _] = useLocalStorage("user");
  const [currentChat, setCurrentChat] = useState(null);

  const isLoggedIn = () => {
    if (user) {
      return user;
    }
    return false;
  };

  return (
    <SocketContextProvider>
      <ChatContext.Provider
        value={{
          currentChat,
          setCurrentChat,
        }}
      >
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

        <Router>
          <Navbar logged={isLoggedIn()} />
          <Routes>
            <Route
              index
              path="/"
              element={user?.email ? <Navigate to="/profile" /> : <Login />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="profile" element={<Profile />}>
              <Route path="" element={<CurrentChatPage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="tasks" element={<TasksPage />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </ChatContext.Provider>
    </SocketContextProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
