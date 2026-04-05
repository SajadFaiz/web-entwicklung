// -----------------------------
// SIMPLE STORE PROJECT
// -----------------------------
// This version adds:
// - localStorage support for cart persistence
// - cart drawer that opens/closes on button click

// -----------------------------
// SELECT HTML ELEMENTS
// -----------------------------

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const clearCartBtn = document.getElementById("clearCartBtn");

const cartToggleBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartSection = document.getElementById("cartSection");
const overlay = document.getElementById("overlay");
// These elements control the cart drawer UI.

// -----------------------------
// STORE DATA
// -----------------------------

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    description: "Comfortable headphones with clear sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    description: "Track your activity and stay connected.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    description: "Stylish backpack with space for all essentials.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable speaker with rich sound quality.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80"
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 89.99,
    description: "Lightweight shoes made for everyday comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 34.99,
    description: "Minimal desk lamp with adjustable brightness.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80"
  }
];

// -----------------------------
// CART STATE
// -----------------------------

let cart = [];
// The cart is stored as an array of objects.
// We will now also save this array into localStorage.

// -----------------------------
// LOCAL STORAGE FUNCTIONS
// -----------------------------

function saveCart() {
  localStorage.setItem("storeCart", JSON.stringify(cart));
  // localStorage can only store text.
  // JSON.stringify converts the cart array into a string format.
}

function loadCart() {
  const savedCart = localStorage.getItem("storeCart");
  // We try to read previously saved cart data.

  if (savedCart) {
    cart = JSON.parse(savedCart);
    // JSON.parse converts the saved text back into a real JavaScript array.
  }
}

// -----------------------------
// CART PANEL FUNCTIONS
// -----------------------------

function openCart() {
  cartSection.classList.remove("hidden");
  overlay.classList.remove("hidden");
  // We remove the hidden class so both the cart panel
  // and dark overlay become visible.
}

function closeCart() {
  cartSection.classList.add("hidden");
  overlay.classList.add("hidden");
  // Adding the hidden class hides them again.
}

function toggleCart() {
  cartSection.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  // toggle() is useful when the same button should open and close the cart.
}

// -----------------------------
// RENDER PRODUCTS
// -----------------------------

function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h4 class="product-name">${product.name}</h4>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });
}

// -----------------------------
// ADD TO CART
// -----------------------------

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(item => item.id === productId);

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  //openCart();
  // Opening the cart after adding an item gives instant user feedback.
}

// -----------------------------
// RENDER CART
// -----------------------------

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
    cartTotal.textContent = "0.00";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
      </div>

      <div class="cart-controls">
        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = totalItems;
}

// -----------------------------
// CHANGE QUANTITY
// -----------------------------

function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity += 1;
    saveCart();
    renderCart();
  }
}

function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }

    saveCart();
    renderCart();
  }
}

// -----------------------------
// REMOVE ITEM
// -----------------------------

function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

// -----------------------------
// CLEAR CART
// -----------------------------

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------

productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

cartItems.addEventListener("click", function (event) {
  const productId = Number(event.target.dataset.id);

  if (event.target.classList.contains("increase-btn")) {
    increaseQuantity(productId);
  }

  if (event.target.classList.contains("decrease-btn")) {
    decreaseQuantity(productId);
  }

  if (event.target.classList.contains("remove-btn")) {
    removeItem(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

cartToggleBtn.addEventListener("click", toggleCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
// Clicking outside the cart closes it,
// which is a common and user-friendly pattern.

// -----------------------------
// APP START
// -----------------------------

loadCart();
renderProducts();
renderCart();
// We load the saved cart first,
// then render the products and the restored cart.