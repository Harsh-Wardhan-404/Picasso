import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
import cookieParser from 'cookie-parser'
import parse from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your frontend origin
    credentials: true,               // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    console.log("Signup req received oh yeaaaah")
    const parsedData = CreateUserSchema.safeParse(req.body.data);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body.data);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // TODO: Compare the hashed pws here
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.cookie('auth_token', token, {
        httpOnly: true,
        // secure: true, make it true after hosting
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/'
    });

    res.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
        token: token
    });
});

app.post("/create-room", middleware, async (req, res) => {

    try {
        //@ts-ignore
        const userId = req.userId;
        let uniqueSlug: string = "";
        let isUnique = false;

        while (!isUnique) {
            // Generate a 6-digit room code
            uniqueSlug = generateRoomCode();

            // Check if it already exists
            const existingRoom = await prismaClient.room.findFirst({
                where: { slug: uniqueSlug }
            });

            if (!existingRoom) {
                isUnique = true;
            }
        }

        const room = await prismaClient.room.create({
            data: {
                slug: uniqueSlug,
                adminId: userId
            }
        });

        res.json({
            slug: uniqueSlug,
            roomId: room.id
        })
    } catch (e) {
        res.status(500).json({
            message: "Failed to create room"
        })
    }
})

function generateRoomCode(): string {
    // Generate a number between 100000 and 999999 (6 digits)
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.get('/isRoom/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        console.log(roomId);
        const room = await prismaClient.room.findFirst({
            where: {
                slug: roomId
            }
        })
        if (room) {
            res.status(200).json({
                success: true,
                message: "Room exists"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Room doesn't exist"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomSlug = req.params.roomId;
        console.log("Getting chats for room slug:", roomSlug);
        const room = await prismaClient.room.findFirst({
            where: {
                slug: roomSlug
            }
        });

        if(!room){
            console.log("Room not found for slug: ",roomSlug);
            res.json({messages: []});
            return;
        }

        console.log("Found room ID:", room.id, "for slug:", roomSlug);

        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: room.id
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        console.log("Found", messages.length, "messages for room", room.id);

        res.json({
            messages
        })
    } catch (e) {
        console.log("Error getting chats:", e);
        res.json({
            messages: []
        })
    }

})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

app.listen(3001);