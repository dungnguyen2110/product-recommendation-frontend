import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/")
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">Product Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">Quantity</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">Price</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Sandal</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">1</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">49.99$</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Place Order
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Checkout;
