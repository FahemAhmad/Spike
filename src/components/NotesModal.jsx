import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import { addNoteEndpoint, searchFriendsEndpoint } from "../backend/apiCalls";
import * as Toastify from "./Toastify";
import MultiSelectSearchbar from "./MultiSelectSearchbar";

export default function NotesModal({
  open,
  toggleOpen,
  callback,
  isDelete = false,
}) {
  const [data, setData] = React.useState([]);
  const [details, setDetails] = React.useState({
    title: "",
    description: "",
  });

  async function addNotes() {
    const body = {
      title: details.title,
      description: details.description,
      shared: data,
    };
    await addNoteEndpoint(body).then(
      (res) => {
        setData([]);
        setDetails({
          title: "",
          description: "",
        });
        toggleOpen();
        callback();
        Toastify.showSuccess(res.data.message);
      },
      (err) => {
        console.log("err", err);
        setData([]);
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
          <p className="modal-header-heading">Add Notes</p>
          <AiOutlineCloseCircle
            onClick={() => toggleOpen()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modal-children">
          <input
            placeholder="Title"
            value={details.title}
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
            type="text"
          />
          <textarea
            placeholder="Description"
            rows={5}
            value={details.description}
            onChange={(e) =>
              setDetails({ ...details, description: e.target.value })
            }
          />
          <MultiSelectSearchbar
            setSelectedValues={setData}
            placeholder={"Search Friends to share with"}
            api={searchFriendsEndpoint}
            name="email"
            selectedValues={data}
          />
          <button onClick={() => addNotes()}>
            {isDelete ? "Delete Notes" : "Add Notes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
