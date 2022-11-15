void setup() {
  Serial.begin(9600);  // Inicializa el puerto serial

  // ---
  // Aquí tu código de lectura de los sensores
  // ---
}

void loop() {

  // ---
  // Aquí tu código de lectura de los sensores
  // ---

  // ---
  // Lo siguiente crea un objeto con sintaxis de JSON que pueda ser interpretado por el servidor.
  // Modificar solo los valores especificados
  Serial.print("{");

  Serial.print("\"temperature\": ");

  // Cambiar ↓este valor por la variable de temperatura
  Serial.print(999);

  Serial.print(",\"humidity\": ");

  // Cambiar ↓este valor por la variable de humedad
  Serial.print(999);

  Serial.print(",\"luminosity\": ");

  // Cambiar ↓este valor por la variable de iluminación
  Serial.print(999);

  Serial.print(",\"movement\": ");

  // Cambiar ↓este valor por la variable de movimiento ( 1 = movimiento detectado, 0 = sin movimiento )
  Serial.print(999);

  Serial.print("}");
  Serial.println();
}