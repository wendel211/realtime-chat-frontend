import { useState } from "react";
import "../styles/chat.css";

export default function UserForm({ onSetUsername }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onSetUsername(name.trim());
  };

  return (
    <div className="app-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>💬 Entrar no Chat</h1>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
