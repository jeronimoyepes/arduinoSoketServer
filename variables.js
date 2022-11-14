// 📋 Variables

// Nombre de la coleción de la base de datos donde se escribirán los registros.
// ❕ No modificar si no se modificó en la base de datos
const FBcollection = "ColeccionVariablesInsectos";

// Velocidad de entrada de registros del puerto serial.
// Debe ser la misma que en código del Arduino: Serial.begin([baudRate])
// ❕ No modificar si no se modificó en el Arduino
const baudRate = 3400;

// Conectar Arduino e ir a: administrador de dispositivos/puertosCOM para encontrar el puerto al que está conectado
// ↓ cambiar el nombre del puerto del Arduino ↓ 
const arduinoComPort = "COM12";

// Id del grupo de estudiantes para identificar los registros que se envían a la base de datos
// ↓ Cambiar el id del grupo de estudiantes ↓ 
const studentGroupId = 1;

// Exportar las variables
export { FBcollection, arduinoComPort, baudRate, studentGroupId };
