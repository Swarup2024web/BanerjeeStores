// script.js
// Shared by all public pages like index.html, cart.html, order.html, etc.

// 🚀 Inject the Header
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;

    // ✅ Highlight active navigation tab
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".header-row2 a");

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  });
