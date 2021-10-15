import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBljJm4qQHHWYvP5OCKHpfQQFN-7EG47wY",
  authDomain: "saving-buddy.firebaseapp.com",
  databaseURL: "https://saving-buddy-default-rtdb.firebaseio.com/",
  projectId: "saving-buddy",
  storageBucket: "saving-buddy.appspot.com",
  messagingSenderId: "349271132177",
  appId: "1:349271132177:web:8ef4f20a64ec94f46ac9b0",
  measurementId: "G-BV35PBQRER"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database }