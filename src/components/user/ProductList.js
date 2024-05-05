import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      description: "Description of product 1",
      sold: 5,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      description: "Description of product 2",
      sold: 8,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Product 3",
      price: 20,
      description: "Description of product 3",
      sold: 8,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Product 4",
      price: 20,
      description: "Description of product 4",
      sold: 8,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20,
      description: "Description of product 5",
      sold: 8,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Product 6",
      price: 20,
      description: "Description of product 6",
      sold: 8,
      size: "M",
      color: "Red",
      material: "Cotton",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const product1 = products.slice(0, 3);
  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Recommended products</h2>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={6} sm={3} md={2}>
            <Card>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Sold: {product.sold}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => openModal(product)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <h2 className="mb-4">Other products</h2>
      <Grid container spacing={3}>
        {product1.map((product) => (
          <Grid key={product.id} item xs={6} sm={3} md={2}>
            <Card>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Sold: {product.sold}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => openModal(product)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ProductModal
        showModal={showModal}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
