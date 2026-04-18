import React from "react";
function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h3>Programmierbuchhandlung</h3>
          <p>
            Dein Ort, um die besten Programmierbücher für Web-, Software- und App-Entwicklung zu finden.
          </p>
        </div>

        <div className="footer-section">
          <h3>Schnellzugriffe</h3>
          <ul>
            <li><a href="#">Startseite</a></li>
            <li><a href="#">Bücher</a></li>
            <li><a href="#">Warenkorb</a></li>
            <li><a href="#">Kasse</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>E-Mail: support@programmingbookstore.com</p>
          <p>Telefon: +1 234 567 890</p>
        </div>

        <div className="footer-section">
          <h3>Folge uns</h3>
          <p>
            <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Programmierbuchhandlung. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

export default Footer;
