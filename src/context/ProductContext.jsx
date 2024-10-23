// // src/context/ProductContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/product";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   // Cargar productos desde Firebase al montar el componente
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsData = await getProducts();
//       setProducts(productsData);
//     };
//     fetchProducts();
//   }, []);

//   const addNewProduct = async (product) => {
//     await addProduct(product);
//     setProducts([...products, product]);
//   };

//   const modifyProduct = async (id, updatedProduct) => {
//     await updateProduct(id, updatedProduct);
//     setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
//   };

//   const removeProduct = async (id) => {
//     await deleteProduct(id);
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   return (
//     <ProductContext.Provider value={{ products, addNewProduct, modifyProduct, removeProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };








import { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase"; // Asegúrate de importar correctamente la configuración de Firebase

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Obtener productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  // Agregar un nuevo producto
  const addNewProduct = async (newProduct) => {
    const productsCollection = collection(db, "products");
    await addDoc(productsCollection, newProduct);
    setProducts([...products, newProduct]);  // Agregar nuevo producto al estado local
  };

  // Modificar producto
  const modifyProduct = async (id, updatedProduct) => {
    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, updatedProduct);

      // Actualiza el estado local para reflejar el cambio
      setProducts(products.map(product => product.id === id ? { ...product, ...updatedProduct } : product));

      console.log("Producto actualizado en Firebase:", updatedProduct);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };


  // Eliminar producto
  const removeProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    setProducts(products.filter(product => product.id !== id));
  };
  // Función para agregar producto al carrito
  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Producto agregado al carrito:", product);
  };

  // Función para simular la compra inmediata
  const buyNow = (product) => {
    console.log("Producto comprado:", product);
    // Aquí puedes manejar la lógica de la compra (por ejemplo, redirigir al checkout o procesar la compra)
  };
  return (
    <ProductContext.Provider value={{ products, addToCart, buyNow, addNewProduct, modifyProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
