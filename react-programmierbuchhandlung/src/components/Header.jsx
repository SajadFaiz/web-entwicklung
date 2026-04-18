import React from "react";
function Header({ totalItems, total }) {
  return (
    <header className="store-header">
      <div>
        <h1>Programmierbuchhandlung</h1>
        <p className="subtitle">
          Suche, filtere und sortiere Programmierbücher, lege sie in den Warenkorb und bestelle sie.
        </p>
      </div>

      <div className="cart-summary-card">
        <span>
          Artikel: <strong id="cartCount">{totalItems}</strong>
        </span>
        <span>
          Gesamt: <strong id="cartTotal">€{total.toFixed(2)}</strong>
        </span>
      </div>
    </header>
  );
}

export default Header;
