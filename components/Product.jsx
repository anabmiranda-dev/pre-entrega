import React, { useEffect, useState } from "react";
import '../src/App.css';
import Boton from "./Boton";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";

function Product({ products, addToCart, alertMessage, category, setCategory, sortOrder, setSortOrder }) {

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [products]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={`product-container fade-in ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src="/src/assets/product-list.png"
        alt="Product list"
        className="cart-header-img"
      />
      {alertMessage && (
        <div style={{ position: "fixed", bottom: "80px", right: "20px", background: "#d9534f", color: "#fff", padding: "10px 20px", borderRadius: "5px", zIndex: 1000 }}>
          {alertMessage}
        </div>
      )}

      <div className="product-input" style={{ marginBottom: "20px" }}>
        <label>
          Category:
          <select className="custom-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="Merch">Merch</option>
            <option value="CDs">CD's</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Clothing">Clothing</option>
            <option value="Vinyl">Vinyl</option>
            <option value="Instruments">Instruments</option>
          </select>
        </label>

        <label style={{ margin: "15px" }}>
          Sort by price:
          <select className="custom-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Low to high</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <p className="product-category">{item.category}</p>
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>${item.price}</strong></p>
            <div>
              <Link className="product-view-detail" to={`/product/${item.id}`}>
                <Search size={24} style={{ margin: "0 0 10px 0", color: "#6c757d" }} />
              </Link>
            </div>
            <Boton texto="Add to cart" onClick={() => addToCart(item)} icon={ShoppingCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
