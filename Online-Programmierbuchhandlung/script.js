const products = [
  {
    id: 1,
    name: "JavaScript: Der definitive Leitfaden",
    category: "JavaScript",
    price: 45,
    description: "Ein vollständiger Leitfaden für modernes JavaScript für Anfänger und Profis.",
    image: "https://covers.openlibrary.org/b/isbn/1565923928-L.jpg"
  },
  {
    id: 2,
    name: "Eloquent JavaScript",
    category: "JavaScript",
    price: 32,
    description: "Eine beliebte Einführung in JavaScript, Programmierung und Problemlösung.",
    image: "https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg"
  },
  {
    id: 3,
    name: "Python Crashkurs",
    category: "Python",
    price: 38,
    description: "Eine praktische, projektbasierte Einführung in die Programmierung mit Python.",
    image: "https://m.media-amazon.com/images/I/81ZBWeKoZVL.jpg"
  },
  {
    id: 5,
    name: "Clean Code",
    category: "Softwaretechnik",
    price: 50,
    description: "Ein klassisches Buch über das Schreiben von lesbarem, wartbarem und professionellem Code.",
    image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"
  },
  {
    id: 6,
    name: "Entwurfsmuster",
    category: "Softwaretechnik",
    price: 55,
    description: "Wesentliche objektorientierte Entwurfsmuster für die professionelle Softwareentwicklung.",
    image: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg"
  },
  {
    id: 8,
    name: "Der pragmatische Programmierer",
    category: "Softwaretechnik",
    price: 48,
    description: "Zeitlose Ratschläge und praktische Techniken für moderne Entwickler.",
    image: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg"
  }
];

const productGrid = document.getElementById("productGrid");
const productTemplate = document.getElementById("productTemplate");
const cartItemTemplate = document.getElementById("cartItemTemplate");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const resultsMessage = document.getElementById("resultsMessage");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const subtotalAmount = document.getElementById("subtotalAmount");
const shippingAmount = document.getElementById("shippingAmount");
const finalTotal = document.getElementById("finalTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

const checkoutForm = document.getElementById("checkoutForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const address = document.getElementById("address");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const addressError = document.getElementById("addressError");
const successMessage = document.getElementById("successMessage");

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

function speichereWarenkorb() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function fuelleKategorien() {
  const categories = [...new Set(products.map(function(product) {
    return product.category;
  }))];

  categories.forEach(function(category) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function findeProduktNachId(productId) {
  return products.find(function(product) {
    return product.id === productId;
  });
}

function findeWarenkorbArtikelNachId(productId) {
  return cart.find(function(item) {
    return item.id === productId;
  });
}

function fuegeZumWarenkorbHinzu(productId) {
  const existingCartItem = findeWarenkorbArtikelNachId(productId);

  if (existingCartItem) {
    existingCartItem.quantity = existingCartItem.quantity + 1;
  } else {
    const product = findeProduktNachId(productId);

    if (product) {
      const newCartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      };

      cart.push(newCartItem);
    }
  }

  speichereWarenkorb();
  rendereWarenkorb();
}

function erhoeheMenge(productId) {
  const cartItem = findeWarenkorbArtikelNachId(productId);

  if (cartItem) {
    cartItem.quantity = cartItem.quantity + 1;
    speichereWarenkorb();
    rendereWarenkorb();
  }
}

function verringereMenge(productId) {
  const cartItem = findeWarenkorbArtikelNachId(productId);

  if (cartItem) {
    cartItem.quantity = cartItem.quantity - 1;

    if (cartItem.quantity <= 0) {
      entferneAusWarenkorb(productId);
      return;
    }

    speichereWarenkorb();
    rendereWarenkorb();
  }
}

function entferneAusWarenkorb(productId) {
  cart = cart.filter(function(item) {
    return item.id !== productId;
  });

  speichereWarenkorb();
  rendereWarenkorb();
}

function leereWarenkorb() {
  cart = [];
  speichereWarenkorb();
  rendereWarenkorb();
}

function holeGefilterteProdukte() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortSelect.value;

  let filteredProducts = products.filter(function(product) {
    const nameMatches = product.name.toLowerCase().includes(searchText);
    const descriptionMatches = product.description.toLowerCase().includes(searchText);
    const categoryMatchesSearch = product.category.toLowerCase().includes(searchText);

    const matchesSearch = nameMatches || descriptionMatches || categoryMatchesSearch;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (selectedSort === "name-asc") {
    filteredProducts.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (selectedSort === "name-desc") {
    filteredProducts.sort(function(a, b) {
      return b.name.localeCompare(a.name);
    });
  } else if (selectedSort === "price-low") {
    filteredProducts.sort(function(a, b) {
      return a.price - b.price;
    });
  } else if (selectedSort === "price-high") {
    filteredProducts.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  return filteredProducts;
}

function rendereProdukte() {
  const filteredProducts = holeGefilterteProdukte();

  productGrid.innerHTML = "";

  resultsMessage.textContent = filteredProducts.length + " Buch/Bücher gefunden";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `<div class="empty-state">Keine Bücher passen zu deiner Suche oder deinem Filter.</div>`;
    return;
  }

  filteredProducts.forEach(function(product) {
    const fragment = productTemplate.content.cloneNode(true);

    const image = fragment.querySelector(".product-image");
    const category = fragment.querySelector(".product-category");
    const title = fragment.querySelector(".product-title");
    const description = fragment.querySelector(".product-description");
    const price = fragment.querySelector(".product-price");
    const button = fragment.querySelector(".add-to-cart-btn");

    image.src = product.image;
    image.alt = product.name;
    category.textContent = product.category;
    title.textContent = product.name;
    description.textContent = product.description;
    price.textContent = "€" + product.price.toFixed(2);

    button.addEventListener("click", function() {
      fuegeZumWarenkorbHinzu(product.id);

      successMessage.textContent = product.name + " wurde zum Warenkorb hinzugefügt.";

      setTimeout(function() {
        if (successMessage.textContent.includes("wurde zum Warenkorb hinzugefügt")) {
          successMessage.textContent = "";
        }
      }, 1500);
    });

    productGrid.appendChild(fragment);
  });
}

function berechneWarenkorbSummen() {
  let totalItems = 0;
  let subtotal = 0;

  cart.forEach(function(item) {
    totalItems = totalItems + item.quantity;
    subtotal = subtotal + (item.price * item.quantity);
  });

  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return {
    totalItems: totalItems,
    subtotal: subtotal,
    shipping: shipping,
    total: total
  };
}

function rendereWarenkorb() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-state">Dein Warenkorb ist leer.</div>`;
  } else {
    cart.forEach(function(item) {
      const fragment = cartItemTemplate.content.cloneNode(true);

      const title = fragment.querySelector(".cart-item-title");
      const price = fragment.querySelector(".cart-item-price");
      const quantity = fragment.querySelector(".cart-item-quantity");
      const increaseBtn = fragment.querySelector(".increase-btn");
      const decreaseBtn = fragment.querySelector(".decrease-btn");
      const removeBtn = fragment.querySelector(".remove-btn");

      title.textContent = item.name;
      price.textContent = "€" + item.price.toFixed(2) + " pro Stück";
      quantity.textContent = item.quantity;

      increaseBtn.addEventListener("click", function() {
        erhoeheMenge(item.id);
      });

      decreaseBtn.addEventListener("click", function() {
        verringereMenge(item.id);
      });

      removeBtn.addEventListener("click", function() {
        entferneAusWarenkorb(item.id);
      });

      cartItems.appendChild(fragment);
    });
  }

  const totals = berechneWarenkorbSummen();

  cartCount.textContent = totals.totalItems;
  cartTotal.textContent = "€" + totals.total.toFixed(2);
  subtotalAmount.textContent = "€" + totals.subtotal.toFixed(2);
  shippingAmount.textContent = "€" + totals.shipping.toFixed(2);
  finalTotal.textContent = "€" + totals.total.toFixed(2);
}

function validiereFormular() {
  let isValid = true;

  nameError.textContent = "";
  emailError.textContent = "";
  addressError.textContent = "";
  successMessage.textContent = "";

  if (fullName.value.trim() === "") {
    nameError.textContent = "Bitte gib deinen vollständigen Namen ein.";
    isValid = false;
  }

  if (email.value.trim() === "") {
    emailError.textContent = "Bitte gib deine E-Mail-Adresse ein.";
    isValid = false;
  } else if (email.value.includes("@") === false || email.value.includes(".") === false) {
    emailError.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
    isValid = false;
  }

  if (address.value.trim() === "") {
    addressError.textContent = "Bitte gib deine Lieferadresse ein.";
    isValid = false;
  }

  if (cart.length === 0) {
    successMessage.textContent = "Dein Warenkorb ist leer.";
    isValid = false;
  }

  return isValid;
}

checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const formularIstGueltig = validiereFormular();

  if (formularIstGueltig) {
    successMessage.textContent = "Bestellung erfolgreich aufgegeben!";
    checkoutForm.reset();
    leereWarenkorb();
  }
});

searchInput.addEventListener("input", rendereProdukte);
categoryFilter.addEventListener("change", rendereProdukte);
sortSelect.addEventListener("change", rendereProdukte);

clearCartBtn.addEventListener("click", leereWarenkorb);

fuelleKategorien();
rendereProdukte();
rendereWarenkorb();