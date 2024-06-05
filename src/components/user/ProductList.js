import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import ProductModal from "./ProductModal";

const categories = ["All", "Shoe", "Laptop", "Clothing", "Accessories"];
const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 50,
    description: "Comfortable and lightweight running shoes.",
    sold: 100,
    size: "10",
    color: "Black",
    material: "Synthetic",
    category: "Shoe",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Gaming Laptop",
    price: 1500,
    description: "High performance laptop for gaming.",
    sold: 50,
    size: "15 inch",
    color: "Gray",
    material: "Aluminum",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Summer T-shirt",
    price: 20,
    description: "Cool and comfortable cotton T-shirt.",
    sold: 200,
    size: "L",
    color: "Blue",
    material: "Cotton",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 40,
    description: "Genuine leather wallet with multiple card slots.",
    sold: 150,
    size: "One size",
    color: "Brown",
    material: "Leather",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // Add more products as needed
];

const ProductList = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tab, setTab] = useState("All");

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSearchModel = () => {
    const a = products.filter((product) => product.category === "Accessories");
    setRecommendedProducts(a)
  }



  const displayedProducts =
    tab === "All" ? products : products.filter((product) => product.category === tab);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Recommended products</h2>
      <div style={{ display: "flex",marginBottom: "20px" }}>
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          select
          variant="outlined"
          style={{ width: "200px",marginRight: "10px" }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          select
          variant="outlined"
          style={{ width: "200px",marginRight: "10px" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={() => handleSearchModel()}>
          Search by KNN
        </Button>
      </div>
      <Grid container spacing={3}>
        {recommendedProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <CardContent style={{ flexGrow: 1 }}>
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

      <h2 style={{ marginBottom: "20px", marginTop: "40px" }}>Our products</h2>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: "20px" }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>
      <Box style={{ paddingTop: "20px" }}>
        <Grid container spacing={3}>
          {displayedProducts.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
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
      </Box>
      <ProductModal
        showModal={showModal}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
