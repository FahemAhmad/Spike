import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import {
  addNoteEndpoint,
  searchFriendsEndpoint,
  updateNoteEndpoint,
  deleteNoteEndpoint,
} from "../backend/apiCalls";

import * as Toastify from "./Toastify";
import MultiSelectSearchbar from "./MultiSelectSearchbar";

export default function NotesModal({
  open,
  toggleOpen,
  type = "Add Notes",
  readOnly = false,
  gotData,
  notes,
  setNotes,
  isPersonal,
}) {
  let noteId = "";
  const [data, setData] = React.useState([]);
  const [details, setDetails] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    if (gotData) {
      noteId = gotData._id;
      setDetails({ title: gotData.title, description: gotData.description });
      setData(gotData.shared);
    }
  }, [gotData]);

  async function addNotes() {
    const body = {
      title: details.title,
      description: details.description,
      shared: data,
    };
    await addNoteEndpoint(body).then(
      (res) => {
        let updatedNotes = [...notes, res.data.data];
        setNotes(updatedNotes);
        setDetails({
          title: "",
          description: "",
        });
        toggleOpen();
        Toastify.showSuccess("Note Added");
      },
      (err) => {
        setData([]);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function updateNotes() {
    let id = gotData._id;
    const body = {
      title: details.title,
      description: details.description,
      shared: gotData.sharedWith,
    };
    await updateNoteEndpoint(id, body).then(
      (res) => {
        let updatedNotes = [...notes];
        let index = updatedNotes.findIndex((note) => note._id === id);
        updatedNotes[index] = { ...updatedNotes[index], ...body };
        setNotes(updatedNotes);
        setDetails({
          title: "",
          description: "",
        });
        toggleOpen();

        Toastify.showSuccess("Notes Updated");
      },
      (err) => {
        console.log("err", err);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function deleteNotes() {
    let id = gotData._id;
    await deleteNoteEndpoint(id).then(
      (res) => {
        let updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        toggleOpen();
        Toastify.showSuccess("Note Deleted");
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
          <p className="modal-header-heading">{type}</p>
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
            disabled={readOnly}
          />
          <textarea
            placeholder="Description"
            rows={5}
            value={details.description}
            onChange={(e) =>
              setDetails({ ...details, description: e.target.value })
            }
            disabled={readOnly}
          />
          {type === "Add Notes" && !isPersonal && (
            <MultiSelectSearchbar
              setSelectedValues={setData}
              placeholder={"Search Friends to share with"}
              api={searchFriendsEndpoint}
              name="email"
              selectedValues={data}
            />
          )}
          {type !== "View Notes" && (
            <button
              onClick={() => {
                if (type === "Add Notes") addNotes();
                else if (type === "Delete Notes") deleteNotes();
                else if (type === "Edit Notes") updateNotes();
              }}
              style={type === "Delete Notes" ? { backgroundColor: "red" } : {}}
            >
              {type}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
