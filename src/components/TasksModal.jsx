import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import {
  addTaskEndpoint,
  searchFriendsEndpoint,
  updateTaskEndpoint,
  deleteTaskEndpoint,
} from "../backend/apiCalls";

import * as Toastify from "./Toastify";
import MultiSelectSearchbar from "./MultiSelectSearchbar";

export default function TasksModal({
  open,
  toggleOpen,
  type = "Add Tasks",
  readOnly = false,
  gotData,
  Tasks,
  setTasks,
  isPersonal,
}) {
  const [data, setData] = React.useState([]);
  const [details, setDetails] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    if (gotData) {
      setDetails({ title: gotData.title, description: gotData.description });
      setData(gotData.shared);
    }
  }, [gotData]);

  async function addTasks() {
    const body = {
      title: details.title,
      description: details.description,
      shared: data,
    };
    await addTaskEndpoint(body).then(
      (res) => {
        let updatedTasks = [...Tasks, res.data.data];
        setTasks(updatedTasks);
        setDetails({
          title: "",
          description: "",
        });
        toggleOpen();
        Toastify.showSuccess("Task Added");
      },
      (err) => {
        setData([]);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function updateTasks() {
    let id = gotData._id;
    const body = {
      title: details.title,
      description: details.description,
      shared: gotData.sharedWith,
    };
    await updateTaskEndpoint(id, body).then(
      (res) => {
        let updatedTasks = [...Tasks];
        let index = updatedTasks.findIndex((Task) => Task._id === id);
        updatedTasks[index] = { ...updatedTasks[index], ...body };
        setTasks(updatedTasks);
        setDetails({
          title: "",
          description: "",
        });
        toggleOpen();

        Toastify.showSuccess("Tasks Updated");
      },
      (err) => {
        console.log("err", err);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function deleteTasks() {
    let id = gotData._id;
    await deleteTaskEndpoint(id).then(
      (res) => {
        let updatedTasks = Tasks.filter((Task) => Task._id !== id);
        setTasks(updatedTasks);
        toggleOpen();
        Toastify.showSuccess("Task Deleted");
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
          {type === "Add Tasks" && !isPersonal && (
            <MultiSelectSearchbar
              setSelectedValues={setData}
              placeholder={"Search Friends to share with"}
              api={searchFriendsEndpoint}
              name="email"
              selectedValues={data}
            />
          )}
          {type !== "View Tasks" && (
            <button
              onClick={() => {
                if (type === "Add Tasks") addTasks();
                else if (type === "Delete Tasks") deleteTasks();
                else if (type === "Edit Tasks") updateTasks();
              }}
              style={type === "Delete Tasks" ? { backgroundColor: "red" } : {}}
            >
              {type}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
