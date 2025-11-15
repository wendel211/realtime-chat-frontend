import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageInput from "./MessageInput";
import "../styles/chat.css";

const socket = io("http://localhost:3001", { autoConnect: true });

export default function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!username) return;

    if (!socket.hasJoined) {
      socket.emit("user_joined", username);
      socket.hasJoined = true;
    }

    // 🔹 Recebe mensagens de qualquer usuário (inclusive você)
    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        { user: "Sistema", message: `${user} entrou no chat.` },
      ]);
    };

    const handleUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        { user: "Sistema", message: `${user} saiu do chat.` },
      ]);
    };

    socket.on("receive_message", handleReceive);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
    };
  }, [username]);

  // 🔸 Envia a mensagem para o servidor (não adiciona localmente!)
  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = { user: username, message: text };
    socket.emit("send_message", msg);
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
