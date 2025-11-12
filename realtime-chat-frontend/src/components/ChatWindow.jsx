import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:3001");

export default function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = (msg) => {
    if (msg.trim()) {
      const data = { user: username, message: msg };
      socket.emit("send_message", data);
      setMessages((prev) => [...prev, data]);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
        👋 Olá, {username}!
      </h2>

      <div className="flex-1 overflow-y-auto border rounded-md p-3 mb-3 h-80">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.user === username ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded-lg ${
                m.user === username
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <strong>{m.user}:</strong> {m.message}
            </span>
          </div>
        ))}
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
