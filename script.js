// script.js
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productList = document.getElementById("product-list");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <img src="${product.image}" width="100%" />
    `;
    productList.appendChild(div);
  });
}

loadProducts();
