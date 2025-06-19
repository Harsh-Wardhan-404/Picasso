import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(roomId?: string) {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);

            if (roomId) {
                ws.send(JSON.stringify({
                    type: "join_room",
                    roomId
                }));
            }
        }

        ws.onerror = (e) => {
            setError("WEbsocket con failed");
            setLoading(true);
        }

        ws.onclose = (event) => {
            if (event.code === 1008) {
                setError("Authentication failed");
            }
            setSocket(null);
        };
    }, [roomId]);

    return {
        socket,
        loading,
        error
    }

}