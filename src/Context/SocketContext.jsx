import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useLocalStorage from "../Hooks/useLocalStorage";

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [newMessageRecieved, setNewMessageRecived] = useState("");
  const [user, _] = useLocalStorage("user");

  useEffect(() => {
    const socket = io("ws://localhost:8900");
    setSocket(socket);

    socket.on("getMessage", (data) => {
      console.log("new Message recieved", data);
      setNewMessageRecived(data);
    });

    if (user && user?.id) {
      socket?.emit("addUser", user.id);
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, newMessageRecieved }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
