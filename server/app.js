const WebSocket = require("ws");
const port = 5005;
const wss = new WebSocket.Server({ port, clientTracking: true });

const history = [];

wss.on("connection", (connection) => {
    wss.clients.forEach((client) => client.send(JSON.stringify(history)));
    connection.on("message", (data) => {
        history.push(String(data));
        wss.clients.forEach((client) => client.send(JSON.stringify(history)));
    });
});
