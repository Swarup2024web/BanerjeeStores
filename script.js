// script.js
import { db } from './firebase-config.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productList = document.getElementById("product-list");

// Load and display products from Firestore
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      productList.innerHTML = "<p>No products available.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const product = doc.data();

      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      `;

      productList.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products: ", error);
    productList.innerHTML = "<p>Something went wrong while loading products.</p>";
  }
}

loadProducts();
