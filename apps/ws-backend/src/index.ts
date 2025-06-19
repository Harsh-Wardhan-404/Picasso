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
  const cookieHeader = request.headers.cookie;
  const userId = checkUserFromCookies(cookieHeader);

  if (userId == null) {
    console.log("Auth failed, closing connection")
    ws.close(1008)
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
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
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

