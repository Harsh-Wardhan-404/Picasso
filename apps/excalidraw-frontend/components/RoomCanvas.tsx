"use client";

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNDkyNmFjMi1hMzk3LTRmYWItOWQ2Ni04Y2VlOTA2NDNhNmIiLCJpYXQiOjE3MzkxMjAzOTR9.9btz9ALUBPO0Y4-bYlJ4cRzrTjZ5Lfh_ChG7hWL71EM`)
    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    }
  }, [])


  if (!socket) {
    return <div>
      Connecting to the server.....
    </div>
  }


  return <div>
    <Canvas roomId={roomId} socket={socket} />
  </div>

}