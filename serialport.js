// ↓ cambiar el nombre del puerto ↓ Ir a: administrador de dispositivos/puertosCOM para obtener el nombre
const arduinoComPort = "COM12";

// Velocidad de entrada de registros del puerto serial, debe ser la misma que en el Arduino: Serial.begin([baudRate])
const baudRate = 3400;

// Librería para leer el puerto serial - Documentación -> https://serialport.io/docs/
import { SerialPort } from "serialport";

// Importar el analizador gramatical para los datos que vienen del arduino
import { ReadlineParser } from "serialport";

// Instanciar un nuevo puerto serial
const serialPort = new SerialPort({ path: arduinoComPort, baudRate });

// Pasar la información del puerto através del analizador gramatical
const serialData = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let isPortConnected = false;

function tryPortReconnection() {
  console.log("Intentando reconectar al Arduino");
  setTimeout(() => {
    !isPortConnected && serialPort.open();
  }, 3000);
}

// En caso de errores en el puerto
serialPort.on("error", function (err) {
  console.log("_ERROR_ ", err.message);

  isPortConnected = false;

  tryPortReconnection();
});

// Conexión establecida correctamente
serialPort.on("open", () => {
  console.log("Puerto serial abierto, conectado al Arduino");

  isPortConnected = true;
});

// Conexión cerrada con el puerto
serialPort.on("close", () => {
  console.log("Puerto serial cerrado");

  isPortConnected = false;

  tryPortReconnection();
});

export { serialData };
