var socketio = io();
socketio.on("connect", () => {
  console.log("html was connected.");
  socketio.emit("apple", "emit on apple.");
});