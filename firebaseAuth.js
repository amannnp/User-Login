// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzfDHFn0X-iUQGsB9h0YBKowzWyULf2Wk",
    authDomain: "login-signup-api.firebaseapp.com",
    projectId: "login-signup-api",
    storageBucket: "login-signup-api.appspot.com",
    messagingSenderId: "351379592294",
    appId: "1:351379592294:web:19fc5a4a082b491e3509a7",
    measurementId: "G-26VFT1Y2PT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Ensure auth is initialized with app
const db = getFirestore(app);  // Ensure db is initialized with app

// Function to show messages
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Handling sign up
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const confirmPassword = document.getElementById("confirmPassword").value

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return; // Stop the sign-up process
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      alert("Sign Up successful !")
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});


const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
       alert("User Logged in successFully!")
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert('Incorrect Email or Password');
        }
        else{
            alert('Account does not Exist');
        }
    })
 })