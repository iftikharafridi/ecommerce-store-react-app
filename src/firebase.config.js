// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEcFM6yv745awHixREPhlkEVFJ5cd5Kc",
  authDomain: "ecommerce-react-app-423bb.firebaseapp.com",
  projectId: "ecommerce-react-app-423bb",
  storageBucket: "ecommerce-react-app-423bb.appspot.com",
  messagingSenderId: "135013856498",
  appId: "1:135013856498:web:a6b023986d801ac7a00c6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}