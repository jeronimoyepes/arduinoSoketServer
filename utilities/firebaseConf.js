// 📋 Configurar la base de datos de firebase

import dotenv from "dotenv";
dotenv.config();
import { FBcollection } from "../variables.js";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Escribir datos a Firebase, toma de argumento un json con la información a escribir y el nombre de la colección
const writeToFirebase = (json) => {
  // crea un objeto colección de firebase donde se escribirán los datos
  const dbCollection = collection(db, FBcollection);

  // Guardar en base de datos, toma la colección a la que se escribirá y el json con los datos
  return addDoc(dbCollection, json);
};

export { writeToFirebase };
