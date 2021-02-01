import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAR0uKLwN7acz2QzWnlUOqNdNTtxPHasCg",
    authDomain: "learning-df4d4.firebaseapp.com",
    databaseURL: "https://learning-df4d4-default-rtdb.firebaseio.com",
    projectId: "learning-df4d4",
    storageBucket: "learning-df4d4.appspot.com",
    messagingSenderId: "475066155669",
    appId: "1:475066155669:web:28e0c35bf009621aa7919c",
    measurementId: "G-JXL6XWEJ5H"
};

if(!firebase.apps.length){
  //Abrir minha conexao
  firebase.initializeApp(firebaseConfig);
}

export default firebase;