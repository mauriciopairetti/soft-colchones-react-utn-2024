import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

import "../styles/AdminProduct.css"; // Importar estilos

const AdminProduct = () => {
  const { products, addNewProduct, modifyProduct, removeProduct } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({ title: "", description: "", price: "", imageUrl: "" });
  const [editProduct, setEditProduct] = useState(null); // Para manejar el estado de edición

  // Añadir nuevo producto
  const handleAdd = async () => {
    await addNewProduct(newProduct);
    setNewProduct({ title: "", description: "", price: "", imageUrl: "" });
  };

  // Manejar la edición del producto
  const handleEdit = (product) => {
    setEditProduct(product); // Cargar los datos del producto en los campos
    setNewProduct({ title: product.title, description: product.description, price: product.price, imageUrl: product.imageUrl });
  };

  // Confirmar la actualización del producto
  const handleUpdate = async () => {
    if (editProduct) {
      await modifyProduct(editProduct.id, newProduct);  // Llama a la función de modificar con el ID y los nuevos datos
      setEditProduct(null);
      setNewProduct({ title: "", description: "", price: "", imageUrl: "" });
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    await removeProduct(id);
  };

  return (
    <div className="admin-product">
      <h1>Administrar Productos</h1>
      <input
        type="text"
        placeholder="Título del producto"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <textarea
        placeholder="Descripción del producto"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      ></textarea>
      <input
        type="number"
        placeholder="Precio del producto"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={newProduct.imageUrl}
        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
      />
      {editProduct ? (
        <button onClick={handleUpdate}>Actualizar Producto</button>
      ) : (
        <button onClick={handleAdd}>Agregar Producto</button>
      )}

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.imageUrl && <img src={product.imageUrl} alt={product.title} />}
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="price">Precio: ${product.price}</p>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>
                  Modificar
                </button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminProduct;
