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

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, _] = useLocalStorage("user");

  const isLoggedIn = () => {
    if (user) {
      return user;
    }
    return false;
  };

  return (
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
          <Route path="" element={<CurrentChatPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
