import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

const config = {
  apiKey: "AIzaSyA2VVYhNqbqz0SUG6LSFxkmLn7GH5HB-pg",
  authDomain: "multilingo-93c59.firebaseapp.com",
  databaseURL: "https://multilingo-93c59.firebaseio.com",
  projectId: "multilingo-93c59",
  storageBucket: "multilingo-93c59.appspot.com",
  messagingSenderId: "958860116143",
  appId: "1:958860116143:web:9abe50c18a6a5e77"
};

const firebaseApp = firebase.initializeApp(config);
const rsf = new ReduxSagaFirebase(firebaseApp).firestore;

export default rsf;
