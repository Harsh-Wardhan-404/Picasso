Signup is in progres - currently you do get the userid in response, 
do:
1. Add join room logic
2. 

### To DO
1. Change the jwt token which we have hardcoded, file - (/Users/harshwardhansaindane/projects/Picasso/apps/excalidraw-frontend/components/RoomCanvas.tsx)
2. Set up proper auth
3. fix janky stuff from whiteboard


# Picasso - Collaborative Drawing App

A real-time collaborative drawing application built with Next.js and WebSocket.

## Project Structure

This is a monorepo using Turborepo with the following structure:

### Apps
- `excalidraw-frontend`: Main drawing application UI 
- `web`: Additional web interface running on port 3002
- `http-backend`: HTTP API server
- `ws-backend`: WebSocket server for real-time collaboration

### Packages
- `@repo/ui`: Shared React component library
- `@repo/db`: Database utilities
- `@repo/backend-common`: Common backend utilities
- `@repo/typescript-config`: Shared TypeScript configurations
- `@repo/eslint-config`: Shared ESLint configurations

## Getting Started

1. Install dependencies:
```sh
pnpm install
```

2. Fill the .env
- Create a .env file in the packages/db folder and Put the postgres URL in packages/db/.env

3. Migrate the db
- cd packages/db
```sh
npx prisma migrate dev
```

4. Generate prisma client
```sh
npx prisma generate
```

3. Start development servers(from root folder):
```sh
pnpm run dev
```