// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8M_PZvwc2SosFxnVSl7qhejsrk6csYbo",
  authDomain: "electiva-57bea.firebaseapp.com",
  projectId: "electiva-57bea",
  storageBucket: "electiva-57bea.appspot.com",
  messagingSenderId: "338001965693",
  appId: "1:338001965693:web:cef3f19747a0eb7925b714",
  measurementId: "G-6HGRCQ7S8M"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
