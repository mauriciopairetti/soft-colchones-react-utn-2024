// src/services/product.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const productsCollectionRef = collection(db, "products");

// Obtener productos
export const getProducts = async () => {
  const data = await getDocs(productsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Agregar producto
export const addProduct = async (product) => {
  await addDoc(productsCollectionRef, product);
};

// Actualizar producto
export const updateProduct = async (id, updatedProduct) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedProduct);
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};
