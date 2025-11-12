import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); 

export default function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      const msgData = { user: username, message };
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
          💬 Real-Time Chat
        </h1>

        {!username ? (
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Digite seu nome..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md p-2 mb-3"
            />
            <button
              onClick={() => setUsername(username.trim())}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
            >
              Entrar no chat
            </button>
          </div>
        ) : (
          <>
            <div className="border p-3 h-80 overflow-y-auto mb-3 rounded-md">
              {chat.map((c, i) => (
                <div key={i} className="mb-2">
                  <strong>{c.user}: </strong>
                  <span>{c.message}</span>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow border rounded-md p-2"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Enviar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
