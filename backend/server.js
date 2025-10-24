import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Datos simulados
import fs from "fs";

// Cargar datos desde db.json
let db = JSON.parse(fs.readFileSync("./db.json", "utf8"));
let products = db.products;
let cart = db.cart;

// Obtener lista de productos
app.get("/products", (req, res) => {
  res.json(products);
});

// Obtener carrito actual
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Agregar producto al carrito
app.post("/cart", (req, res) => {
  const product = req.body;

  // Buscar si ya existe
  const existing = cart.find((p) => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.status(201).json({ message: "Item added to your cart", cart });
});

// Vaciar carrito (eliminar todos los productos)
app.delete("/cart", (req, res) => {
  cart = []; // borra el contenido en memoria
  res.json({ message: "All items removed from your cart", cart });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
