### To DO
1. Add more shapes
2. Add pencil feature
3. Add text feature
4. Improve UI
5. Signup and signin logic


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

2. Start development servers:
```sh
pnpm dev
```