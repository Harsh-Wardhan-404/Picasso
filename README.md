# 🎨 Picasso - Collaborative Drawing Reimagined

<div align="center">
  <img src="apps/excalidraw-frontend/public/logo4.png" alt="Picasso Logo" width="180" style="margin-bottom: 20px">
  
  ### **Think Visually. Draw Together.**
  
  *A beautiful real-time collaborative drawing platform where ideas come to life*
  
  <br>
  
  [![GitHub Stars](https://img.shields.io/github/stars/Harsh-Wardhan-404/Picasso?style=for-the-badge&logo=github&color=purple)](https://github.com/Harsh-Wardhan-404/Picasso)
  [![Twitter Follow](https://img.shields.io/badge/Follow-@harsh__wdym-1DA1F2?style=for-the-badge&logo=twitter)](https://x.com/harsh_wdym)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

  <br>

  [**🚀 Live Demo**](https://picasso-demo.com) · [**📖 Documentation**](https://docs.picasso.com) · [**🐛 Report Bug**](https://github.com/Harsh-Wardhan-404/Picasso/issues) · [**💡 Request Feature**](https://github.com/Harsh-Wardhan-404/Picasso/issues)

</div>

---

## 🌟 **What makes Picasso special?**

<table>
<tr>
<td width="50%">

### ⚡ **Lightning Fast**
Real-time collaboration with zero lag. See changes instantly as your team draws together.

### 🎯 **Simple & Intuitive** 
Jump in and start drawing immediately. No complex tutorials or steep learning curves.

### 🔒 **Private Rooms**
Create secure drawing spaces. Share room codes only with your team.

</td>
<td width="50%">

### 🎨 **Rich Drawing Tools**
Pencil, shapes, text, and more. Everything you need for visual thinking.

### 📱 **Cross-Platform**
Works seamlessly on desktop, tablet, and mobile devices.

### 🌙 **Beautiful Dark UI**
Modern, clean interface that's easy on the eyes during long sessions.

</td>
</tr>
</table>

---

## 🎬 **See it in Action**

<div align="center">
  <img src="https://github.com/Harsh-Wardhan-404/Picasso/blob/main/apps/excalidraw-frontend/public/picasso_demo.gif" alt="Picasso Demo" width="700" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3)">
  
  *Real-time collaboration in action - multiple users drawing simultaneously*
  
  <br><br>
  
  [**📹 Watch Full Demo Video**](https://github.com/Harsh-Wardhan-404/Picasso/raw/main/apps/excalidraw-frontend/public/picasso_demo.mp4)
</div>

---

### 📦 **Monorepo Structure**

```
Picasso/
├── 🎨 apps/
│   ├── excalidraw-frontend/    # Main drawing application
│   ├── http-backend/           # REST API & authentication
│   └── ws-backend/             # Real-time WebSocket server
│
└── 📚 packages/
    ├── ui/                     # Shared React components
    ├── db/                     # Database layer (Prisma)
    ├── backend-common/         # Backend utilities
    ├── common/                 # Shared types & utils
    └── config/                 # Shared configurations
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- 🟢 Node.js 18+
- 📦 PNPM
- 🐘 PostgreSQL

### **1️⃣ Clone & Install**
```bash
git clone https://github.com/Harsh-Wardhan-404/Picasso.git
cd Picasso
pnpm install
```

### **2️⃣ Database Setup**
```bash
# Create .env in packages/db/
echo 'DATABASE_URL="postgresql://username:password@localhost:5432/picasso"' > packages/db/.env

# Run migrations
cd packages/db
npx prisma migrate dev
npx prisma generate
cd ../..
```

### **3️⃣ Launch 🚀**
```bash
pnpm run dev
```

### **4️⃣ Open & Draw! 🎨**
- **Main App**: [localhost:3000](http://localhost:3000)

---

## 🛠️ **Built With**

<div align="center">

| Frontend | Backend | Database |
|----------|---------|----------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express) | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | ![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=flat-square&logo=socketdotio&logoColor=white) | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |

</div>

---

## 🤝 **Contributing**

We love contributions! Here's how you can help:

<div align="center">

| 🐛 **Found a Bug?** | 💡 **Have an Idea?** | 🔧 **Want to Code?** |
|---------------------|----------------------|----------------------|
| [Report it here](https://github.com/Harsh-Wardhan-404/Picasso/issues) | [Suggest a feature](https://github.com/Harsh-Wardhan-404/Picasso/issues) | [Fork & create PR](https://github.com/Harsh-Wardhan-404/Picasso/fork) |

</div>

### **Development Workflow**
1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔁 Open a Pull Request

---

## 🗺️ **Roadmap**

- [ ] 🔐 Advanced user authentication
- [ ] 📁 Drawing templates library
- [ ] 📱 Mobile app (React Native)
- [ ] 🎥 Session recording & playback
- [ ] 🌍 Internationalization (i18n)
- [ ] 🔌 Third-party integrations (Slack, Discord)

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Creator**

<div align="center">
  
  **Harsh Wardhan**
  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Harsh-Wardhan-404)
  [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/harsh_wdym)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/harshwardhan-saindane-7704a1258)

  *"Think it. Draw it. Share it."*

</div>

---

<div align="center">
  
  ### ⭐ **Star this repo if you find it helpful!** ⭐
  
  **Made with ❤️ and lots of ☕**
  
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with love">
  <img src="https://forthebadge.com/images/badges/powered-by-coffee.svg" alt="Powered by coffee">

</div>