//import { getFirestore,  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';  

const firebaseConfig = {
  apiKey: "AIzaSyAXF8GQhTvykDBiJ9GO3XbyoBHqz_VuHWs",
  authDomain: "herbopedia-8b45b.firebaseapp.com",
  projectId: "herbopedia-8b45b",
  storageBucket: "herbopedia-8b45b.appspot.com",
  messagingSenderId: "1005425571304",
  appId: "1:1005425571304:web:02dddf2781896c8298e05d"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
console.log('Firebase inicializado correctamente', firebaseApp);

export { firebaseApp };

