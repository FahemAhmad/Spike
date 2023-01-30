import React, { useContext, useEffect, useState } from "react";
import { getMyNotesEndpoint } from "../backend/apiCalls";
import Card from "../components/Card";
import NotesModal from "../components/NotesModal";
import ButtonPair from "../components/ButtonPair";
import { ChatContext } from "../Context/ChatContext";

function NotesPage() {
  const { currentChat } = useContext(ChatContext);
  const [isPersonal, setIsPersonal] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  async function getPersonalNotes() {
    await getMyNotesEndpoint().then((res) => {
      setNotes(res.data);
    });
  }

  useEffect(() => {
    if (isPersonal) getPersonalNotes();
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
                    title={val.title}
                    description={val.description}
                    sharedWith={val.sharedWith}
                    edit={true}
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
              onClick={() => setNotesOpen(true)}
            >
              Add Note
            </button>
          </div>
          <NotesModal
            open={notesOpen}
            toggleOpen={() => setNotesOpen(false)}
            callback={() => void 0}
            isDelete={isDelete}
          />
        </div>
      )}
    </>
  );
}

export default NotesPage;
