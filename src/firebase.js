import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage'; 

const config = {
    apiKey: "AIzaSyAnJ7gR-XmmArfjVEeEv-CLrMsSaBHrpg8",
  authDomain: "hospital-managment-cfb7c.firebaseapp.com",
  projectId: "hospital-managment-cfb7c",
  storageBucket: "hospital-managment-cfb7c.appspot.com",
  messagingSenderId: "216406453074",
  appId: "1:216406453074:web:165ed54cfe8f2afd05288b"
  };

  firebase.initializeApp(config);

  export default firebase;