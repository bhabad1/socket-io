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

io.on("connection", (socket) => {
  io.emit("user.add", socket.id);

  socket.on("message.send", (data) => {
    io.emit("message.sent", data);
  });
  socket.on("disconnect", function () {
    io.emit("user.remove", socket.id);
  });
});
