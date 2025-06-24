// import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Hand, Minus, Pencil, Plus, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";
import Line from "./Icons/Line";
import { Join } from "./Join";

export type Tool = "circle" | "rect" | "pencil" | "line" | "zoomIn" | "zoomOut" | "pan";

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("pan");
  const [game, setGame] = useState<Game>();
  const [showJoin, setShowJoin] = useState<boolean>(false);
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket)
      g.init();
      setGame(g);
      return () => {
        g.destroy();
      }
    }
  }, [canvasRef, roomId, socket]);

  useEffect(() => {
    game?.setTool(selectedTool);
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
    <canvas style={{ cursor: selectedTool === "pan" ? "grab" : "default" }} ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    {showJoin && <Join onClose={() => setShowJoin(false)} socket={socket} />}
    <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} setShowJoin={setShowJoin} />
  </div>
}

function Topbar({ selectedTool, setSelectedTool, setShowJoin }: {
  selectedTool: Tool,
  setSelectedTool: (s: Tool) => void,
  setShowJoin: (s: boolean) => void
}) {
  return (
    <>
      <div style={{ position: "fixed", top: 10, left: 10 }}>
        <div className="flex gap-2">
          <IconButton activated={selectedTool === "pencil"} icon={<Pencil />} onClick={() => { setSelectedTool("pencil") }}></IconButton>
          <IconButton activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} onClick={() => { setSelectedTool("rect") }}></IconButton>
          <IconButton activated={selectedTool === "circle"} icon={<Circle />} onClick={() => { setSelectedTool("circle") }}></IconButton>
          <IconButton activated={selectedTool === "line"} icon={<Line />} onClick={() => { setSelectedTool("line") }}></IconButton>
          <IconButton activated={selectedTool === "zoomIn"} icon={<Plus />} onClick={() => { setSelectedTool("zoomIn") }}></IconButton>
          <IconButton activated={selectedTool === "zoomOut"} icon={<Minus />} onClick={() => { setSelectedTool("zoomOut") }}></IconButton>
          <IconButton activated={selectedTool === "pan"} icon={<Hand />} onClick={() => { setSelectedTool("pan") }}></IconButton>

        </div>

      </div>
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl" onClick={() => setShowJoin(true)}>
            Join Room
          </span>
        </button>
      </div>
    </>
  )
}

