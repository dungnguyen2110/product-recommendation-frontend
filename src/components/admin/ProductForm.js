import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Edit, Close, CloudUpload  } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductForm = ({ selectedProduct, onSaveProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
      setImage(selectedProduct.image);
      setSize(selectedProduct.size);
      setColor(selectedProduct.color);
      setMaterial(selectedProduct.material);
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setSize("");
      setColor("");
      setMaterial("");
    }
  }, [selectedProduct]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: selectedProduct ? selectedProduct.id : Date.now(),
      name,
      price: parseFloat(price),
      description,
      image,
      size,
      color,
      material,
    };
    onSaveProduct(formData);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {selectedProduct ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            {image ? (
              <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                <img src={image} alt="Product" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                <IconButton onClick={() => setImage("")} size="small">
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <IconButton component="span" size="large" color="primary">
                    <CloudUpload fontSize="large" />
                  </IconButton>
                  <Typography variant="body4" color="textSecondary">Upload Image</Typography>
                </label>
              </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
            {selectedProduct ? "Save" : "Add"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProductForm;
