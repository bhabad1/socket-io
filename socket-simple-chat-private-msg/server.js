const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = http.Server(app);
const io = socketIO(server);

server.listen(5001, () => {
  console.log("Server is listening on 5001");
});

let sockets = {};

io.on("connection", (socket) => {
  for (let i in sockets) {
    socket.emit("user.add", {
      username: sockets[i].username,
      id: sockets[i].id,
    });
  }
  // Add a new user
  socket.on("username.create", function (data) {
    socket.username = data;
    sockets[socket.id] = socket;
    io.emit("user.add", {
      username: socket.username,
      id: socket.id,
    });
  });
  // Send the hug event to only the socket specified
  socket.on("user.hug", function (id) {
    sockets[id].emit("user.hugged", socket.username);
  });
  // Remove disconnected users
  socket.on("disconnect", function () {
    delete sockets[socket.id];
    io.emit("user.remove", socket.id);
  });
});
