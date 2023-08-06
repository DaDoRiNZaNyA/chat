import React, { useEffect, useReducer } from "react";
import { JoinBlock } from "./components/JoinBlock/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import { Chat } from "./components/Chat/Chat";
import axios from "axios";
import "./app.scss";

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
      `https://chat-back-4n4o.onrender.com/rooms/${obj.roomId}`
      // `http://localhost:9999/rooms/${obj.roomId}`
    );
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  return (
    <div className="App">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;
