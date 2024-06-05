import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtul3O0XcEzichYcBco9AutXEitjeTK5Y",
  authDomain: "fir-testing-11282.firebaseapp.com",
  projectId: "fir-testing-11282",
  storageBucket: "fir-testing-11282.appspot.com",
  messagingSenderId: "453629593332",
  appId: "1:453629593332:web:1edafbeaa3a3fae83e00a1",
  measurementId: "G-ESJ6FF2D4B",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
