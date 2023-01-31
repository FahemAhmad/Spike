import React, { useContext, useEffect, useState } from "react";
import {
  getMyEventsEndpoint,
  getSharedEventsEndpoint,
} from "../backend/apiCalls";
import Card from "../components/Card";
import EventsModal from "../components/EventsModal";
import ButtonPair from "../components/ButtonPair";
import { ChatContext } from "../Context/ChatContext";

function EventsPage() {
  const { currentChat } = useContext(ChatContext);
  const [isPersonal, setIsPersonal] = useState(true);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [actionType, setActionType] = useState("Add Events");
  const [actionNumber, setActionNumber] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  //1 for add
  //2 for view
  //3 for edit
  //4 for delete

  async function getPersonalEvents() {
    setEvents([]);
    await getMyEventsEndpoint().then((res) => {
      setEvents(res.data);
    });
  }

  async function getSharedEvents() {
    setEvents([]);
    await getSharedEventsEndpoint(currentChat.email).then((res) => {
      setEvents(res.data);
    });
  }

  useEffect(() => {
    if (actionNumber === 1) setActionType("Add Events");
    else if (actionNumber === 2) setActionType("View Events");
    else if (actionNumber === 3) setActionType("Edit Events");
    else if (actionNumber === 4) setActionType("Delete Events");

    if (actionNumber) setEventsOpen(true);
  }, [actionNumber]);

  useEffect(() => {
    if (isPersonal) getPersonalEvents();
    else getSharedEvents();
  }, [isPersonal]);

  return (
    <>
      {currentChat && (
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <ButtonPair
            activeButton={isPersonal}
            setActiveButton={setIsPersonal}
          />
          <div className="parent-scroll">
            <div className="scroll-container">
              {events?.map((val, index) => (
                <div
                  key={index}
                  style={{
                    flex: "1 0 50%",
                  }}
                >
                  {console.log("event", val)}
                  <Card
                    containerClick={setSelected}
                    index={index}
                    title={val.title}
                    description={val.description}
                    sharedWith={val.sharedWith}
                    isPersonal={val.eventType === "personal"}
                    eventTime={val.eventTime}
                    setActionNumber={setActionNumber}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              height: 95,
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              padding: 20,
            }}
          >
            <button
              className="primary-btn primary-bg"
              style={{ color: "white" }}
              onClick={() => {
                setEventsOpen(true);
                setActionNumber(1);
              }}
            >
              Add Event
            </button>
          </div>
          <EventsModal
            open={eventsOpen}
            toggleOpen={() => {
              setActionNumber(undefined);
              setSelected(undefined);
              setEventsOpen(false);
            }}
            callback={() => void 0}
            type={actionType}
            gotData={selected !== undefined ? events[selected] : null}
            readOnly={actionType === "View Events"}
            setEvents={setEvents}
            events={events}
            isPersonal={isPersonal}
          />
        </div>
      )}
    </>
  );
}

export default EventsPage;
