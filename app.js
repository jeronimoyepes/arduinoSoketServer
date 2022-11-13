import { __dirname } from "./templates/dirname.js";
import express from "express";
import http from "http";

// Datos provenientes del arduino.
// Entrar y modificar el puerto de comunicaciones!
import { serialData } from "./serialport.js";

// socket.io https://socket.io/docs/v4/
import { io } from "./socketIO.js";

// crear el servidor
const app = express();
const server = http.createServer(app);

// Datos provenientes del arduino
serialData.on("data", (data) => {
  return data;
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Inicializar el sevidor en el puerto 3000
server.listen(3000, () => {
  console.log("listening on *:3000");
});
