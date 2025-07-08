// script.js
import { auth } from './firebase-config.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🌐 Inject header.html into all pages
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
    highlightActiveTab();
    attachLogoutListener();
    document.body.style.visibility = "visible";
  })
  .catch(err => {
    console.error("Header load failed:", err);
    document.body.style.visibility = "visible";
  });

// ✅ Highlight active page in nav
function highlightActiveTab() {
  const path = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 🔒 Handle Logout
function attachLogoutListener() {
  const logoutBtn = document.getElementById("logout-icon");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "auth.html";
      });
    });
  }
}
