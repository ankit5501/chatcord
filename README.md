# 💬 ChatCord - Real-Time Chat Application

A modern real-time chat application built with **React**, **Node.js**, **Express.js**, and **Socket.IO**. ChatCord enables users to join chat rooms, exchange messages instantly, view online users, and experience seamless real-time communication.

---

## 🚀 Live Demo

**Frontend:** https://chatcord-ashy-rho.vercel.app

**Backend:** https://chatcord-gqd7.onrender.com

---

## 📸 Features

* 🚀 Real-time messaging using Socket.IO
* 👥 Join and create chat rooms
* 💬 Instant message delivery
* 👤 Live user list in each room
* ✍️ Typing indicator
* 🟢 Online/Offline connection status
* 📱 Responsive React UI
* ⚡ Fast frontend powered by Vite
* 🌐 Full-stack deployment (Vercel + Render)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* CSS Modules
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Deployment

* Vercel (Frontend)
* Render (Backend)

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```text
chatcord/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── public/
├── utils/
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ankit5501/chatcord.git
cd chatcord
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

---

## ▶️ Run Locally

### Start Backend

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🏗️ Deployment

### Frontend

* Hosted on **Vercel**

### Backend

* Hosted on **Render**

---

## 💡 How It Works

1. Users join a chat room with a username.
2. React frontend establishes a Socket.IO connection.
3. Express server manages socket events.
4. Messages are broadcast instantly to all users in the room.
5. Online users and typing indicators update in real time.

---

## 📌 Future Improvements

* JWT Authentication
* MongoDB Message Persistence
* Private Messaging
* User Profiles
* File & Image Sharing
* Emoji Picker
* Dark Mode
* Message Read Receipts
* Push Notifications

---

## 🧠 Key Concepts Demonstrated

* Real-Time Communication
* WebSockets
* Socket.IO
* React Hooks
* Custom Hooks
* Component-Based Architecture
* Event-Driven Programming
* Client-Server Architecture
* REST & WebSocket Integration
* Full-Stack Deployment

---
