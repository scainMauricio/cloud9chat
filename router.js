"use strict";
const server = require("./index");
const { Server } = require("socket.io");
const io = new Server(server);

const message = require("./controllers/message");

io.on("connection", (socket) => {
  socket.on("status", (msg) => {
    message.postMessage(msg);
  });
  socket.on("chat message", (msg) => {
    message.postMessage(msg);
  });
});
