import React from "react";
function CheckoutPanel({
  fullName,
  setFullName,
  email,
  setEmail,
  address,
  setAddress,
  nameError,
  emailError,
  addressError,
  successMessage,
  handleSubmit
}) {
  return (
    <section className="checkout-panel">
      <h2>Kasse</h2>

      <form id="checkoutForm" className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="fullName"
          placeholder="Vollständiger Name"
          value={fullName}
          onChange={function (event) {
            setFullName(event.target.value);
          }}
        />
        <p className="error-message" id="nameError">{nameError}</p>

        <input
          type="email"
          id="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={function (event) {
            setEmail(event.target.value);
          }}
        />
        <p className="error-message" id="emailError">{emailError}</p>

        <input
          type="text"
          id="address"
          placeholder="Lieferadresse"
          value={address}
          onChange={function (event) {
            setAddress(event.target.value);
          }}
        />
        <p className="error-message" id="addressError">{addressError}</p>

        <button type="submit" className="checkout-btn">
          Bestellung aufgeben
        </button>
      </form>

      <p id="successMessage" className="success-message">{successMessage}</p>
    </section>
  );
}

export default CheckoutPanel;
