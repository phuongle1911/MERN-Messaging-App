import React, { useState  } from "react";
import "../styles/ChatForm.css";

export default function ChatForm( { socket, roomChatId} ) {

    const [message, setMessage] = useState("");

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!socket || !socket.connected) {
            console.warn("Socket not connected.");
            return;
        }

        if (message.trim().length === 0) return;

        socket.emit("roomMessage", {
            roomId: roomChatId,
            msg: message,
        });

        setMessage("");
    }

  return (
    <div className="message-input-box">
        <form id="form">
            <input value={message} type="text" id="message" name="message" autoComplete="off" onChange={onChangeMessage}/>
            <button onClick={onSubmit}>Send</button>
        </form>
    </div>
  );
}

