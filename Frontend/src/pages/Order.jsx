import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

export default function Order() {
  const socket = io(import.meta.env.VITE_API_URL);

  const sendMessage = () => {
    socket.emit("my-message", "it is working");

    socket.on("my-message", (d) => console.log("d", d));
  };

  return (
    <div>
      <h1>
        <button onClick={() => sendMessage()}>Send</button>
      </h1>
    </div>
  );
}
