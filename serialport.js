// ↓ cambiar el nombre del puerto al adecuado ↓
const arduinoComPort = "COM13";

// Librería para leer el puerto serial - Documentación -> https://serialport.io/docs/
const { SerialPort } = require("serialport");

// Importar el analizador gramatical para los datos que vienen del arduino
const { ReadlineParser } = require("@serialport/parser-readline");

// Instanciar un nuevo puerto serial
const port = new SerialPort({ path: arduinoComPort, baudRate: 9600 });

// Pasar la información del puerto através del analizador gramatical
const serialData = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// En caso de errores en el puerto
port.on("error", function (err) {
  console.log("Error: ", err.message);
});

// Conexión establecida correctamente con el puerto
port.on("open", () => {
  console.log("Puerto serial abierto");
});

// Datos provenientes del puerto
serialData.on("data", (data) => {
  // https://socket.io/get-started/chat
  console.log("got word from arduino:", data);
});

export { serialData };
