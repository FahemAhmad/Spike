import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";
import {
  addEventEndpoint,
  searchFriendsEndpoint,
  updateEventEndpoint,
  deleteEventEndpoint,
} from "../backend/apiCalls";

import * as Toastify from "./Toastify";
import MultiSelectSearchbar from "./MultiSelectSearchbar";
import CalenderComponent from "./CalenderComponent";
import dayjs from "dayjs";

export default function EventsModal({
  open,
  toggleOpen,
  type = "Add Events",
  readOnly = false,
  gotData,
  events,
  setEvents,
  isPersonal,
}) {
  const [data, setData] = React.useState([]);
  const [eventTime, setEventTime] = React.useState(dayjs(Date.now()));
  const [details, setDetails] = React.useState({
    title: "",
    description: "",
    eventTime: "",
  });

  React.useEffect(() => {
    if (gotData) {
      setDetails({ title: gotData.title, description: gotData.description });
      setData(gotData.shared);
    }
  }, [gotData]);

  async function addEvents() {
    const body = {
      title: details.title,
      description: details.description,
      eventTime: eventTime,
      shared: data,
    };
    await addEventEndpoint(body).then(
      (res) => {
        let updatedEvents = [...events, res.data.data];
        setEvents(updatedEvents);
        setDetails({
          title: "",
          description: "",
          eventTime: "",
        });
        setEventTime(dayjs(Date.now()));
        toggleOpen();
        Toastify.showSuccess("Event Added");
      },
      (err) => {
        setData([]);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function updateEvents() {
    let id = gotData._id;
    const body = {
      title: details.title,
      description: details.description,
      shared: gotData.sharedWith,
      eventTime: details.eventTime,
    };
    await updateEventEndpoint(id, body).then(
      (res) => {
        let updatedEvents = [...events];
        let index = updatedEvents.findIndex((event) => event._id === id);
        updatedEvents[index] = { ...updatedEvents[index], ...body };
        setEvents(updatedEvents);
        setDetails({
          title: "",
          description: "",
          eventTime: "",
        });
        toggleOpen();

        Toastify.showSuccess("Events Updated");
      },
      (err) => {
        console.log("err", err);
        Toastify.showFailure(err.response?.data?.message);
      }
    );
  }

  async function deleteEvents() {
    let id = gotData._id;
    await deleteEventEndpoint(id).then(
      (res) => {
        let updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
        toggleOpen();
        Toastify.showSuccess("Event Deleted");
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
          <CalenderComponent
            eventTime={eventTime}
            setEventTime={setEventTime}
            readOnly={readOnly}
          />
          {type === "Add Events" && !isPersonal && (
            <MultiSelectSearchbar
              setSelectedValues={setData}
              placeholder={"Search Friends to share with"}
              api={searchFriendsEndpoint}
              name="email"
              selectedValues={data}
            />
          )}
          {type !== "View Events" && (
            <button
              onClick={() => {
                if (type === "Add Events") addEvents();
                else if (type === "Delete Events") deleteEvents();
                else if (type === "Edit Events") updateEvents();
              }}
              style={type === "Delete Events" ? { backgroundColor: "red" } : {}}
            >
              {type}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
