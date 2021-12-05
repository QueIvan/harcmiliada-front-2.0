const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT >= 0 && process.env.PORT <= 65535 ? parseInt(process.env.PORT) + 1 : process.env.PORT > 1 ? parseInt(process.env.PORT) - 1 : 4001;
const app = express();
const server = http.createServer(app);

const io = socketIo(server, { cors: { orgin: "*" } });

io.on("connect", (socket) => {
	console.log(`Połączono: ${socket.id}`);

	socket.on("join", (roomName, gameId) => {
		socket.join(`${roomName}-&${gameId}`);
		console.log(`${socket.id} dołączył do pokoju ${roomName}-#${gameId}`);
	});

	socket.on("setVisibilityStatus", (roomName, data) => {
		socket.to(roomName).emit("setVisibilityStatus", data);
	});

	socket.on("setAnswerVisibility", (roomName, data) => {
		socket.to(roomName).emit("setAnswerVisibility", data);
	});

	socket.on("setWrongAnswersCount", (roomName, data) => {
		socket.to(roomName).emit("setWrongAnswersCount", data);
	});

	socket.on("reloadBoard", (roomName) => {
		socket.to(roomName).emit("reloadBoard");
	});

	socket.on("disconnect", () => console.log(`Rozłączono: ${socket.id}`));
});

server.listen(port, () => console.log(`Nasłuchuję port: ${port}`));