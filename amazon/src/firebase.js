// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAaNpMhqpbcP3A1gw6HY8fyMy1QUGkVstE",
  authDomain: "clone-2116f.firebaseapp.com",
  projectId: "clone-2116f",
  storageBucket: "clone-2116f.appspot.com",
  messagingSenderId: "954774652144",
  appId: "1:954774652144:web:476710fd81a795b6376e35",
  measurementId: "G-B37Z8TV4NE"
};

// Isse hamara app bn jayega firebase ka. Initialize App mein hamne pass krdi config toh vo is config ka firebase app bana dega.
const firebaseApp=firebase.initializeApp(firebaseConfig);

// Initialize database.Firestore is used to store data.
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();

// It allows us to export database and the authentication.
export {db,auth};
