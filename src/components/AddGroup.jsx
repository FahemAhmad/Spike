import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import {
  createGroupChatEndpoint,
  searchFriendsEndpoint,
} from "../backend/apiCalls";
import * as Toastify from "./Toastify";
import MultiSelectSearchbar from "./MultiSelectSearchbar";

export default function AddGroup({ open, toggleOpen, callback }) {
  const [groupTitle, setGroupTitle] = React.useState("");
  const [userEmails, setUserEmails] = React.useState([]);

  async function createGroup() {
    await createGroupChatEndpoint({
      title: groupTitle,
      members: userEmails,
    }).then(
      (res) => {
        setGroupTitle("");
        setUserEmails([]);
        toggleOpen();
        Toastify.showSuccess(res.data.message);
        callback();
      },
      (err) => {
        setGroupTitle("");
        setUserEmails([]);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-container">
        <div className="modal-header">
          <p className="modal-header-heading">Create a group</p>
          <AiOutlineCloseCircle
            onClick={() => toggleOpen()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modal-children">
          <input
            type="text"
            value={groupTitle}
            placeholder="Enter group title"
            onChange={(e) => setGroupTitle(e.target.value)}
          />
          <MultiSelectSearchbar
            setSelectedValues={setUserEmails}
            placeholder={"Search Friends to add"}
            api={searchFriendsEndpoint}
            name="email"
            selectedValues={userEmails}
          />
          <button onClick={createGroup}>Create Group</button>
        </div>
      </div>
    </Modal>
  );
}
