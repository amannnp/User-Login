import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzfDHFn0X-iUQGsB9h0YBKowzWyULf2Wk",
  authDomain: "login-signup-api.firebaseapp.com",
  projectId: "login-signup-api",
  storageBucket: "login-signup-api.appspot.com",
  messagingSenderId: "351379592294",
  appId: "1:351379592294:web:19fc5a4a082b491e3509a7",
  measurementId: "G-26VFT1Y2PT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.textContent = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.getElementById('submitSignUp').addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, { email });
    })
    .then(() => {
      showMessage('Account created successfully.', 'signUpMessage');
      alert("Sign Up successful!");
      window.location.href = 'index.html';
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email already exists.', 'signUpMessage');
      } else {
        showMessage('Failed to create account.', 'signUpMessage');
      }
    });
});

document.getElementById('submitSignIn').addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Login successful.', 'signInMessage');
      alert("User logged in successfully!");
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        alert('Incorrect email or password.');
      } else {
        alert('Account does not exist.');
      }
    });
});
