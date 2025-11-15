import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import UserForm from "./components/UserForm";

export default function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      {!username ? (
        <UserForm onSetUsername={setUsername} />
      ) : (
        <ChatWindow username={username} />
      )}
    </>
  );
}
