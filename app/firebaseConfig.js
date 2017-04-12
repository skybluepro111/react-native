import * as firebase from 'firebase';

 const firebaseConfig = {
    apiKey: "AIzaSyDRyw93GYfmwwrpuT2YrOZE7u4Rs9NVP3Q",
    authDomain: "askmeproject-f1bd2.firebaseapp.com",
    databaseURL: "https://askmeproject-f1bd2.firebaseio.com",
    projectId: "askmeproject-f1bd2",
    storageBucket: "askmeproject-f1bd2.appspot.com",
    messagingSenderId: "661637388434"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;