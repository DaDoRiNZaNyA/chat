import React, { useEffect, useReducer } from "react";
import { JoinBlock } from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import { Chat } from "./components/Chat";
import axios from "axios";

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

  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(
      `http://localhost:9999/rooms/${obj.roomId}`
    );
    setUsers(data.users);
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", (message) => {
      dispatch({
        type: "NEW_MESSAGE",
        payload: message,
      });
    });
  }, []);

  return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
