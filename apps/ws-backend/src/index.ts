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

// function checkUser(token: string): string | null {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (typeof decoded == "string") {
//       return null;
//     }

//     if (!decoded || !decoded.userId) {
//       return null;
//     }

//     return decoded.userId;
//   } catch (e) {
//     return null;
//   }
//   return null;
// }

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
  const url = new URL(request.url || '', 'http://localhost');
  const roomId = url.searchParams.get('roomId');

  const cookieHeader = request.headers.cookie;
  let userId = checkUserFromCookies(cookieHeader);

  if (userId === null && roomId) {
    userId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    console.log(`Authenticated as guest via roomId: ${roomId}`);
  }

  if (userId === null) {
    console.log("Auth failed, closing connection");
    ws.close(1008);
    return null;
  }


  const user = {
    userId,
    rooms: roomId ? [roomId] : [],
    ws
  };

  users.push(user);

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
      console.log("Parsed data: ", parsedData.roomId);
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (!roomId) {
      console.error("No room ID provided");
      return;
    }

    const roomExists = await prismaClient.room.findUnique({
      where: { slug: roomId }
    });

    if (!roomExists) {
      console.error(`Room with ID ${roomId} not found`);
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
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId
        }
      });

      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
    }

  });

});

