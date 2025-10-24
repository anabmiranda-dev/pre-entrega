import React, { useState, useEffect } from 'react';

import Product from '/components/Product';
import Cart from '/components/Cart';
import ProductDetail from '/components/ProductDetail';
import About from '/components/About';
import Home from '/components/Home';
import Nav from '/components/Nav';
import Contact from '/components/Contact';
import Footer from '/components/Footer';
import AlertMessage from '../components/AlertMessage';

import "./App.css"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products");
        if (!res.ok) throw new Error("Error cargando productos");
        const data = await res.json();
        setTimeout(() => {
          setAllProducts(data);
          setProducts(data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
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

    filtered.sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      else return b.price - a.price;
    });

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

    fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }).catch(err => console.error(err));

    setAlertMessage(`${product.name} added to cart!`);
    setTimeout(() => setAlertMessage(""), 2500);
  };

  const clearCart = () => {
    setCart([]);
    fetch("http://localhost:4000/cart", { method: "DELETE" })
      .catch(err => console.error(err));
  };

  return (
    <Router>
      <Nav />
      <AlertMessage message={alertMessage} />
      <div id="root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={
            <Product
              products={products}
              addToCart={addToCart}
              alertMessage={alertMessage}
              category={category}
              setCategory={setCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetail
              products={products}
              addToCart={addToCart}
              alertMessage={alertMessage}
            />
          } />
          <Route path="/cart" element={<Cart cart={cart} clearCart={clearCart} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
