import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyANGxxxPpMTQZ1vkynjUXgHHzz3DLQAgPo",
    authDomain: "chat-app-816b4.firebaseapp.com",
    projectId: "chat-app-816b4",
    storageBucket: "chat-app-816b4.appspot.com",
    messagingSenderId: "127307233344",
    appId: "1:127307233344:web:c3a04ed7cb82c4ec1907a5",
    measurementId: "G-TYY980J87W"
  };


  const app=initializeApp(firebaseConfig)
  export const firebaseAuth=getAuth(app);
  
