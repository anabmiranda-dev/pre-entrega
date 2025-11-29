import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import '../src/App.css';
import Boton from "./Boton";

const API_BASE = "https://692780c0b35b4ffc50122769.mockapi.io/api/v1";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CarritoContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        requestAnimationFrame(() => setVisible(true));
      });
  }, [id]);

  if (loading) {
    return (
      <div className="productDetail-loading">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className={`productDetail fade-in ${visible ? "visible" : ""}`}>
      <p className="productDetail-category">{product.category}</p>
      <img className="img-detail" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <h6 className="product-description">{product.description}</h6>
      <h3><strong>${product.price}</strong></h3>

      <Boton texto="Add to cart" onClick={() => addToCart(product)} />
    </div>
  );
}

export default ProductDetail;
