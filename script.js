// script.js

// Optional: Highlight active nav link based on page
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (path.includes(link.getAttribute('href'))) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // Future: Add-to-cart, search filter, etc.
});
