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
} from "@mui/material";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 10,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      quantity: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <Container
      maxWidth="md"
      sx={{ mt: 4, border: "1px solid #ddd", padding: "16px" }}
    >
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
              <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ width: 150, objectFit: "cover" }}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    inputProps={{ style: { width: 50 } }}
                  />
                  <Typography variant="body1">
                    Subtotal: ${item.price * item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    variant="outlined"
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
            // component={Link}
            // to="/checkout"
            sx={{ textTransform: "none" }}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartComponent;
