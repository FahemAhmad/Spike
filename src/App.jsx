import { createRoot } from "react-dom/client";
import "./styles.scss";
// eslint-disable-next-line import/namespace
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
