"use client";

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    // const ws = new WebSocket(`${WS_URL}?token=${token}` : WS_URL);
    const wsUrl = token ? `${WS_URL}?token=${token}` : WS_URL;
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    }
  }, [])

  function getAuthToken() {
    return localStorage.getItem('auth_token');
  }


  if (!socket) {
    return <div>
      Connecting to the server.....
    </div>
  }


  return <div>
    <Canvas roomId={roomId} socket={socket} />
  </div>

}