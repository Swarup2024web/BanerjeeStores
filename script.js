import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  query
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const productList = document.getElementById("productList");
const categoryBar = document.getElementById("categoryBar");

let allProducts = [];

// 🚀 Fetch all products from Firestore
async function fetchProducts() {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    allProducts = [];

    const categorySet = new Set();

    querySnapshot.forEach(doc => {
      const data = doc.data();
      allProducts.push(data);
      if (data.category) {
        categorySet.add(data.category);
      }
    });

    renderCategories([...categorySet]);
    renderProducts(allProducts);

  } catch (err) {
    console.error("Error fetching products:", err);
    productList.innerHTML = `<p class="error">⚠️ Failed to load products.</p>`;
  }
}

// 🧭 Render Categories Top Bar
function renderCategories(categories) {
  categoryBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "category-btn";
  allBtn.onclick = () => renderProducts(allProducts);
  categoryBar.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "category-btn";
    btn.onclick = () => {
      const filtered = allProducts.filter(p => p.category === cat);
      renderProducts(filtered);
    };
    categoryBar.appendChild(btn);
  });
}

// 🛒 Render Product Cards
function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found in this category.</p>";
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
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Unit:</strong> ${product.unit}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <button class="add-cart-btn">Add to Cart</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

// ✅ Init on load
fetchProducts();
