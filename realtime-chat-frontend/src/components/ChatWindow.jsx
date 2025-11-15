import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageInput from "./MessageInput";
import "../styles/chat.css";

const socket = io("http://localhost:3001");

export default function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("user_joined", username);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (user) => {
      setMessages((prev) => [
        ...prev,
        { user: "Sistema", message: `${user} entrou no chat.` },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
    };
  }, [username]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = { user: username, message: text };
    socket.emit("send_message", msg);
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="app-container">
      <div className="chat-box">
        <div className="chat-header">💬 Chat em Tempo Real</div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.user === "Sistema"
                  ? "system-message"
                  : m.user === username
                  ? "message self"
                  : "message other"
              }
            >
              {m.user !== "Sistema" && <strong>{m.user}: </strong>}
              {m.message}
            </div>
          ))}
        </div>

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
