import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[]
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    private scale = 1.0;
    private scaleMultiplier = 0.8;
    private minScale = 0.1;
    private maxScale = 10;
    private isPanning = false;
    private panStart = { x: 0, y: 0 };
    private translatePos = {
        x: 0,
        y: 0
    };
    private getTransformedPoint(x: number, y: number) {
        const rect = this.canvas.getBoundingClientRect();
        const canvasX = x - rect.left;
        const canvasY = y - rect.top;

        // Remove translation and scale effects
        return {
            x: (canvasX - this.translatePos.x) / this.scale,
            y: (canvasY - this.translatePos.y) / this.scale,
        }
    }

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
        this.canvas.removeEventListener("click", this.mouseClickHandler)
    }

    setTool(tool: "circle" | "pencil" | "rect" | "line" | "zoomIn" | "zoomOut"| "pan") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        console.log(this.existingShapes);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShapes.push(parsedShape.shape)
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.save();

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";

        this.ctx.translate(this.translatePos.x, this.translatePos.y);
        this.ctx.scale(this.scale, this.scale);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.x1, shape.y1);
                this.ctx.lineTo(shape.x2, shape.y2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })

        this.ctx.restore();
    }

    mouseDownHandler = (e) => {
        if (this.selectedTool === "pan") {
            this.isPanning = true;
            this.panStart.x = e.clientX;
            this.panStart.y = e.clientY;
            this.canvas.style.cursor = "grabbing"
        } else {
            this.clicked = true
            const transformed = this.getTransformedPoint(e.clientX, e.clientY);
            this.startX = transformed.x;
            this.startY = transformed.y;
        }
    }
    mouseUpHandler = (e) => {
        if (this.selectedTool === "pan") {
            this.isPanning = false;
            this.canvas.style.cursor = "grab";
        } else {
            this.clicked = false
            const transformed = this.getTransformedPoint(e.clientX, e.clientY);
            const width = transformed.x - this.startX;
            const height = transformed.y - this.startY;



            let shape: Shape | null = null;
            if (this.selectedTool === "rect") {

                shape = {
                    type: "rect",
                    x: this.startX,
                    y: this.startY,
                    height,
                    width
                }
            } else if (this.selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                shape = {
                    type: "circle",
                    radius: radius,
                    centerX: this.startX + radius,
                    centerY: this.startY + radius,
                }
            } else if (this.selectedTool === "line") {
                //add logic for line
                shape = {
                    type: "line",
                    x1: this.startX,
                    y1: this.startY,
                    x2: transformed.x,
                    y2: transformed.y
                }
                console.log("Line shape", shape);

            }

            if (!shape) {
                return;
            }

            this.existingShapes.push(shape);

            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId: this.roomId
            }))
        }

    }
    mouseMoveHandler = (e) => {
        if (this.isPanning) {
            const dx = e.clientX - this.panStart.x;
            const dy = e.clientY - this.panStart.y;

            this.translatePos.x += dx;
            this.translatePos.y += dy;

            this.panStart.x = e.clientX;
            this.panStart.y = e.clientY;
            this.clearCanvas();
        }
        if (this.clicked) {
            const transformed = this.getTransformedPoint(e.clientX, e.clientY);
            this.clearCanvas();

            // Save context state before drawing preview
            this.ctx.save();

            // Apply current transformations
            this.ctx.translate(this.translatePos.x, this.translatePos.y);
            this.ctx.scale(this.scale, this.scale);

            const width = transformed.x - this.startX;
            const height = transformed.y - this.startY;
            this.ctx.strokeStyle = "rgba(255, 255, 255)"

            if (this.selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (this.selectedTool === "circle") {
                // ... existing circle code ...
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (this.selectedTool === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(transformed.x, transformed.y);
                this.ctx.stroke();
            }

            // Restore context state
            this.ctx.restore();
        }
    }

    mouseClickHandler = (e) => {

        if (this.selectedTool === "zoomIn") {
            const mouseX = e.clientX - this.canvas.offsetLeft;
            const mouseY = e.clientY - this.canvas.offsetTop;

            const oldScale = this.scale;
            this.scale /= this.scaleMultiplier;

            this.translatePos.x += mouseX * (1 - 1 / this.scaleMultiplier);
            this.translatePos.y += mouseY * (1 - 1 / this.scaleMultiplier);

            this.clearCanvas();
        } else if (this.selectedTool === "zoomOut") {
            const oldScale = this.scale;
            this.scale *= this.scaleMultiplier;
            this.clearCanvas();
        }
    }

    handleZoom = (scaleFactor: number, mouseX: number, mouseY: number) => {
        const newScale = Math.min(Math.max(this.scale * scaleFactor, this.minScale), this.maxScale);

        if (newScale !== this.scale) {
            this.translatePos.x = mouseX - (mouseX - this.translatePos.x) * scaleFactor;
            this.translatePos.y = mouseY - (mouseY - this.translatePos.y) * scaleFactor;

            this.scale = newScale;
            this.clearCanvas();
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

        this.canvas.addEventListener("click", this.mouseClickHandler);
    }
}