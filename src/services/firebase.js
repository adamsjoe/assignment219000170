import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAa2v3Wb4zlbmLF9FkBX_DRsYYjpUOkLw8",
  authDomain: "assignment219000170.firebaseapp.com",
  databaseURL: "https://assignment219000170-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "assignment219000170",
  storageBucket: "assignment219000170.appspot.com",
  messagingSenderId: "1086176751748",
  appId: "1:1086176751748:web:318904d0a3a934d6d1d2d1",
  measurementId: "G-J9Q9NG2H65"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = firebase.auth()
export const firestore = getStorage();
// export const db = firebase.database();
