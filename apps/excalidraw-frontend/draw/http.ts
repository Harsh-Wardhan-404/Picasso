import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    console.log("🔍 Getting shapes for room:", roomId);
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    console.log("📦 Raw response:", res.data);
    const messages = res.data.messages;
    console.log("💬 Messages count:", messages.length);

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    console.log("🎨 Shapes loaded:", shapes.length);
    return shapes;
}