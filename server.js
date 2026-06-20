const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chatcord-ashy-rho.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});

const botName = "ChatCord Bot";

// Serve old static files (legacy)
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  // ── Join Room ─────────────────────────────
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome message to sender
    socket.emit("message", formatMessage(botName, `Welcome to ${user.room}, ${user.username}! 👋`));

    // Notify others in room
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage(botName, `${user.username} has joined the chat`));

    // Send room users list to everyone in the room
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // ── Chat Message ──────────────────────────
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (!user) return;
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // ── Typing Indicator ──────────────────────
  socket.on("typing", () => {
    const user = getCurrentUser(socket.id);
    if (!user) return;
    // Broadcast to everyone in the room EXCEPT the sender
    socket.broadcast.to(user.room).emit("userTyping", { username: user.username });
  });

  socket.on("stopTyping", () => {
    const user = getCurrentUser(socket.id);
    if (!user) return;
    socket.broadcast.to(user.room).emit("userStopTyping", { username: user.username });
  });

  // ── Disconnect ────────────────────────────
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n🚀 ChatCord server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO ready | Typing events enabled`);
});