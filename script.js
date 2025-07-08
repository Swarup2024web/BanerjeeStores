// script.js
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔗 Inject header
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
  });

const productList = document.getElementById("productList");
const categoryBar = document.getElementById("categoryBar");

let allProducts = [];

// 🔄 Fetch products from Firestore
async function fetchProducts() {
  const q = query(collection(db, "products"));
  const snapshot = await getDocs(q);

  allProducts = [];
  const categorySet = new Set();

  snapshot.forEach(doc => {
    const data = doc.data();
    allProducts.push(data);
    categorySet.add(data.category);
  });

  renderCategories([...categorySet]);
  renderProducts(allProducts);
}

// 🧭 Render category buttons
function renderCategories(categories) {
  categoryBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "category-btn";
  allBtn.textContent = "All";
  allBtn.addEventListener("click", () => renderProducts(allProducts));
  categoryBar.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      const filtered = allProducts.filter(p => p.category === cat);
      renderProducts(filtered);
    });
    categoryBar.appendChild(btn);
  });
}

// 🛍️ Render product cards
function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img">
        <img src="${product.imageURL}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p><strong>Unit:</strong> ${product.unit}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <button class="add-cart-btn">Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

// 🔁 Initialize
fetchProducts();
