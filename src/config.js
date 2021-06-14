import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyCWAfl0EmE3IcQUYldhocCKPvJK215Hu7A",
  authDomain: "covidhelp-7598c.firebaseapp.com",
  projectId: "covidhelp-7598c",
  storageBucket: "covidhelp-7598c.appspot.com",
  messagingSenderId: "1057127108134",
  appId: "1:1057127108134:web:6baea001d7bbcd200a20e7",
  measurementId: "G-GMHKR8GN4P",
};

firebase.initializeApp(config);
export default firebase;
