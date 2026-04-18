import React from "react";
function CartPanel({
  cart,
  totals,
  erhoeheMenge,
  verringereMenge,
  entferneAusWarenkorb,
  leereWarenkorb
}) {
  return (
    <section className="cart-panel">
      <div className="panel-header">
        <h2>Warenkorb</h2>
        <button
          id="clearCartBtn"
          className="secondary-btn"
          onClick={leereWarenkorb}
        >
          Warenkorb leeren
        </button>
      </div>

      <div id="cartItems" className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-state">Dein Warenkorb ist leer.</div>
        ) : (
          cart.map(function (item) {
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-price">
                    €{item.price.toFixed(2)} pro Stück
                  </p>
                </div>

                <div className="cart-controls">
                  <div className="quantity-box">
                    <button
                      className="qty-btn decrease-btn"
                      type="button"
                      onClick={function () {
                        verringereMenge(item.id);
                      }}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <button
                      className="qty-btn increase-btn"
                      type="button"
                      onClick={function () {
                        erhoeheMenge(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    type="button"
                    onClick={function () {
                      entferneAusWarenkorb(item.id);
                    }}
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="cart-totals">
        <div className="total-row">
          <span>Zwischensumme</span>
          <strong id="subtotalAmount">€{totals.subtotal.toFixed(2)}</strong>
        </div>
        <div className="total-row">
          <span>Versand</span>
          <strong id="shippingAmount">€{totals.shipping.toFixed(2)}</strong>
        </div>
        <div className="total-row grand-total">
          <span>Gesamt</span>
          <strong id="finalTotal">€{totals.total.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
}

export default CartPanel;
