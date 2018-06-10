import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
var ws
ws = new $WebSocket("ws://localhost:3000");

ws.onMessage(
  (msg: MessageEvent) => {
    console.log("onMessage ", msg.data);
    this.onlineUser = parseInt(msg.data);
  },
  { autoApply: false }
);
ws.close(false);

// send with default send mode (now default send mode is Observer)
ws.send("some thing ===>").subscribe(
  (msg) => {
    console.log("next", msg.data);
  },
  (msg) => {
    console.log("error", msg);
  },
  () => {
    console.log("complete");
  }
);