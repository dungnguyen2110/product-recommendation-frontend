import React from "react";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const ProductModal = ({ showModal, closeModal, selectedProduct }) => {
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
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {selectedProduct && selectedProduct.name}
          </Typography>
          <img
            src={selectedProduct && selectedProduct.image}
            alt={selectedProduct && selectedProduct.name}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
          />
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {selectedProduct && selectedProduct.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Price: ${selectedProduct && selectedProduct.price}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sold: {selectedProduct && selectedProduct.sold}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Detailed Features:
          </Typography>
          <ul>
            <li>Size: {selectedProduct && selectedProduct.size}</li>
            <li>Color: {selectedProduct && selectedProduct.color}</li>
            <li>Material: {selectedProduct && selectedProduct.material}</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button onClick={closeModal}>Close</Button>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ProductModal;
