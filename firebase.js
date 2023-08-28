
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getFirestore, collection , addDoc,setDoc,doc, updateDoc,onSnapshot,arrayUnion,query,where,arrayRemove } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
  import { getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
  const firebaseConfig = {
    apiKey: "AIzaSyDpB5MTujqbaxH2T95ULOwKrkhGndzfUe0",
    authDomain: "blog-app-8b867.firebaseapp.com",
    projectId: "blog-app-8b867",
    storageBucket: "blog-app-8b867.appspot.com",
    messagingSenderId: "955771785615",
    appId: "1:955771785615:web:9a83f5181d2d98ed4d7bfa",
    measurementId: "G-5F4DMJG4X2"
  };

  export {signOut, getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged, 
    getFirestore,collection, addDoc ,doc, updateDoc ,setDoc,query,where,
    getStorage, ref ,uploadBytesResumable, getDownloadURL,onSnapshot,arrayUnion,arrayRemove, initializeApp
 }
 
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
// FirebaseFirestore rootRef = FirebaseFirestore.getInstance();
//  DocumentReference usesRef = rootRef.collection("users")
// val rootRef: FirebaseFirestore = FirebaseFirestore.getInstance()
// val userRef: CollectionReference = rootRef.collection("users")