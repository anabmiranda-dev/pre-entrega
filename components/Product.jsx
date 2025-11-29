import React, { useEffect, useState, useContext } from "react";
import '../src/App.css';
import Boton from "./Boton";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { CarritoContext } from "../context/CarritoContext";
import productList from "../src/assets/product-list.png";



function Product({ products, loading, alertMessage, category, setCategory, sortOrder, setSortOrder }) {
  const { addToCart } = useContext(CarritoContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="spinner-container fade-in visible">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={`container fade-in ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginTop: "50px" }}>

      <h2 style={{ color: "#F87C63" }}>Products</h2>

      <img
        src={productList}
        alt="Product List"
      />

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

        <label>
          Sort by price:
          <select className="custom-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Low to high</option>
            <option value="desc">High to Low</option>
          </select>
        </label>

      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card fade-in visible">
            <p className="product-category">{item.category}</p>
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>${item.price}</strong></p>

            <div>
              <Link className="product-view-detail" to={`/product/${item.id}`}>
                <Search size={24} style={{ marginBottom: "10px", color: "#6c757d" }} />
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
