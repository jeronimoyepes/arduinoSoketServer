void setup() {
  Serial.begin(9600);  // initialize the serial communication
}

void loop() {
  Serial.print("{");
  Serial.print("\"temperature\": ");
  // Cambiar ↓este valor por la variable de temperatura
  Serial.print(random(35,40));
  Serial.print(",\"humidity\": ");
  // Cambiar ↓este valor por la variable de humedad
  Serial.print(random(80,100));
  Serial.print(",\"luminosity\": ");
  // Cambiar ↓este valor por la variable de iluminación
  Serial.print(random(350,400));
  Serial.print(",\"movement\": ");
  // Cambiar ↓este valor por la variable de movimiento ( 1 = movimiento detectado, 0 = sin movimiento )
  Serial.print(random(0,2));
  Serial.print("}");
  Serial.println();
  Serial.println(static_variable);
}