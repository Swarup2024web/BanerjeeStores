// 📜 script.js
import { db, auth } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🧩 Inject header on every page
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
  });

// 🛍️ Product Listing Logic (for index.html)
const productList = document.getElementById("productList");
const categoryBar = document.getElementById("categoryBar");

let allProducts = [];

if (productList && categoryBar) {
  fetchProducts();
}

// 🚚 Fetch products from Firestore
async function fetchProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  allProducts = [];
  let categorySet = new Set();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    allProducts.push(data);
    categorySet.add(data.category);
  });

  renderCategories([...categorySet]);
  renderProducts(allProducts);
}

// 🧩 Render category buttons
function renderCategories(categories) {
  categoryBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.dataset.category = "All";
  allBtn.className = "category-btn";
  allBtn.addEventListener("click", () => renderProducts(allProducts));
  categoryBar.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.className = "category-btn";
    btn.addEventListener("click", () => {
      const filtered = allProducts.filter(p => p.category === cat);
      renderProducts(filtered);
    });
    categoryBar.appendChild(btn);
  });
}

// 🧺 Render product cards
function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img">
        <img src="${product.imageURL}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Unit: ${product.unit}</p>
        <p>₹${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => addToCart(product));
    productList.appendChild(card);
  });
}

// 🛒 Add to cart using localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart.`);
                            }
