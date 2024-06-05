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
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
const categories = ["Clothing", "Accessories", "Footwear", "Outerwear"];

const ProductList = () => {
  const [products, setProducts] = useState([])
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

  const handleSearchModel = async () => {
    const genderValue = gender === 'male' ? 0.68 : 0.32;
    const categoryMap = {
      'Clothing': 0.42,
      'Accessories': 0.30,
      'Footwear': 0.2,
      'Outerwear': 0.08
    };
    const categoryValue = categoryMap[category] || 0;

    try {
      const response = await fetch('http://localhost:8000/suggest/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          "Age": age,
          "Gender": genderValue,
          "Category": categoryValue,
          "PurchaseAmount": price
        }])
      });
  
      if (response.ok) {
        const data = await response.json();
        const itemPurchased = data.map(item => item.ItemPurchased);

        console.log(itemPurchased);
        // Fetch product details based on ItemPurchased values
        const productDetails = await fetchProductDetails(itemPurchased);
        return productDetails;
      } else {
        throw new Error('Error making POST request');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  async function fetchProductDetails(itemPurchased) {
    try {
      const response = await fetch(`http://localhost:3001/products/recommended?type=${itemPurchased.join(',')}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecommendedProducts(data)
      } else {
        throw new Error('Error fetching product details');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
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
                src={"http://localhost:3001" + product.image}
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
                  src={"http://localhost:3001" + product.image}
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
