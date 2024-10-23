// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  const sendWhatsAppMessage = () => {
    const whatsappLink = `https://wa.me/123456789?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.title)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.title} 
        style={{ width: "100%", height: "auto" }} 
      />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>$: <strong>{product.price}</strong></p>

      <button onClick={sendWhatsAppMessage}>Contactar por WhatsApp</button>
      
      <button>Agregar al Carrito</button>  {/* Botón para agregar al carrito */}
      <button>Comprar Ahora</button>  {/* Botón para comprar */}
    </div>
  );
};

export default ProductCard;
