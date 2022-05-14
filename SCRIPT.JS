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
       <div class="message ${author_id ? "right you" : "left others"}">
      <span class = "name">${author}</span>
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(timestamp)}</div>
    </div>
  `);
  $("#messages").append($HtmlMsg);

  window.scrollTo(0, document.body.scrollHeight);
});

const startChat = function (user) {
  socket.on("chat message", function (msg) {
    const { authorid, content, timestamp } = msg;
    const time = Number(timestamp);
    const $HtmlMsg = $(`
    <div class="message ${authorid === user ? "right" : "left"}">
    <div class="message-author">${authorid}</div>
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(time)}</div>
    </div>
  `);
    $("#messages").append($HtmlMsg);

    window.scrollTo(0, document.body.scrollHeight);
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
  startChat(user);
  const message = new Message(`${user} got connected`, user, Date.now());
  socket.emit("status", message);
});

//------------- aux

function prettifyDate(timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(timestamp).toLocaleTimeString("en-US", options);
}

function randomColor() {
  var o = Math.round,
    r = Math.random,
    s = 125;
  return (
    "rgb(" +
    o(r() * s + 120) +
    "," +
    o(r() * s + 120) +
    "," +
    o(r() * s + 120) +
    ")"
  );
}

const chooseColor = function (authorid) {
  if (!colorMap[authorid]) {
    colorMap[reply.authorId] = randomColor();
  }

  let color = colorMap[reply.authorId];
};
