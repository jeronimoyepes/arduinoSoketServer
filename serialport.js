// 馃搵 Configuraci贸n y conexi贸n al puerto serial del Arduino

import { arduinoComPort, baudRate } from "./variables.js";

// Utilidad para imprimir textos en consola
import { printLog } from "./utilities/log.js";

// Librer铆a para leer el puerto serial - Documentaci贸n: https://serialport.io/docs/
import { SerialPort } from "serialport";

// Importar el analizador gramatical para los datos que vienen del arduino
import { ReadlineParser } from "serialport";

// Instanciar un nuevo puerto serial
const serialPort = new SerialPort({ path: arduinoComPort, baudRate });

// Pasar la informaci贸n del puerto atrav茅s del analizador gramatical
const serialData = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Variable para identificar si el arduino est谩 conectado o no
let isPortConnected = false;


// Cada tres segundos intentar recuperar la conexi贸n del puerto
function tryPortReconnection() {
  printLog("Intentando reconectar al Arduino", "warn");
  setTimeout(() => {
    !isPortConnected && serialPort.open();
  }, 3000);
}

// En caso de errores en el puerto
serialPort.on("error", function (err) {
  printLog(err.message, "error");

  isPortConnected = false;

  tryPortReconnection();
});

// Conexi贸n establecida correctamente
serialPort.on("open", () => {
  printLog("Puerto serial abierto, conectado al Arduino", "important");

  isPortConnected = true;
});

// Conexi贸n cerrada con el puerto
serialPort.on("close", () => {
  printLog("Puerto serial cerrado" , "warn");

  isPortConnected = false;

  tryPortReconnection();
});

export { serialData };
