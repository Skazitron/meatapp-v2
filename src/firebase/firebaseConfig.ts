// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage} from "@firebase/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLbTuezpqq7S1JMnkRF3VB6SUgS1NSglc",
  authDomain: "meatapp-9e191.firebaseapp.com",
  projectId: "meatapp-9e191",
  storageBucket: "meatapp-9e191.appspot.com",
  messagingSenderId: "810875469221",
  appId: "1:810875469221:web:a253e1442dedfe11a4fc4c"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance, not the config
const firestore = getFirestore(app); // Pass the app instance, not the config
const storage = getStorage(app); 

export {app, auth, firestore, storage};