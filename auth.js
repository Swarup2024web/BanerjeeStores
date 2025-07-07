// auth.js
import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Elements
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const msg = document.getElementById('auth-message');
const logoutBtn = document.getElementById('logout-btn');

// Register
window.register = async function () {
  const email = emailInput.value;
  const password = passInput.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    msg.textContent = "✅ Registered Successfully!";
    msg.style.color = 'green';
  } catch (error) {
    msg.textContent = "❌ " + error.message;
    msg.style.color = 'red';
  }
}

// Login
window.login = async function () {
  const email = emailInput.value;
  const password = passInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    msg.textContent = "✅ Logged In!";
    msg.style.color = 'green';
  } catch (error) {
    msg.textContent = "❌ " + error.message;
    msg.style.color = 'red';
  }
}

// Logout
window.logout = async function () {
  await signOut(auth);
}

// Detect Login Status
onAuthStateChanged(auth, user => {
  if (user) {
    msg.textContent = `🔓 Logged in as ${user.email}`;
    logoutBtn.style.display = 'inline-block';
  } else {
    msg.textContent = '🔒 Not logged in';
    logoutBtn.style.display = 'none';
  }
});
