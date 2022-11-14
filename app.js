import { __dirname } from "./templates/dirname.js";
import express from "express";
import http from "http";

// Datos provenientes del arduino.
// Entrar y modificar el puerto de comunicaciones!
import { serialData } from "./serialport.js";

// crear el servidor
const app = express();
const server = http.createServer(app);

// Importar e iniciar el socket para enviar los datos a la interfaz https://socket.io/docs/v4/
import { Server } from "socket.io";
import { writeToFirebase } from "./utilities/firebaseConf.js";
const io = new Server(server);

// Conexión de socket exitosa
io.on("connection", (socket) => {
  console.log("Conexión establecida con interfaz de visualización");
  // Cuando se finaliza la conexión
  socket.on("disconnect", () => {
    console.log("Conexión cerrada con interfaz de visualización");
  });
});

// Inicializar el paquete de datos que se enviará a la base de datos
let arduinoDataPackage = [];

// Datos provenientes del arduino
serialData.on("data", (data) => {
  const parsedData = () => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log(
        `error en la sintaxis de la información enviada: ${data}`
      );
      return null;
    }
  };

  console.log("Lectura: ", parsedData());

  // Enviar los datos mediante el socket a la página web
  io.volatile.emit("ArduinoData", parsedData());

  if (parsedData()) {
    // Agregar datos al paquete que se enviará a la base de datos
    arduinoDataPackage.push(parsedData());
  }
});

// Enviar cada tres segundos un paquete de datos a la base de datos
setInterval(() => {
  if (arduinoDataPackage.length > 0) {
    console.log(
      "Escribiendo en base de datos",
      arduinoDataPackage.length + " entradas en el paquete"
    );
    writeToFirebase({ data: arduinoDataPackage, date: new Date() });
  }
  arduinoDataPackage = [];
}, 3000);

// Ruta de la interfaz para mostrar las estadísticas
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dataVisualization.html");
});

// Inicializar el sevidor en el puerto 3000
server.listen(3000, () => {
  console.log("listening on *:3000");
});
