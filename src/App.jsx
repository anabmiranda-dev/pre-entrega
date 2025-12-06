import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import { CarritoProvider } from "../context/CarritoContext";
import { ProductsFilterProvider } from "../context/ProductsFilterContext";
import { ProductsProvider } from "../context/ProductsContext";

import Login from "/components/Login";
import Dashboard from "/components/Dashboard";
import ProtectedRoute from "/components/ProtectedRoute";
import AdminRoute from "/components/AdminRoute";
import AdminProducts from "/components/AdminProducts";
import Products from "/components/Products";
import Cart from "/components/Cart";
import ProductDetail from "/components/ProductDetail";
import About from "/components/About";
import Home from "/components/Home";
import Nav from "/components/Nav";
import Contact from "/components/Contact";
import Footer from "/components/Footer";
import AlertMessage from "/components/AlertMessage";

import "./App.css";

const API_BASE = "https://692780c0b35b4ffc50122769.mockapi.io/api/v1";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");


  // --- LOAD PRODUCTS ---
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

  // --- FILTER + SORT ---
  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // 🟦 Nuevo filtro por búsqueda de texto
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setProducts(filtered);
  }, [category, sortOrder, searchQuery, allProducts]);


  // --- CART ---
  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map((p) =>
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

    fetch(`${API_BASE}/cart`, { method: "DELETE" }).catch(console.error);
  };

  return (
    <AuthProvider>
      <CarritoProvider>
        <ProductsProvider>
          <ProductsFilterProvider>
            <Router>
              <Nav />

              <AlertMessage message={alertMessage} />

              <Routes>
                {/* ADMIN PRODUCTS */}
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />

                {/* PRODUCT DETAIL - view OR create */}
                <Route path="/product/new" element={
                  <ProtectedRoute adminOnly={true}>
                    <ProductDetail />
                  </ProtectedRoute>
                } />

                {/* PRODUCT DETAIL */}
                <Route
                path="/products/:id/details" 
                element={<ProductDetail products={products} addToCart={addToCart} />} />

                {/* USER PRODUCTS */}
                <Route
                  path="/products/"
                  element={
                    <Products
                      loading={loading}
                      category={category}
                      setCategory={setCategory}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      addToCart={addToCart}
                    />
                  }
                />

                {/* LOGIN */}
                <Route path="/login" element={<Login />} />

                {/*EDIT PRODUCT*/}
                <Route
                  path="/products/:id/edit"
                  element={
                    <AdminRoute>
                      <ProductDetail editMode={true} />
                    </AdminRoute>
                  }
                />

                {/* DASHBOARD */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* OTHERS */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* CART (solo logueado) */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart cart={cart} clearCart={clearCart} />
                    </ProtectedRoute>
                  }
                />

                {/* DEFAULT */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              <Footer />
            </Router>
          </ProductsFilterProvider>
        </ProductsProvider>
      </CarritoProvider>
    </AuthProvider >
  );
}

export default App;
