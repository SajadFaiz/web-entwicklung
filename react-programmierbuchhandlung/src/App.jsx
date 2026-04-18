import React, { useEffect, useMemo, useState } from "react";
import { products } from "./data/products";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import CheckoutPanel from "./components/CheckoutPanel";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState(function () {
  try {
    const gespeicherterWarenkorb = localStorage.getItem("shoppingCart");
    return gespeicherterWarenkorb ? JSON.parse(gespeicherterWarenkorb) : [];
  } catch (fehler) {
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
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(function () {
    return [...new Set(products.map(function (product) {
      return product.category;
    }))];
  }, []);

  function findeProduktNachId(productId) {
    return products.find(function (product) {
      return product.id === productId;
    });
  }

  function findeWarenkorbArtikelNachId(productId) {
    return cart.find(function (item) {
      return item.id === productId;
    });
  }

  function fuegeZumWarenkorbHinzu(productId) {
    const vorhandenerArtikel = findeWarenkorbArtikelNachId(productId);

    if (vorhandenerArtikel) {
      const aktualisierterWarenkorb = cart.map(function (item) {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });

      setCart(aktualisierterWarenkorb);
    } else {
      const product = findeProduktNachId(productId);

      if (product) {
        const neuerArtikel = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };

        setCart([...cart, neuerArtikel]);
      }
    }

    const product = findeProduktNachId(productId);

    if (product) {
      setSuccessMessage(product.name + " wurde zum Warenkorb hinzugefügt.");

      setTimeout(function () {
        setSuccessMessage(function (vorherigeNachricht) {
          if (vorherigeNachricht.includes("wurde zum Warenkorb hinzugefügt")) {
            return "";
          }

          return vorherigeNachricht;
        });
      }, 1500);
    }
  }

  function erhoeheMenge(productId) {
    const aktualisierterWarenkorb = cart.map(function (item) {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    setCart(aktualisierterWarenkorb);
  }

  function verringereMenge(productId) {
    const artikel = findeWarenkorbArtikelNachId(productId);

    if (!artikel) {
      return;
    }

    if (artikel.quantity <= 1) {
      entferneAusWarenkorb(productId);
      return;
    }

    const aktualisierterWarenkorb = cart.map(function (item) {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    });

    setCart(aktualisierterWarenkorb);
  }

  function entferneAusWarenkorb(productId) {
    const aktualisierterWarenkorb = cart.filter(function (item) {
      return item.id !== productId;
    });

    setCart(aktualisierterWarenkorb);
  }

  function leereWarenkorb() {
    setCart([]);
  }

  const filteredProducts = useMemo(function () {
    const suchtextKlein = searchText.trim().toLowerCase();

    let gefilterteProdukte = products.filter(function (product) {
      const nameMatches = product.name.toLowerCase().includes(suchtextKlein);
      const descriptionMatches = product.description.toLowerCase().includes(suchtextKlein);
      const categoryMatchesSearch = product.category.toLowerCase().includes(suchtextKlein);

      const matchesSearch = nameMatches || descriptionMatches || categoryMatchesSearch;
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (selectedSort === "name-asc") {
      gefilterteProdukte.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else if (selectedSort === "name-desc") {
      gefilterteProdukte.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === "price-low") {
      gefilterteProdukte.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (selectedSort === "price-high") {
      gefilterteProdukte.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    return gefilterteProdukte;
  }, [searchText, selectedCategory, selectedSort]);

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

  function validiereFormular() {
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

  function handleSubmit(event) {
    event.preventDefault();

    const formularIstGueltig = validiereFormular();

    if (formularIstGueltig) {
      setSuccessMessage("Bestellung erfolgreich aufgegeben!");
      setFullName("");
      setEmail("");
      setAddress("");
      leereWarenkorb();
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
          fuegeZumWarenkorbHinzu={fuegeZumWarenkorbHinzu}
        />

        <aside className="sidebar">
          <CartPanel
            cart={cart}
            totals={totals}
            erhoeheMenge={erhoeheMenge}
            verringereMenge={verringereMenge}
            entferneAusWarenkorb={entferneAusWarenkorb}
            leereWarenkorb={leereWarenkorb}
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
