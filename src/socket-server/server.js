const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);

const io = socketIo(server, { cors: { orgin: "*" } });

io.on("connect", (socket) => {
	console.log(`Połączono: ${socket.id}`);

	socket.on("join", (roomName, gameId) => {
		socket.join(`${roomName}-&${gameId}`);
		console.log(`${socket.id} dołączył do ${roomName}-#${gameId}`);
	});

	socket.on("disconnect", () => console.log(`Rozłączono: ${socket.id}`));
});

server.listen(port, () => console.log(`Nasłuchuję port: ${port}`));
