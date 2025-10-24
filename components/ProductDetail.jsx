import React, { useEffect, useState } from "react";
import Boton from "./Boton";
import '../src/App.css';
import { useParams } from "react-router-dom";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = products.find(p => p.id === String(id));
      setProduct(found);
      setLoading(false);

      requestAnimationFrame(() => {
        setVisible(true);
      });

    }, 1200);
    return () => clearTimeout(timer);
  }, [id, products]);

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
      <h3><strong>Price: ${product.price}</strong></h3>
      <h5>Stock: {product.stock}</h5>
      <Boton texto="Add to cart" onClick={() => addToCart(product)} />
    </div>
  );
}

export default ProductDetail;