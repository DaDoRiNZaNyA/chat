import React, { useState } from "react";

export const Chat = ({users, messages}) => {
  const [messageValue, setMessageValue] = useState("");
  return (
    <div className="chat">
      <div className="chat-users">
        <b>Users (${users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))};
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>qweqweqweqweqwe</p>
            <div>
              <span>1 user</span>
            </div>
          </div>
          <div className="message">
            <p>qweqweqweqweqwe</p>
            <div>
              <span>1 user</span>
            </div>
          </div>
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-controll"
          ></textarea>
          <button type="button" className="send-button" rows="3">Send</button>
        </form>
      </div>
    </div>
  );
};
