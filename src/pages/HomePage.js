import React from "react";
import { Toolbar } from "@mui/material";
import Header from "../components/common/Header";
import ProductList from "../components/user/ProductList";
const HomePage = () => {
  return (
    <div>
      <Header />
      <Toolbar />
      <ProductList />
    </div>
  );
};

export default HomePage;
