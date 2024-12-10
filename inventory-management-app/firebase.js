// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 
import {getStorage} from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsWnO-wEUMYp5nZcuzGWNbCLhdGnuSuWM",
  authDomain: "inventory-management-366fa.firebaseapp.com",
  projectId: "inventory-management-366fa",
  storageBucket: "inventory-management-366fa.appspot.com",
  messagingSenderId: "627651337",
  appId: "1:627651337:web:8056b7312cd38d6a4299d8",
  measurementId: "G-0VSSFL7G6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage= getStorage(app);

export {firestore, storage};