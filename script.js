import { db } from "./firebase-config.js";
import { collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// DOM elements
const productList = document.getElementById("productList");
const categoryBar = document.getElementById("categoryBar");

let allProducts = [];

// 🔁 Load Products from Firestore
async function fetchProducts() {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);

    allProducts = [];
    let categorySet = new Set();

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      allProducts.push(product);
      if (product.category) {
        categorySet.add(product.category);
      }
    });

    renderCategories([...categorySet]);
    renderProducts(allProducts); // Load all by default
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML = "<p>⚠️ Failed to load products.</p>";
  }
}

// 🧾 Render Product Cards
function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found in this category.</p>";
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
        <p>Category: ${product.category}</p>
        <p>Unit: ${product.unit}</p>
        <p>Price: ₹${product.price}</p>
        <button>Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

// 🧭 Render Category Buttons
function renderCategories(categories) {
  categoryBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.dataset.category = "All";
  allBtn.addEventListener("click", () => {
    renderProducts(allProducts);
  });
  categoryBar.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.addEventListener("click", () => {
      const filtered = allProducts.filter(p => p.category === cat);
      renderProducts(filtered);
    });
    categoryBar.appendChild(btn);
  });
}

// 🚀 Init
fetchProducts();
