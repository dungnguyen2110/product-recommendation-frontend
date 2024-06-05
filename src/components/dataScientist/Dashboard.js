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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const categories = ["Clothing", "Accessories", "Footwear", "Outerwear"];

const ProductList = () => {
  const [products, setProducts] = useState([]);
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
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchModel = async () => {
    const genderValue = gender === "male" ? 0.68 : 0.32;
    const categoryMap = {
      Clothing: 0.42,
      Accessories: 0.3,
      Footwear: 0.2,
      Outerwear: 0.08,
    };
    const categoryValue = categoryMap[category] || 0;

    try {
      const response = await fetch("http://localhost:8000/suggest/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            Age: age,
            Gender: genderValue,
            Category: categoryValue,
            PurchaseAmount: price,
          },
        ]),
      });

      if (response.ok) {
        const data = await response.json();
        const itemPurchased = data.map((item) => item.ItemPurchased);

        console.log(itemPurchased);
        // Fetch product details based on ItemPurchased values
        const productDetails = await fetchProductDetails(itemPurchased);
        return productDetails;
      } else {
        throw new Error("Error making POST request");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  async function fetchProductDetails(itemPurchased) {
    try {
      const response = await fetch(
        `http://localhost:3001/products/recommended?type=${itemPurchased.join(
          ","
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecommendedProducts(data);
      } else {
        throw new Error("Error fetching product details");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const displayedProducts =
    tab === "All"
      ? products
      : products.filter((product) => product.category === tab);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All products</h2>

      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Material</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productID}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.material}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2 style={{ marginBottom: "20px" }}>Recommended products</h2>
      <div style={{ display: "flex", marginBottom: "20px" }}>
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
          style={{ width: "200px", marginRight: "10px" }}
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
          style={{ width: "200px", marginRight: "10px" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearchModel()}
        >
          Search by KNN
        </Button>
      </div>
      <Grid container spacing={3}>
        {recommendedProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
