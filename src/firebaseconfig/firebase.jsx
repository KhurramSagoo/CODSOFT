import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOXKZjsj16wC4YHpJcojiM3R0zBGVwUcc",
  authDomain: "fbase-test-dcef8.firebaseapp.com",
  projectId: "fbase-test-dcef8",
  storageBucket: "fbase-test-dcef8.appspot.com",
  messagingSenderId: "1080448070536",
  appId: "1:1080448070536:web:ea4541afe13aeedb29803d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
