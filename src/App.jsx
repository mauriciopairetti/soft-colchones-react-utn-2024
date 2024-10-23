// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminProduct from "./pages/AdminProduct";
import { ProductProvider } from "./context/ProductContext";
import "./styles/main.css";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-product" element={<AdminProduct />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
