import React, { useEffect, useReducer } from "react";
import { JoinBlock } from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import { Chat } from "./components/Chat";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const onLogin = (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
  };

  useEffect(() => {
    socket.on("ROOM:JOINED", setUsers);
    socket.on("ROOM:SET_USERS", setUsers);
  }, []);

  return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
