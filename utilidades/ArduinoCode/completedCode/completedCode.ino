// Código completo para recibir información de los sensores de temperatura y humedad, luminosidad y movimiento

// Necesario para el sensor temperatura y humedad ---
// Tutorial: https://circuitdigest.com/microcontroller-projects/interfacing-dht11-sensor-with-arduino#:~:text=Circuit%20Diagram%20for%20Interfacing%20DHT11%20Sensor%20with%20Arduino&text=Connections%20are%20pretty%20simple%20and,with%20DHT11%20through%20this%20pin.
// ! Install the Adafruit’s DHT sensor library and Adafruit Unified Sensor Driver
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#define DHTTYPE DHT11
#define DHTPIN 3                  //Puerto de entrada para el sensor de temperatura y humedad
DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;


const int movementSensor = 2;     // Puerto de entrada de datos del sensor de movimiento
int movementSensorState = 0;      // Variable para almacenar los datos enviados del sensor

const int photoresistor = A0;     // Puerto de entrada del fotoresistor
int photoresistorState = 0        // Variable para almacenar los datos enviados del sensor


void setup() {
  Serial.begin(9600);  // Inicializa el puerto serial

  dht.begin();  // Inicializar lectura de sensor de temperatura y humedad
  sensor_t sensor;
  delayMS = sensor.min_delay / 1000;

  pinMode(movementSensor, INPUT);
  pinMode(photoresistor, INPUT)
}

void loop() {
  // Capturar los datos del sensor de movimiento
  movementSensorState = digitalRead(movementSensor);
  
  // Capturar los datos del fotoresistor
  photoresistorState = analogRead(photoresistor);

  // Obtener temperatura y humedad
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  dht.humidity().getEvent(&event);

  // ---
  // Lo siguiente crea un objeto con sintaxis de JSON que pueda ser interpretado por el servidor.
  // Modificar solo los valores especificados
  Serial.print("{");

  Serial.print("\"temperature\": ");

  // Cambiar ↓este valor por la variable de temperatura
  Serial.print(event.temperature);

  Serial.print(",\"humidity\": ");

  // Cambiar ↓este valor por la variable de humedad
  Serial.print(event.relative_humidity);

  Serial.print(",\"luminosity\": ");

  // Cambiar ↓este valor por la variable de iluminación
  Serial.print(photoresistorState);

  Serial.print(",\"movement\": ");

  // Cambiar ↓este valor por la variable de movimiento ( 1 = movimiento detectado, 0 = sin movimiento )
  Serial.print(movementSensorState);

  Serial.print("}");
  Serial.println();

  delay(delayMS); //Delay mínimo para la captura de temperatura y humedad
}