import React from "react";
import { Outlet } from "react-router-dom";
import FriendsSidePanelComponent from "../components/FriendsSidePanelComponent";

function Profile() {
  return (
    <section className="chat">
      <div className="chat-section">
        <FriendsSidePanelComponent />
        <div className="user-current-chat">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Profile;
