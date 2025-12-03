import React, { useState } from "react";

function AdminProducts({ onAgregarProducto }) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregarProducto(product);
        setProduct({
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
            stock: ""
        });
    }
    return (
        <form onSubmit={handleSubmit} className="admin-product-form">
            <h2>Add New Product</h2>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={product.image}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AdminProducts;