import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import ManageOrder from "./ManageOrder";
import { AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Manage Product");

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (productData) => {
    try {
      let imageUrl = productData.image;

      // Nếu có file ảnh mới, thực hiện upload
      if (productData.file) {
        const formData = new FormData();
        formData.append("file", productData.file);

        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          imageUrl = data.url;
        } else {
          console.error("Error uploading image:", response.statusText);
          return;
        }
      }

      const { file, ...restOfProductData } = productData;
      const updatedProductData = {
        ...restOfProductData,
        image: imageUrl,
      };

      console.log(productData);

      const url = productData.productID
        ? `http://localhost:3001/products/${productData.productID}`
        : "http://localhost:3001/products";
      const method = productData.productID ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts((prevProducts) => {
          console.log(savedProduct);
          const productIndex = prevProducts.findIndex((p) => p.productID === savedProduct.newProduct.productID);
          console.log(productIndex);
          if (productIndex > -1) {
            const updatedProducts = [...prevProducts];
            updatedProducts[productIndex] = savedProduct.newProduct;
            console.log(updatedProducts);
            return updatedProducts;
          }
          console.log([...prevProducts, savedProduct.newProduct]);
          return [...prevProducts, savedProduct.newProduct];
        });
      } else {
        console.error("Error saving product:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (productID) => {
    console.log(productID);
    try {
      const response = await fetch(`http://localhost:3001/products/${productID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.productID !== productID));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderContent = () => {
    if (activeTab === "Manage Product") {
      return (
        <ProductList
          products={products}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      );
    }
    return <ManageOrder />;
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flexGrow: 1, padding: 24 }}>
        <Toolbar />
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
