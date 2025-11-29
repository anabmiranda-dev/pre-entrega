import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CarritoContext } from "../context/CarritoContext";
import { AuthProvider } from '../context/AuthContext';

import Login from '/components/Login';
import Dashboard from '/components/Dashboard';
import ProtectedRoute from '/components/ProtectedRoute';
import Product from '/components/Product';
import Cart from '/components/Cart';
import ProductDetail from '/components/ProductDetail';
import About from '/components/About';
import Home from '/components/Home';
import Nav from '/components/Nav';
import Contact from '/components/Contact';
import Footer from '/components/Footer';
import AlertMessage from '/components/AlertMessage';


import "./App.css";


const API_BASE = "https://692780c0b35b4ffc50122769.mockapi.io/api/v1";

function App() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const { cartMessage } = useContext(CarritoContext);

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();

        setTimeout(() => {
          setAllProducts(data);
          setProducts(data);
          setLoading(false);
        }, 800);

      } catch (err) {
        console.error("Error cargando productos", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setProducts(filtered);
  }, [category, sortOrder, allProducts]);

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

    fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, quantity: 1 }),
    }).catch(console.error);

    setAlertMessage(`${product.name} added to cart!`);
    setTimeout(() => setAlertMessage(""), 2500);
  };

  const clearCart = () => {
    setCart([]);

    fetch(`${API_BASE}/cart`, { method: "DELETE" })
      .catch(console.error);
  };

  return (
    <AuthProvider>
      <Router>
        {cartMessage && (
          <div className="cart-toast fade-in visible">
            {cartMessage}
          </div>
        )}
        <Nav />
        <AlertMessage message={alertMessage} />

        <div id="root">

          <Routes>

            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route
              path="/products"
              element={
                <Product
                  products={products}
                  loading={loading}
                  alertMessage={alertMessage}
                  category={category}
                  setCategory={setCategory}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              }
            />

            <Route
              path="/product/:id"
              element={<ProductDetail products={products} addToCart={addToCart} />}
            />

            <Route path="/cart" element={<Cart cart={cart} clearCart={clearCart} />} />
          </Routes>

        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
