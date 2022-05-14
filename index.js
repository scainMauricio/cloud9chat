const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const message = require("./controllers/message");

app.use(express.static("./client"));

app.use(express.json());

io.on("connection", async (socket) => {
  let userName;
  socket.on("status", async (msg) => {
    userName = msg.authorid;
    message.getMessages(io, msg);
  });

  socket.on("chat message", async (msg) => {
    message.postMessage(io, msg);
  });
  socket.on("disconnect", function () {
    message.postMessage(io, {
      authorid: "server",
      content: `${userName} has left the room`,
      timestamp: Date.now(),
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:4000");
});

module.exports = {
  io,
};
