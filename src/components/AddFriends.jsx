import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import { addFriendsEndpoint, searchFriendsEndpoint } from "../backend/apiCalls";
import * as Toastify from "./Toastify";
import SearchBar from "./SearchBar";

export default function AddFriends({ open, toggleOpen, callback }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  async function addFriend() {
    await addFriendsEndpoint({ friendEmail: searchQuery }).then(
      (res) => {
        setSearchQuery("");
        toggleOpen();
        Toastify.showSuccess(res.data.message);
        callback();
      },
      (err) => {
        setSearchQuery("");
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
          <p className="modal-header-heading">Add a friend</p>
          <AiOutlineCloseCircle
            onClick={() => toggleOpen()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modal-children">
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            placeholder={"Search"}
            api={searchFriendsEndpoint}
            name="email"
          />
          <button onClick={addFriend}>Add Friend</button>
        </div>
      </div>
    </Modal>
  );
}
