// auth.js
import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// DOM Elements
const authForm = document.getElementById("authForm");
const authStatus = document.getElementById("authStatus");

const email = document.getElementById("authEmail");
const password = document.getElementById("authPassword");

const loginBtn = document.getElementById("loginUser");
const registerBtn = document.getElementById("registerUser");
const logoutBtn = document.getElementById("logoutUser");
const goToAccount = document.getElementById("goToAccount");

// Login User
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    alert(err.message);
  }
});

// Register User
registerBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Registration successful!");
  } catch (err) {
    alert(err.message);
  }
});

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));

// Go to Account Page
goToAccount.addEventListener("click", () => {
  window.location.href = "account.html";
});

// Auth State Change
onAuthStateChanged(auth, (user) => {
  if (user) {
    authForm.classList.add("hidden");
    authStatus.classList.remove("hidden");
  } else {
    authForm.classList.remove("hidden");
    authStatus.classList.add("hidden");
  }

  document.body.style.visibility = "visible"; // Prevent flicker
});
