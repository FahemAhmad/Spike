import React, { useContext, useEffect, useState } from "react";
import {
  getMyNotesEndpoint,
  getSharedNotesEndpoint,
} from "../backend/apiCalls";
import Card from "../components/Card";
import NotesModal from "../components/NotesModal";
import ButtonPair from "../components/ButtonPair";
import { ChatContext } from "../Context/ChatContext";

function NotesPage() {
  const { currentChat } = useContext(ChatContext);
  const [isPersonal, setIsPersonal] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [actionType, setActionType] = useState("Add Notes");
  const [actionNumber, setActionNumber] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  //1 for add
  //2 for view
  //3 for edit
  //4 for delete

  async function getPersonalNotes() {
    setNotes([]);
    await getMyNotesEndpoint().then((res) => {
      setNotes(res.data);
    });
  }

  async function getSharedNotes() {
    setNotes([]);
    await getSharedNotesEndpoint(currentChat.email).then((res) => {
      setNotes(res.data);
    });
  }

  useEffect(() => {
    if (actionNumber === 1) setActionType("Add Notes");
    else if (actionNumber === 2) setActionType("View Notes");
    else if (actionNumber === 3) setActionType("Edit Notes");
    else if (actionNumber === 4) setActionType("Delete Notes");

    if (actionNumber) setNotesOpen(true);
  }, [actionNumber]);

  useEffect(() => {
    if (isPersonal) getPersonalNotes();
    else getSharedNotes();
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
              {notes?.map((val, index) => (
                <div
                  key={index}
                  style={{
                    flex: "1 0 50%",
                  }}
                >

                  <Card
                    containerClick={setSelected}
                    index={index}
                    title={val.title}
                    description={val.description}
                    sharedWith={val.sharedWith}
                    isPersonal={val.noteType === "personal"}
                    edit={true}
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
                setNotesOpen(true);
                setActionNumber(1);
              }}
            >
              Add Note
            </button>
          </div>
          <NotesModal
            open={notesOpen}
            toggleOpen={() => {
              setActionNumber(undefined);
              setSelected(undefined);
              setNotesOpen(false);
            }}
            callback={() => void 0}
            type={actionType}
            gotData={selected !== undefined ? notes[selected] : null}
            readOnly={actionType === "View Notes"}
            setNotes={setNotes}
            notes={notes}
            isPersonal={isPersonal}
          />
        </div>
      )}
    </>
  );
}

export default NotesPage;
