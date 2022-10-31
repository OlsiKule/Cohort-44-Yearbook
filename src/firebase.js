// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHE6ptHsrKPhCuwtdy5blD1SUvaSMgPs4",
  authDomain: "simon-says-e2719.firebaseapp.com",
  databaseURL: "https://simon-says-e2719-default-rtdb.firebaseio.com",
  projectId: "simon-says-e2719",
  storageBucket: "simon-says-e2719.appspot.com",
  messagingSenderId: "380485331085",
  appId: "1:380485331085:web:33c236310f990780b95ac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;