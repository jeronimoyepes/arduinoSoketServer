import { __dirname } from "./templates/dirname.js";
import express from "express";
import http from "http";

import { studentGroupId } from "./variables.js";

// Utilidad para imprimir textos en consola
import { printLog } from "./utilities/log.js";

// Importar función para escribir a la base de datos
import { writeToFirebase } from "./utilities/firebaseConf.js";

// Datos provenientes del arduino.
// Entrar y modificar el puerto de comunicaciones!
import { serialData } from "./serialport.js";

// crear el servidor
const app = express();
const server = http.createServer(app);

// Importar e iniciar el socket para enviar los datos a la interfaz. Documentación: https://socket.io/docs/v4/
import { Server } from "socket.io";
const io = new Server(server);

// Conexión de socket exitosa
io.on("connection", (socket) => {
  printLog("Conexión establecida con interfaz de visualización", "important");
  // Cuando se finaliza la conexión
  socket.on("disconnect", () => {
    printLog("Conexión cerrada con interfaz de visualización", "important");
  });
});

// Inicializar el paquete de datos que se enviará a la base de datos
let arduinoDataPackage = [];

// Datos provenientes del arduino
serialData.on("data", (data) => {
  // Intentar convertir los datos a JSON
  function TryParseData() {
    try {
      return JSON.parse(data);
    } catch (error) {
      printLog(
        `error en la sintaxis de la información enviada: ${data}`,
        "error"
      );
      return null;
    }
  }

  const parsedData = TryParseData();

  // Enviar los datos mediante el socket a la interfaz de visualización
  io.volatile.emit("ArduinoData", parsedData);

  if (parsedData) {
    // Agregar datos al paquete que se enviará a la base de datos
    arduinoDataPackage.push(parsedData);

    printLog(`✔ ${data}`);
  }
});

// Enviar cada tres segundos un paquete de datos a la base de datos
setInterval(() => {
  const date = new Date()
  if (arduinoDataPackage.length > 0) {
    printLog(
      `Escribiendo en base de datos ${arduinoDataPackage.length} entradas en el paquete. ${date} - ${studentGroupId}`,
      "important"
    );

    writeToFirebase({ data: arduinoDataPackage, date, studentGroupId });
  }
  arduinoDataPackage = [];
}, 5000);

// Ruta de la interfaz para mostrar las estadísticas
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dataVisualization.html");
});

app.use(express.static('public'))

// Inicializar el sevidor en el puerto 3000
server.listen(3000, () => {
  console.log("listening on Port: 3000");
});
