import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sandal",
      price: 49.99,
      quantity: 1,
      image: "http://localhost:3001/images/sandal_1.jpg",
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid key={item.id} item xs={12}>
              <Card sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ width: 150, height: 150, objectFit: "cover" }}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      Quantity:
                    </Typography>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      inputProps={{ style: { width: 50 } }}
                      sx={{ width: 80 }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Subtotal: ${item.price * item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    variant="outlined"
                    color="error"
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            sx={{ textTransform: "none" }}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
