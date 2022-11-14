void setup() {
  Serial.begin(3400);  // initialize the serial communication
}

void loop() {
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