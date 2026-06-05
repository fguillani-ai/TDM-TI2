import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAsVkVVmMXf_otRJE9vgdr0QrPHmAHi480",
  authDomain: "tdm-ti-2.firebaseapp.com",
  projectId: "tdm-ti-2",
  storageBucket: "tdm-ti-2.firebasestorage.app",
  messagingSenderId: "597026057805",
  appId: "1:597026057805:web:33c2ed1747e23c23b7f604"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()