import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
  styled,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from "@mui/icons-material";

const StyledTypography = styled(Typography)({
  margin: "20px",
  padding: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  color: "white",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  letterSpacing: "2px",
  borderRadius: "5px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textDecoration: "none",
});

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFA500" }}>
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <StyledTypography variant="h5" component={Link} to="/">
              DBH-e
            </StyledTypography>
          </Grid>
          <Grid item xs={6}>
            <form sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  width: "calc(100% - 60px)",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginRight: "8px",
                  color: "black",
                  backgroundColor: "white",
                }}
              />
              <IconButton
                color="inherit"
                aria-label="search"
                sx={{
                  backgroundColor: "rgba(139, 69, 19, 0.5)",
                }}
              >
                <SearchIcon />
              </IconButton>
            </form>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "right" }}>
            <div sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ShoppingCartIcon sx={{ color: "black" }} />{" "}
              </IconButton>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ mr: 1, color: "black" }}
              >
                Login
              </Button>{" "}
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
