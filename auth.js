// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAmvdJQ11z2uwdbK5cEkFnKW3gGWbDlBGg",
  authDomain: "fitness-hub-blog.firebaseapp.com",
  projectId: "fitness-hub-blog",
  storageBucket: "fitness-hub-blog.firebasestorage.app",
  messagingSenderId: "135907719826",
  appId: "Y1:135907719826:web:7c71fcc403c7fcbb8fc44b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Elements
const email = document.getElementById('email');
const password = document.getElementById('password');

const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const googleBtn = document.getElementById('google-btn');
const logoutBtn = document.getElementById('logout-btn');

const authMessage = document.getElementById('auth-message');


// Signup
signupBtn.addEventListener('click', () => {

  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )

  .then(() => {
    authMessage.innerHTML = 'Signup Successful ✅';
  })

  .catch((error) => {
    authMessage.innerHTML = error.message;
  });

});


// Login
loginBtn.addEventListener('click', () => {

  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )

  .then(() => {
    authMessage.innerHTML = 'Login Successful ✅';
  })

  .catch((error) => {
    authMessage.innerHTML = error.message;
  });

});


// Google Login
googleBtn.addEventListener('click', () => {

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)

  .then(() => {
    authMessage.innerHTML = 'Google Login Successful ✅';
  })

  .catch((error) => {
    authMessage.innerHTML = error.message;
  });

});


// Logout
logoutBtn.addEventListener('click', () => {

  signOut(auth)

  .then(() => {
    authMessage.innerHTML = 'Logged Out ✅';
  })

  .catch((error) => {
    authMessage.innerHTML = error.message;
  });

});


// User State
onAuthStateChanged(auth, (user) => {

  if(user) {
    authMessage.innerHTML =
      `Welcome ${user.email}`;
  }
  else {
    authMessage.innerHTML =
      'No User Logged In';
  }

});