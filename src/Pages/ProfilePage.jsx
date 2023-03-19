import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <Outlet />
      </div>
    </>
  );
}

export default ProfilePage;
