"use strict";

const { sequelize, DataTypes } = require("../db");

const Message = sequelize.define(
  "Message",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "chat_messages",
  }
);

const postOne = async function (msg) {
  try {
    const message = await Message.create(msg);
    console.log(message.toJSON());
  } catch (error) {
    console.log("error :>> ", error);
  }
};
const getAll = async function () {
  const messages = await Message.findAll();
  return messages;
};

module.exports = { postOne, getAll };
