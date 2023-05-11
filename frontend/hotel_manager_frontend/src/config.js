// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATBBJhf7bFnvd7WkEwatHc6UOEaM-cIU0",
  authDomain: "hotelmanager-ebde5.firebaseapp.com",
  projectId: "hotelmanager-ebde5",
  storageBucket: "hotelmanager-ebde5.appspot.com",
  messagingSenderId: "437344567317",
  appId: "1:437344567317:web:94709149fd939afdf68e1c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();