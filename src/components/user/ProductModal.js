import React from "react";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
const ProductModal = ({ showModal, closeModal, selectedProduct }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Thực hiện các logic thêm sản phẩm vào giỏ hàng
    // ...

    // Sau khi thêm vào giỏ hàng, chuyển hướng đến trang giỏ hàng
    navigate('/cart');
  };
  if (!selectedProduct) return null;
  
  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "300px",
            backgroundImage: `url(${selectedProduct.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0)",
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "white",
              zIndex: 1,
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            {selectedProduct.name}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {selectedProduct.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Price: ${selectedProduct.price}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sold: {selectedProduct.sold}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Detailed Features:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>Size: {selectedProduct.size}</li>
            <li>Color: {selectedProduct.color}</li>
            <li>Material: {selectedProduct.material}</li>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", padding: "16px" }}>
          <Button onClick={closeModal} sx={{ marginRight: "8px" }}>
            Close
          </Button>
          <Button  onClick={handleAddToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ProductModal;
