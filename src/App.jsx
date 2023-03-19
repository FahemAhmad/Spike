/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { createRoot } from "react-dom/client";
import React from "react";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Callback from "./Pages/Callback";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import NotesPage from "./Pages/NotesPage";
import TasksPage from "./Pages/TasksPage";
import EventPage from "./Pages/EventPage";
import MeetPage from "./Pages/MeetPage";
import "./styles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Define a function that checks if the user is authenticated (has an access token)
  function isAuthenticated() {
    const accessToken = localStorage.getItem("access_token");
    let response = accessToken !== null;

    return response;
  }

  // Create a Higher-Order Component (HOC) that protects a route

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/google/callback" element={<Callback />} />
          <Route
            index
            path="/"
            element={isAuthenticated() ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="" element={<HomePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="events" element={<EventPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="meet" element={<MeetPage />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
