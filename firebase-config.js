// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDijHMIm_zXAoijJERK6fM35FLUkvMEjDw",
  authDomain: "banerjee-stores.firebaseapp.com",
  projectId: "banerjee-stores",
  storageBucket: "banerjee-stores.firebasestorage.app",
  messagingSenderId: "556357413376",
  appId: "1:556357413376:web:901b7af29863fab5e886e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
