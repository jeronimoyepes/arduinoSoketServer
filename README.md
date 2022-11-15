## Servidor para capturar datos de arduino via puerto serial y enviarlos mediante un socket a una interfaz para visualizarlos

1. Installar NodeJS: https://nodejs.org/en/

2. Cambiar las variables necesarias en el archivo: variables.js y guardar.

3. Ejecutar el archivo EJECUTAR SERVIDOR.sh
- Esto te abrirá el servidor en la consola de comandos, aquí podrás ver: a) Los datos que estan siendo enviados del Arduino y si hay algún problema en la conexión. b) Cada vez que se envía un paquete de datos a la base de datos. c) Si la interfaz de visualización está recibiendo los datos del servidor
- También te abrirá el navegador en http://localhost:3000/ donde está la interfaz de visualización de datos.


En la carpeta de /utilidades encontrarás el código de Arduino necesario para enviar los datos correctamentes al servidor y los drivers de arduino UNO con chipset 340 
