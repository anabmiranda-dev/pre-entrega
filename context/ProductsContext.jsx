import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Trae los productos al iniciar
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://692780c0b35b4ffc50122769.mockapi.io/api/v1/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Actualizar un producto en la API y localmente
  const updateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(
        `https://692780c0b35b4ffc50122769.mockapi.io/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const savedProduct = await res.json();

      // Actualiza el estado local
      setProducts(prev =>
        prev.map(p => (p.id === id ? savedProduct : p))
      );

      return savedProduct;

    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(
        `https://692780c0b35b4ffc50122769.mockapi.io/api/v1/products/${id}`,
        {
          method: "DELETE"
        }
      );

      const deletedProduct = await res.json();

      // Eliminar del estado local
      setProducts(prev => prev.filter(p => p.id !== id));

      return deletedProduct;

    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
