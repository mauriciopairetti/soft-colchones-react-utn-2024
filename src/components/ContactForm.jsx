// src/components/ContactForm.jsx
import React from "react";

import "../styles/ContactForm.css"; // Importar estilos

const ContactForm = () => {
  return (
    <form action="https://formsubmit.co/mauricio.pairetti@gmail.com" method="POST" className="contact-form">
      <div className="form-group">
        <input type="text" name="name" required placeholder="Tu nombre" className="input-field" />
      </div>
      <div className="form-group">
        <input type="email" name="email" required placeholder="Tu correo" className="input-field" />
      </div>
      <div className="form-group">
        <textarea name="message" required placeholder="Tu mensaje" className="input-field textarea-field"></textarea>
      </div>
      <button type="submit" className="submit-btn">Enviar</button>
    </form>
  );
};

export default ContactForm;

