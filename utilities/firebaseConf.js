import dotenv from "dotenv";
dotenv.config();

import { initializeApp } from "firebase/app";

const firebaseConfig = process.env.FIREBASE_CREDENTIALS;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Nombre de la coleción de la base de datos donde se escribirán los datos
const FBcollection = process.env.FIREBASE_COLLECTION;

// Escribir datos a Firebase, toma de argumento un json con la información a escribir y el nombre de la colección
const writeToFirebase = (json) => {
  // crea un objeto colección de firebase donde se escribirán los datos
  const dbCollection = collection(db, FBcollection);

  // Función de firebase, toma la colección a la que se escribirá y el json con los datos
  return addDoc(dbCollection, json);
};

export { writeToFirebase };