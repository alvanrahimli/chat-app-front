import React from "react";

export function SetUpWebSocket() {
  const socket = new WebSocket("ws://192.168.0.108:8000/ws");
  socket.onopen = () => {
    console.log("Connection Opened");
  };
  socket.onmessage = (msg) => {
    console.log("Connection got a msg: ", msg);
  };
  socket.onerror = (err) => {
    console.error(err);
  };
  socket.onclose = (err) => {
    console.log("Connection closed");
  };

  console.log("Finished setting up WebSocket connection");
  return socket;
}

export const SocketContext = React.createContext(SetUpWebSocket());
