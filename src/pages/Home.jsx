// src/pages/Home.jsx
import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import { ProductContext } from "../context/ProductContext";

import "../styles/Home.css"; // Importar estilos

const Home = () => {
  const { products, addToCart, buyNow } = useContext(ProductContext);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Bienvenido a Nuestra Tienda</h1>
          <p>Encuentra los mejores productos a precios increíbles.</p>
          <button className="shop-now-btn">Compra Ahora</button>
        </div>
      </section>

      <section className="products-section">
        <h2>Nuestros Productos</h2>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              buyNow={buyNow}
            />
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contáctanos</h2>
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;
