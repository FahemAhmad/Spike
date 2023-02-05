import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("ws://192.168.100.10:8900");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
