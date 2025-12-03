import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import '../src/App.css';
import Boton from "./Boton";

const API_BASE = "https://692780c0b35b4ffc50122769.mockapi.io/api/v1";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CarritoContext);
  const { role } = useAuthContext();

  const isNew = id === "new";

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: ""
  });

  const [loading, setLoading] = useState(!isNew);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isNew) return;

    setLoading(true);
    fetch(`${API_BASE}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        requestAnimationFrame(() => setVisible(true));
      });

  }, [id, isNew]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      alert("Producto creado exitosamente");
      navigate("/admin/products");  
    } else {
      alert("Error al crear producto");
    }
  };

  if (!isNew && loading) {
    return (
      <div className="productDetail-loading">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }


  if (role === "admin" && isNew) {
    return (
      <div className="productDetail form-mode">

        <h2 style={{ color:"#F87C63" }}>Create new product</h2>

        <form onSubmit={handleCreateProduct} className="create-form">

          <input
            type="text"
            placeholder="Product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            required
          />

          <button type="submit" className="btn-primary">
            Create Product
          </button>
        </form>
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
