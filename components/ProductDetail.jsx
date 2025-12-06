import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import Boton from "./Boton";
import { Edit } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { user, role, logout } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, fetchProducts } = useContext(ProductsContext);

  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  // Cargar valores cuando cambia el producto
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || ""
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    await updateProduct(Number(id), form);
    await fetchProducts(); // 👉 refresca toda la lista inmediatamente
    navigate("/products");
  };


  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <>
      <div className="container fade-in visible" style={{ marginTop: "50px", textAlign: "center" }}>
        {role === "user" && (
          <div className={`productDetail `}>
            <h2 style={{ color: "#F87C63" }}>Product detail</h2>
            <p className="productDetail-category">{product.category}</p>
            <img className="img-detail" src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <h6 className="product-description">{product.description}</h6>
            <h3><strong>Price: ${product.price}</strong></h3>
            <h5>Stock: {product.stock}</h5>
            <Boton text="Add to cart" onClick={() => addToCart(product)} />
          </div>
        )
        }

        {
          role === "admin" && (
            <>
              <h2 style={{ color: "#F87C63" }}>Edit Product</h2>

              <div className="product-edit-form">

                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="custom-input" />

                <label>Price</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="custom-input" />

                <label>Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} className="custom-input" />

                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="custom-input" />

                <label>Image URL</label>
                <img src={form.image} alt={form.name} className="product-image" />
                <input type="text" name="image" value={form.image} onChange={handleChange} className="custom-input" />
                
                <Boton to="/products" text="Save changes" className="edit-button" onClick={handleSave} />

                <Boton text="Cancel" to={"/products"} className="home-button"/>
              </div></>
          )
        }
      </div >
    </>
  );
}
