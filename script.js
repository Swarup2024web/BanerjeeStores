// script.js
import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Inject Header
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
    highlightActiveTab();
    attachLogoutListener();
    showHeaderAfterLoad();
  });

// Highlight current tab
function highlightActiveTab() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (path.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Optional logout icon support
function attachLogoutListener() {
  const logoutBtn = document.getElementById("logout-icon");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        alert("Logged out!");
        window.location.href = "auth.html";
      });
    });
  }
}

// Optional header fade in after load
function showHeaderAfterLoad() {
  const header = document.getElementById("header-container");
  header.style.opacity = 0;
  setTimeout(() => {
    header.style.opacity = 1;
    header.style.transition = "opacity 0.4s ease-in";
  }, 100);
}

// Handle login state globally
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("userLoggedIn", "true");
  } else {
    localStorage.removeItem("userLoggedIn");
  }
});
