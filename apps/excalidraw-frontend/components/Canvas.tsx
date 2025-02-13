import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";
import Line from "./Icons/Line";

export type Tool = "circle" | "rect" | "pencil" | "line";

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket)
      setGame(g);
      return () => {
        g.destroy();
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    game?.setTool(selectedTool);
    //@ts-ignore
  }, [selectedTool, game]);

  return <div style={{
    height: "100vh",
    // background: "red",
    overflow: "hidden"
  }}>
    <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
  </div>
}

function Topbar({ selectedTool, setSelectedTool }: {
  selectedTool: Tool,
  setSelectedTool: (s: Tool) => void
}) {
  return <div style={{ position: "fixed", top: 10, left: 10 }}>
    <div className="flex gap-2">
      <IconButton activated={selectedTool === "pencil"} icon={<Pencil />} onClick={() => { setSelectedTool("pencil") }}></IconButton>
      <IconButton activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} onClick={() => { setSelectedTool("rect") }}></IconButton>
      <IconButton activated={selectedTool === "circle"} icon={<Circle />} onClick={() => { setSelectedTool("circle") }}></IconButton>
      <IconButton activated={selectedTool === "line"} icon={<Line />} onClick={() => { setSelectedTool("line") }}></IconButton>

    </div>

  </div>
}