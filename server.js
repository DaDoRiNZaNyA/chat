const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

const rooms = new Map();

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/rooms", (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.send();
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", (data) => {
    socket.join(data.roomId);
    rooms.get(data.roomId).get("users").set(socket.id, data.userName);
    const users = [...rooms.get(data.roomId).get("users").values()];
    socket.broadcast.to(data.roomId).emit("ROOM:JOINED", users);
  });

  socket.on("disconnected", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...rooms.get(roomId).get("users").values()];
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
      }
    });
  });

  console.log("user connected", socket.id);
});

const PORT = 9999;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
