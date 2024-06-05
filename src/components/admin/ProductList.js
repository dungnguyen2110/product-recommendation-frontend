import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ProductForm from "./ProductForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductList = ({ products, onSaveProduct, onDeleteProduct }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  const handleSaveProduct = (productData) => {
    onSaveProduct(productData);
    handleClose();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Create
      </Button>
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
              <TableCell>Image</TableCell> {/* Thêm cột hình ảnh */}
              <TableCell>Actions</TableCell>
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
                <TableCell>
                  {product.image ? 
                    <img src={"http://localhost:3001" + product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100px"}} />
                    : "none"  
                  } 
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDeleteProduct(product.productID)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ProductForm
            selectedProduct={selectedProduct}
            onSaveProduct={handleSaveProduct}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
