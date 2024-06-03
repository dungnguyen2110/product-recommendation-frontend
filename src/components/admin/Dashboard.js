import React, { useState } from "react";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import ManageOrder from "./ManageOrder";
import { AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";

const AdminDashboard = () => {
  const productsFake = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      description: "Description of product 1",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "M",
      color: "Red",
      material: "Cotton",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      description: "Description of product 2",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "L",
      color: "Blue",
      material: "Polyester",
    },
    {
      id: 3,
      name: "Product 3",
      price: 15,
      description: "Description of product 3",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "S",
      color: "Green",
      material: "Wool",
    },
  ];

  const [products, setProducts] = useState(productsFake);
  const [activeTab, setActiveTab] = useState("Manage Product");

  const handleSaveProduct = (productData) => {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((p) => p.id === productData.id);
      if (productIndex > -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[productIndex] = productData;
        return updatedProducts;
      }
      return [...prevProducts, productData];
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
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
      <main style={{ flexGrow: 1, padding: 24}}>
        <Toolbar />
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
