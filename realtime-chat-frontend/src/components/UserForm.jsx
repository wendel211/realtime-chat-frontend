import { useState } from "react";

export default function UserForm({ onSetUsername }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onSetUsername(name.trim());
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
        💬 Real-Time Chat
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
