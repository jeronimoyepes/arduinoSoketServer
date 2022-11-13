import { __dirname } from "./templates/dirname.js";
import express from "express";
import http from "http";

// Datos provenientes del arduino.
// Entrar y modificar el puerto de comunicaciones!
import { serialData } from "./serialport.js";

// crear el servidor
const app = express();
const server = http.createServer(app);

// socket.io https://socket.io/docs/v4/
import { Server } from "socket.io";
const io = new Server(server);

// Conexión de socket exitosa
io.on("connection", (socket) => {
  console.log("a user connected");
  // Cuando se finaliza la conexión
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Datos provenientes del arduino
serialData.on("data", (data) => {
  // Enviar los datos mediante el socket
  io.volatile.emit("ArduinoData", data);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Inicializar el sevidor en el puerto 3000
server.listen(3000, () => {
  console.log("listening on *:3000");
});
