import React from "react";
function ProductGrid({ filteredProducts, addToCart, productsLoading, productsError }) {
  return (
    <section>
      <div className="section-heading">
        <h2>Bücher</h2>
        <p id="resultsMessage" className="results-message">
          {filteredProducts.length} Buch/Bücher gefunden
        </p>
      </div>

      {productsError && <p className="error-message">{productsError}</p>}

      <div id="productGrid" className="product-grid">
        {productsLoading ? (
          <div className="empty-state">Bücher werden geladen...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            Keine Bücher passen zu deiner Suche oder deinem Filter.
          </div>
        ) : (
          filteredProducts.map(function (product) {
            return (
              <article key={product.id} className="product-card">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-body">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">€{product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={function () {
                      addToCart(product.id);
                    }}
                  >
                    In den Warenkorb
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
