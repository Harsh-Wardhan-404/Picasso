import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";
import parse from 'cookie-parser';

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}
const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}

function checkUserFromCookies(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;

  try {
    const cookies = parse(cookieHeader);
    //@ts-ignore
    const token = cookies.auth_token;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || !decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    console.error("Cookie validation error:", e);
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close()
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
      console.log("Parsed data: ", parsedData.roomId);
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    const roomExists = await prismaClient.room.findUnique({
      where: { slug: parsedData.roomId }
    });

    if (!roomExists) {
      console.error(`Room with ID ${parsedData.roomId} not found`);
      return;
    }

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      console.log("Parsed Data: ", parsedData.roomId);
      const roomSlug = parsedData.roomId;
      const message = parsedData.message;

      const room = await prismaClient.room.findUnique({
        where: { slug: roomSlug }
      });
      if (!room) {
        console.error(`Room with ID ${roomSlug} not found`);
        return;
      }

      await prismaClient.chat.create({
        data: {
          roomId: room.id,
          message,
          userId
        }
      });

      users.forEach(user => {
        if (user.rooms.includes(roomSlug)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId: roomSlug
          }))
        }
      })
    }

  });

});

