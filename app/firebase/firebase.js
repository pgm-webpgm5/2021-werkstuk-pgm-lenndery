import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app =  firebase.initializeApp({
  apiKey: "AIzaSyC4JACKfji6sT1-rQ6DO9jJSTo1yHeFyGE",
  authDomain: "webpgm5.firebaseapp.com",
  projectId: "webpgm5",
  storageBucket: "webpgm5.appspot.com",
  messagingSenderId: "88614435473",
  appId: "1:88614435473:web:daadb0c56cbc567d2a5d30"
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export const currentUser = auth.currentUser

export default app;