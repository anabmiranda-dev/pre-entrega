import React, { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Zap } from "lucide-react";
import Boton from "./Boton";
import "../src/App.css";

function Cart() {
  const { cart, clearCart } = useContext(CarritoContext);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // Simula carga inicial (igual que Products)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []); // solo una vez

  const total = cart.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  if (loading) {
    return (
      <div className="cart-loading fade-in visible">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className={`shopping-cart container fade-in ${visible ? "visible" : ""}`}>
      
      <h2 style={{ color: "#F87C63" }}>Shopping cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart fade-in visible">
          <h2>Nothing in your cart yet</h2>
          <p>Browse our products and add something epic!</p>
          <a href="/products" className="home-button">
            Go to shopping <Zap size={18} />
          </a>
        </div>
      ) : (
        <>
          <div className="cart-items cart-container">
            {cart.map((p) => (
              <div key={p.id} className="cart-item fade-in visible">
                <img src={p.image} alt={p.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{p.name}</h4>
                  <p>{p.quantity} × ${p.price.toFixed(2)}</p>
                  <p className="subtotal">
                    Subtotal: ${(p.quantity * p.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary fade-in visible">
            <h3>Total: ${total.toFixed(2)}</h3>
            <div className="button-grid">
              <Boton texto="Clear Cart" onClick={clearCart} className="button-danger" />
              <Boton texto="Checkout" className="button" />
              <Boton texto="Continue shopping" className="button" to="/products" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
