import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBfmj1SlGObrHeBUNluN2rXBbubzyRMH3A",
  authDomain: "receipe-share.firebaseapp.com",
  projectId: "receipe-share",
  storageBucket: "receipe-share.appspot.com",
  messagingSenderId: "804854911406",
  appId: "1:804854911406:web:6beadbdf006eeeb5e9783f",
  measurementId: "G-FX9HVTQVK0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
export default db;
export { auth };
