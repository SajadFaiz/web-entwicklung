import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/toolbar.css";
import "./styles/layout.css";
import "./styles/products.css";
import "./styles/cart.css";
import "./styles/checkout.css";
import "./styles/footer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
