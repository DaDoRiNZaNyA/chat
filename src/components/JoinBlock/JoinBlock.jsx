import React, { useState } from "react";
import axios from "axios";
import './JoinBlock.scss';

export const JoinBlock = ({onLogin}) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  const onEnter = async () => {
    if (!roomId || !userName){
      return alert('Введите номер комнаты и свое имя');
    }
    const obj = {
      roomId, userName
    };
    setIsLoading(true);
    await axios.post('https://chat-back-4n4o.onrender.com/rooms', obj);
    // await axios.post('http://localhost:9999/rooms', obj);
    onLogin(obj);
  } 

  return (
    <div className="join-block">
      <input  onKeyDown={handleKeyDown} type="text" placeholder="Room ID" onChange={e => setRoomId(e.target.value)} value={roomId}></input>
      <input onKeyDown={handleKeyDown} type="text" placeholder="Имя" onChange={e => setUserName(e.target.value)} value={userName}></input>
      <button disabled={isLoading} onClick={onEnter}>{isLoading ? "ВХОД..." : "ВОЙТИ"}</button>
    </div>
  );
};
