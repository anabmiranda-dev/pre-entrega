import React, { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Zap } from "lucide-react";
import Boton from "./Boton";
import '../src/App.css';

function Cart() {

  const { cart, loadCart, clearCart } = useContext(CarritoContext);

  {/*
  const [cart, setCart] = useState([]);
  */
  }

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/cart")
      .then(res => res.json())
      .then(data => loadCart(data))
      .catch(err => console.error("There was an error loading your cart:", err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [cart]);


  {/*
  const clearCart = () => {
    fetch("http://localhost:4000/cart", { method: "DELETE" })
      .then(res => res.json())
      .then(() => setCart([]))
      .catch(err => console.error("There was an error clearing your cart:", err));
  };

      */
  }

  const total = cart.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);


  if (loading) {
    return (
      <div className="cart-loading">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className={`shopping-cart fade-in ${visible ? "visible" : ""}`}>
      <img
        src="/src/assets/shopping-cart.png"
        alt="Shopping Cart"
        className="cart-header-img"
      />

      {cart.length === 0 ? (
        <div className="empty-cart">
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
              <div key={p.id} className="cart-item">
                <img src={p.image} alt={p.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{p.name}</h4>
                  <p>{p.quantity} x ${p.price.toFixed(2)}</p>
                  <p className="subtotal">
                    Subtotal: ${(p.quantity * p.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
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
