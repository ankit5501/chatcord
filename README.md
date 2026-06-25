# ChatCord - Real-Time Chat Application

## Overview

ChatCord is a real-time chat application that allows users to join chat rooms and communicate instantly with other users. The application uses Socket.IO for real-time communication and provides a modern React-based user interface.

## Features

* Real-time messaging using Socket.IO
* Join and create chat rooms
* Live user list in each room
* User join/leave notifications
* Typing indicators
* Responsive React UI
* Online connection status tracking
* Multi-user chat support

## Tech Stack

### Frontend

* React.js
* Vite
* CSS Modules
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
chatcord/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
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

## Installation

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

## Running Locally

### Start Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Deployment

### Backend (Render)

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

### Frontend (Vercel)

Framework:

```text
Vite
```

Root Directory:

```text
client
```

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

---

## Production URLs

Frontend:

```text
https://chatcord-ashy-rho.vercel.app
```

Backend:

```text
https://chatcord-gqd7.onrender.com
```

---

## Future Improvements

* JWT Authentication
* MongoDB Message Persistence
* Private Messaging
* User Profiles
* Dark Mode
* File Sharing
* Emoji Support
* Message Read Receipts
* Group Chat Management

---


```
```
