# 🎨 Picasso - Collaborative Drawing App

<p align="center">
  <img src="apps/excalidraw-frontend/public/logo4.png" alt="Picasso Logo" width="200">
</p>

<p align="center">
  A real-time collaborative drawing application built with Next.js and WebSockets
</p>

<p align="center">
  <a href="https://github.com/Harsh-Wardhan-404/Picasso">
    <img src="https://img.shields.io/github/stars/Harsh-Wardhan-404/Picasso?style=social" alt="GitHub Stars">
  </a>
  <a href="https://x.com/harsh_wdym">
    <img src="https://img.shields.io/badge/Twitter-Follow-blue" alt="Twitter Follow">
  </a>
</p>

## ✨ Features

- **Real-time collaboration** - Draw together with teammates anywhere in the world
- **Multiple drawing tools** - Pencil, shapes, eraser, and more
- **Rooms system** - Create private drawing rooms and invite others
- **Responsive design** - Works on desktop and mobile devices
- **Modern UI** - Clean, dark-themed interface with purple accents

## 🎬 Demo

<p align="center">
  <img src="https://github.com/Harsh-Wardhan-404/Picasso/blob/main/apps/excalidraw-frontend/public/picasso_demo.gif" alt="Picasso Demo" width="700">
</p>

Check out the [full demo video](https://github.com/Harsh-Wardhan-404/Picasso/raw/main/apps/excalidraw-frontend/public/picasso_demo.mp4) for a walkthrough of all features.

## 🚀 Project Structure

This is a monorepo built with Turborepo, organized as follows:

### Apps
- `excalidraw-frontend`: Main drawing application UI 
- `http-backend`: HTTP API server for authentication and data storage
- `ws-backend`: WebSocket server for real-time collaboration
- `web`: Additional web interface (port 3002)

### Packages
- `@repo/ui`: Shared React component library
- `@repo/db`: Database utilities (Prisma)
- `@repo/backend-common`: Common backend utilities
- `@repo/common`: Shared types and utilities
- `@repo/typescript-config`: Shared TypeScript configurations
- `@repo/eslint-config`: Shared ESLint configurations

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Harsh-Wardhan-404/Picasso.git
   cd Picasso
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the `packages/db` folder
   - Add your PostgreSQL database URL:
     ```
     DATABASE_URL="postgresql://username:password@localhost:5432/picasso"
     ```

4. **Set up the database**
   ```sh
   cd packages/db
   npx prisma migrate dev
   npx prisma generate
   cd ../..
   ```

5. **Start development servers**
   ```sh
   pnpm run dev
   ```

6. **Open the application**
   - Main drawing app: [http://localhost:3000](http://localhost:3000)
   - Web interface: [http://localhost:3002](http://localhost:3002)

## 💻 Technologies

- **Frontend:** Next.js, React, TailwindCSS, Motion
- **Backend:** Node.js, Express, WebSockets
- **Database:** PostgreSQL with Prisma ORM
- **DevOps:** Turborepo, PNPM workspaces

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by [Harsh Wardhan](https://x.com/harsh_wdym)

---

<p align="center">Made with ❤️ and ☕</p>