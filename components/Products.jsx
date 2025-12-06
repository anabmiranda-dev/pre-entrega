import React, { useEffect, useState, useContext } from "react";
import '../src/App.css';
import Boton from "./Boton";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Edit, Trash } from "lucide-react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

function Products({ loading, category, setCategory, sortOrder, setSortOrder, searchQuery, setSearchQuery
}) {
  const { products, deleteProduct } = useContext(ProductsContext);
  const { addToCart } = useContext(CarritoContext);
  const [visible, setVisible] = useState(false);
  const { user, role, logout } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!ok) return;

    await deleteProduct(id);
  };

  if (loading) {
    return (
      <div className="spinner-container fade-in visible">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={`products-list container fade-in ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginTop: "50px" }}>

      <h2 style={{ color: "#F87C63" }}>Products</h2>

      <div className="product-input" style={{ marginBottom: "20px" }}>

        <select className="custom-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all" disabled hidden>Select category</option>
          <option value="Merch">Merch</option>
          <option value="CDs">CD's</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Clothing">Clothing</option>
          <option value="Vinyl">Vinyl</option>
          <option value="Instruments">Instruments</option>
        </select>

        <select className="custom-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none" disabled hidden>Sort by price</option>
          <option value="asc">Low to high</option>
          <option value="desc">High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="custom-input"
        />


        {role === "admin" && (
          <Link to="/products/new" className="btn-new">
            <Boton text="+ Add new product" />
          </Link>
        )}
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card fade-in visible">
            {role === "admin" && (
              <Boton className="delete-btn" onClick={() => handleDelete(item.id)} text={"Delete"} icon={Trash}>
              </Boton>
            )}
            <p className="product-category">{item.category}</p>
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>${item.price}</strong></p>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

              {role === "user" && (
                <Link className="product-view-detail" to={`/products/${item.id}/details`}>
                  <Search size={24} style={{ marginBottom: "10px" }} />
                </Link>
              )}

              {role === "admin" && (
                <>
                  <Link to={`/products/${item.id}/edit`} className="btn-edit-admin">
                    <Edit size={24} style={{ marginBottom: "10px" }} />
                  </Link>
                </>
              )}

            </div>

            <Boton text="Add to cart" onClick={() => addToCart(item)} icon={ShoppingCart} />

          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;
