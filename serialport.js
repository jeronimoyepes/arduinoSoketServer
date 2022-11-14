// ↓ cambiar el nombre del puerto ↓ Ir a: administrador de dispositivos/puertosCOM para obtener el nombre
const arduinoComPort = "COM12";

// Librería para leer el puerto serial - Documentación -> https://serialport.io/docs/
import { SerialPort } from "serialport";

// Importar el analizador gramatical para los datos que vienen del arduino
import { ReadlineParser } from "serialport";

// Instanciar un nuevo puerto serial
const serialPort = new SerialPort({ path: arduinoComPort, baudRate: 3400 });

// Pasar la información del puerto através del analizador gramatical
const serialData = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let isPortConnected = false;

function reconnectPort() {
  isPortConnected && serialPort.open();
}

// En caso de errores en el puerto
serialPort.on("error", function (err) {
  console.log("_ERROR_ ", err.message);
  isPortConnected = false;
  setTimeout(() => {
    console.log("Intentando reconectar al arduino, conectelo o reinicie el programa");
    reconnectPort();
  }, 3000);
});

// Conexión establecida correctamente con el puerto
serialPort.on("open", () => {
  console.log("Puerto serial abierto");
  isPortConnected = true;
});

// Conexión establecida correctamente con el puerto
serialPort.on("close", () => {
  console.log("Puerto serial cerrado");
  isPortConnected = false;
  setTimeout(() => {
    console.log("intentando reconectar");
    reconnectPort();
  }, 3000);
});

export { serialData };
