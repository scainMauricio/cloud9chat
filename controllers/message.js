"use strict";

const models = require("../models/message");

const postMessage = async function (io, msg) {
  if (msg) {
    try {
      io.emit("chat message", msg);
      await models.postOne(msg);
    } catch (error) {
      console.log(error, "error");
    }
  }
};

const getMessages = async function (io, msg) {
  if (msg) {
    try {
      const msgs = await models.getAll();
      msgs.forEach((msg) => {
        io.emit("chat message", msg);
      });
      await models.postOne(msg);
      io.emit("chat message", msg);
    } catch (error) {
      console.log(error, "error");
    }
  }
};

module.exports = {
  postMessage,
  getMessages,
};
