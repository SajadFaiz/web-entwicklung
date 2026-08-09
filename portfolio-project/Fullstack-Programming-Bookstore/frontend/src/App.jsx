import React, { useEffect, useMemo, useState } from "react";
import { products as fallbackProducts } from "./data/products";
import { getProducts, createOrder } from "./services/api";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import CheckoutPanel from "./components/CheckoutPanel";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [cart, setCart] = useState(function () {
    try {
      const storedCart = localStorage.getItem("shoppingCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      localStorage.removeItem("shoppingCart");
      return [];
    }
  });

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(function () {
    async function loadProducts() {
      try {
        setProductsLoading(true);
        const loadedProducts = await getProducts();
        setProducts(loadedProducts);
        setProductsError("");
      } catch (error) {
        setProducts(fallbackProducts);
        setProductsError("Backend nicht erreichbar. Es werden lokale Beispieldaten angezeigt.");
      } finally {
        setProductsLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(function () {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(function () {
    return [...new Set(products.map(function (product) {
      return product.category;
    }))];
  }, [products]);

  function findProductById(productId) {
    return products.find(function (product) {
      return product.id === productId;
    });
  }

  function findCartItemById(productId) {
    return cart.find(function (item) {
      return item.id === productId;
    });
  }

  function addToCart(productId) {
    const existingItem = findCartItemById(productId);

    if (existingItem) {
      const updatedCart = cart.map(function (item) {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      const product = findProductById(productId);

      if (product) {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };

        setCart([...cart, newItem]);
      }
    }

    const product = findProductById(productId);

    if (product) {
      setSuccessMessage(product.name + " wurde zum Warenkorb hinzugefügt.");

      setTimeout(function () {
        setSuccessMessage(function (previousMessage) {
          if (previousMessage.includes("wurde zum Warenkorb hinzugefügt")) {
            return "";
          }

          return previousMessage;
        });
      }, 1500);
    }
  }

  function increaseQuantity(productId) {
    const updatedCart = cart.map(function (item) {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(productId) {
    const item = findCartItemById(productId);

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(function (item) {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    });

    setCart(updatedCart);
  }

  function removeFromCart(productId) {
    const updatedCart = cart.filter(function (item) {
      return item.id !== productId;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  const filteredProducts = useMemo(function () {
    const normalizedSearchText = searchText.trim().toLowerCase();

    let filteredProductList = products.filter(function (product) {
      const nameMatches = product.name.toLowerCase().includes(normalizedSearchText);
      const descriptionMatches = product.description.toLowerCase().includes(normalizedSearchText);
      const categoryMatchesSearch = product.category.toLowerCase().includes(normalizedSearchText);

      const matchesSearch = nameMatches || descriptionMatches || categoryMatchesSearch;
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (selectedSort === "name-asc") {
      filteredProductList.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else if (selectedSort === "name-desc") {
      filteredProductList.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === "price-low") {
      filteredProductList.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (selectedSort === "price-high") {
      filteredProductList.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    return filteredProductList;
  }, [products, searchText, selectedCategory, selectedSort]);

  const totals = useMemo(function () {
    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(function (item) {
      totalItems = totalItems + item.quantity;
      subtotal = subtotal + item.price * item.quantity;
    });

    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    return {
      totalItems: totalItems,
      subtotal: subtotal,
      shipping: shipping,
      total: total
    };
  }, [cart]);

  function validateForm() {
    let isValid = true;

    setNameError("");
    setEmailError("");
    setAddressError("");
    setSuccessMessage("");

    if (fullName.trim() === "") {
      setNameError("Bitte gib deinen vollständigen Namen ein.");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Bitte gib deine E-Mail-Adresse ein.");
      isValid = false;
    } else if (email.includes("@") === false || email.includes(".") === false) {
      setEmailError("Bitte gib eine gültige E-Mail-Adresse ein.");
      isValid = false;
    }

    if (address.trim() === "") {
      setAddressError("Bitte gib deine Lieferadresse ein.");
      isValid = false;
    }

    if (cart.length === 0) {
      setSuccessMessage("Dein Warenkorb ist leer.");
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        const order = await createOrder({
          customer: {
            fullName: fullName,
            email: email,
            address: address
          },
          items: cart.map(function (item) {
            return {
              productId: item.id,
              quantity: item.quantity
            };
          })
        });

        setSuccessMessage(
          "Bestellung erfolgreich aufgegeben! Bestellnummer: " + order.orderNumber
        );
        setFullName("");
        setEmail("");
        setAddress("");
        clearCart();
      } catch (error) {
        setSuccessMessage(error.message || "Bestellung konnte nicht gespeichert werden.");
      }
    }
  }

  return (
    <div className="store-container">
      <Header totalItems={totals.totalItems} total={totals.total} />

      <Toolbar
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        categories={categories}
      />

      <main className="store-layout">
        <ProductGrid
          filteredProducts={filteredProducts}
          addToCart={addToCart}
          productsLoading={productsLoading}
          productsError={productsError}
        />

        <aside className="sidebar">
          <CartPanel
            cart={cart}
            totals={totals}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />

          <CheckoutPanel
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            nameError={nameError}
            emailError={emailError}
            addressError={addressError}
            successMessage={successMessage}
            handleSubmit={handleSubmit}
          />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default App;
