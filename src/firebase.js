// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp8NZDlGsBmf8yhrG41NJGFqp10lz0TO8",
  authDomain: "shareverse-39a67.firebaseapp.com",
  projectId: "shareverse-39a67",
  storageBucket: "shareverse-39a67.appspot.com",
  messagingSenderId: "1084424471491",
  appId: "1:1084424471491:web:b4117b0558980f4d46b376",
  measurementId: "G-F70QJPT272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export{app,auth}

