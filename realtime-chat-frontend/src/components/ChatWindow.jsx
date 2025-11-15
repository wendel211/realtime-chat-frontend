import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageInput from "./MessageInput";
import "../styles/chat.css";

// 🔹 Instancia o socket uma vez (fora do componente)
const socket = io("http://localhost:3001", { autoConnect: true });

export default function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 🔸 Notifica o servidor quando o usuário entra
    socket.emit("user_joined", username);

    // 🔸 Cria funções de listener separadas (pra poder limpar depois)
    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        { user: "Sistema", message: `${user} entrou no chat.` },
      ]);
    };

    // 🔸 Registra os listeners
    socket.on("receive_message", handleReceive);
    socket.on("user_joined", handleUserJoined);

    // 🔸 Remove os listeners ao desmontar (evita duplicação)
    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("user_joined", handleUserJoined);
    };
  }, [username]); // roda apenas quando o username muda

  // 🔹 Envia mensagem
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
