import React, { useContext, useEffect, useState } from "react";
import {
  getMyTasksEndpoint,
  getSharedTasksEndpoint,
} from "../backend/apiCalls";
import Card from "../components/Card";
import TasksModal from "../components/TasksModal";
import ButtonPair from "../components/ButtonPair";
import { ChatContext } from "../Context/ChatContext";

function TasksPage() {
  const { currentChat } = useContext(ChatContext);
  const [isPersonal, setIsPersonal] = useState(true);
  const [TasksOpen, setTasksOpen] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const [actionType, setActionType] = useState("Add Tasks");
  const [actionNumber, setActionNumber] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  //1 for add
  //2 for view
  //3 for edit
  //4 for delete

  async function getPersonalTasks() {
    setTasks([]);
    await getMyTasksEndpoint().then((res) => {
      setTasks(res.data);
    });
  }

  async function getSharedTasks() {
    setTasks([]);
    await getSharedTasksEndpoint(currentChat.email).then((res) => {
      console.log("chcek", res);
      setTasks(res.data);
    });
  }

  useEffect(() => {
    if (actionNumber === 1) setActionType("Add Tasks");
    else if (actionNumber === 2) setActionType("View Tasks");
    else if (actionNumber === 3) setActionType("Edit Tasks");
    else if (actionNumber === 4) setActionType("Delete Tasks");

    if (actionNumber) setTasksOpen(true);
  }, [actionNumber]);

  useEffect(() => {
    if (isPersonal) getPersonalTasks();
    else getSharedTasks();
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
              {Tasks?.map((val, index) => (
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
                    sharedWith={val.sharedWith}
                    isPersonal={val.taskType === "personal"}
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
                setTasksOpen(true);
                setActionNumber(1);
              }}
            >
              Add Task
            </button>
          </div>
          <TasksModal
            open={TasksOpen}
            toggleOpen={() => {
              setActionNumber(undefined);
              setSelected(undefined);
              setTasksOpen(false);
            }}
            callback={() => void 0}
            type={actionType}
            gotData={selected !== undefined ? Tasks[selected] : null}
            readOnly={actionType === "View Tasks"}
            setTasks={setTasks}
            Tasks={Tasks}
            isPersonal={isPersonal}
          />
        </div>
      )}
    </>
  );
}

export default TasksPage;
