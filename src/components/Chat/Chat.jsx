import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import "./Chat.scss";

export const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState("");
  const messageRef = useRef(null);

  const onSendMessage = (event) => {
    event.preventDefault();
    if (messageValue.trim() !== "") {
      socket.emit("ROOM:NEW_MESSAGE", {
        roomId,
        userName,
        text: messageValue,
      });
      onAddMessage({
        userName,
        text: messageValue,
      });
      setMessageValue("");
    }
  };

  const handleTextareaKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      onSendMessage(event);
    }
  };

  useEffect(() => {
    messageRef.current.scrollTo(0, 99999999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="up">
        <div className="chat-users">
          <b>В сети {users.length}:</b>
          <ul>
            {users.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messageRef} className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.userName === userName ? `message my` : "message"}
              >
                <span>{message.userName}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={onSendMessage}>
        <textarea
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          className="form-controll"
        ></textarea>
        <button type="submit" className="send-button" rows="3">
          ✈️
        </button>
      </form>
    </div>
  );
};
