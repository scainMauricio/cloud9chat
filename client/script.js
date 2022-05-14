"use strict";

const colorMap = {};

class Message {
  constructor(content, authorid, timestamp) {
    this.content = content;
    this.authorid = authorid;
    this.timestamp = timestamp;
  }
}

const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

socket.on("status", function (msg) {
  const { authorid, content, timestamp } = msg;
  const $HtmlMsg = $(`
    <div class="message">
    <div class="message-author">${authorid}</div>
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(timestamp)}</div>
    </div>
  `);
  $("#messages").append($HtmlMsg);
  $("#messages").scrollTop(99999);
});

const startChat = function (user) {
  socket.on("chat message", function (msg) {
    const { authorid, content, timestamp } = msg;
    // const color = chooseColor(msg.authorid);
    const time = Number(timestamp);
    const $HtmlMsg = $(`
    <div 
 class="message ${authorid === user ? "right" : "left"}">
    <div class="message-author">${authorid}</div>
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(time)}</div>
    </div>
  `);
    $("#messages").append($HtmlMsg);

    $("#messages").scrollTop(99999);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      const message = new Message(input.value, user, Date.now());
      socket.emit("chat message", message);
      input.value = "";
    }
  });
};

//---------event listeners

$("#startForm").on("submit", function (event) {
  event.preventDefault();
  const user = $("#startForm").find("#name").val();
  $("#authorForm").hide(200);
  $("#form").css("display", "flex");
  startChat(user);
  const message = new Message(`${user} joined the room.`, user, Date.now());
  socket.emit("status", message);
});

//------------- aux

function prettifyDate(timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(timestamp).toLocaleTimeString("en-US", options);
}

function randomColor() {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var h = randomInt(0, 36) * 10;
  var s = 70;
  var l = 70;
  return `hsl(${h},${s}%,${l}%)`;
}

const chooseColor = function (authorid) {
  if (!colorMap[authorid]) {
    colorMap[authorid] = randomColor();
  }
  return colorMap[authorid];
};
