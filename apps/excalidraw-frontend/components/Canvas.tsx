// import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Minus, Pencil, Plus, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";
import Line from "./Icons/Line";

export type Tool = "circle" | "rect" | "pencil" | "line" | "zoomIn" | "zoomOut";

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey && game && canvasRef.current) {
        e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        game.handleZoom(zoomFactor, mouseX, mouseY);
      }
    }

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
    }
  }, [game]);

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
      <IconButton activated={selectedTool === "zoomIn"} icon={<Plus />} onClick={() => { setSelectedTool("zoomIn") }}></IconButton>
      <IconButton activated={selectedTool === "zoomOut"} icon={<Minus />} onClick={() => { setSelectedTool("zoomOut") }}></IconButton>

    </div>

  </div>
}