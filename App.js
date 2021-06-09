import React, { useEffect } from "react";
import Navigator from "./app/routes/HomeStack";
import { SocketContext, SetUpWebSocket } from "./app/services/SocketService";

export default function App() {
  console.log("APP IS STARTED");
  let sharedSocket = SetUpWebSocket();

  return (
    <SocketContext.Provider value={sharedSocket}>
      <Navigator />
    </SocketContext.Provider>
  );
}
