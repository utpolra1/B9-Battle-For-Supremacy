// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWbfiuuojedf6xxW84vp8tYLRlCcW8xiU",
  authDomain: "b9-battle-for-supremacy.firebaseapp.com",
  projectId: "b9-battle-for-supremacy",
  storageBucket: "b9-battle-for-supremacy.appspot.com",
  messagingSenderId: "300832576376",
  appId: "1:300832576376:web:361c5b5785bb810638ee8d"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
export default App;