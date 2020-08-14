const messagenput = document.getElementById("message");
const socket = io("http://127.0.0.1:3000");
let name = null;
window.onload = function () {
  name = prompt("Enter nickname");
document.title=`RTC-Chat ${name}`  
  socket.emit("user-connected", id, name);
 
  printMsg("You joined", "sent");
};
window.onunload = function () {
  socket.emit("user-disconnected", id, name);
};
socket.on("user-disconnected", (data) => {
  printMsg(`${data} left!`, "recived");
 
});
socket.on("user-connected", (data) => {
  printMsg(`${data} joined!`, "recived");
  
});
socket.on("message", (data) => {
  printMsg(data, "recived");
});
const form = document.getElementById("send-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let messagetext = messagenput.value;

  printMsg(messagetext, "sent");

  socket.emit("message", id, messagetext);

  messagenput.value = "";
});

function printMsg(msg, args) {
  let main = document.getElementById("main");

  let message = document.createElement("div");
  message.classList.add("message");

  message.classList.add(args);

  message.innerHTML = msg;
  main.insertBefore(message,main.firstChild)
}
