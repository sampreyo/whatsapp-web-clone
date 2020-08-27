import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC38D3VlN1RGyyLrsTlxGgKPPjQva4h3QI",
    authDomain: "whatsapp-clone-f32ed.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-f32ed.firebaseio.com",
    projectId: "whatsapp-clone-f32ed",
    storageBucket: "whatsapp-clone-f32ed.appspot.com",
    messagingSenderId: "106153078908",
    appId: "1:106153078908:web:2f0040ef2360ca526d19f9",
    measurementId: "G-B8ESVVLKX3"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  console.log("firebase initialized");
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;