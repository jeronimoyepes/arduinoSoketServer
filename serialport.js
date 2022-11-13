// ↓ cambiar el nombre del puerto ↓ Ir a: administrador de dispositivos/puertosCOM
const arduinoComPort = "COM12";

// Librería para leer el puerto serial - Documentación -> https://serialport.io/docs/
import { SerialPort } from "serialport";

// Importar el analizador gramatical para los datos que vienen del arduino
import { ReadlineParser } from "serialport";

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

export { serialData };