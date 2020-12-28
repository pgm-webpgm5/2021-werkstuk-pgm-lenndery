import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app =  firebase.initializeApp({
  
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();

export default app;