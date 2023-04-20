// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgDlbZzPt4s-eZs72Ew6vCZAs_W21kpSg",
  authDomain: "recuperadsmmovil.firebaseapp.com",
  projectId: "recuperadsmmovil",
  storageBucket: "recuperadsmmovil.appspot.com",
  messagingSenderId: "841176644084",
  appId: "1:841176644084:web:0ef87cc22eb7f11f53e1a1",
};

// Initialize Firebase
firebaseApp= initializeApp(firebaseConfig);
const database=getFirestore(firebaseApp)
export {database}