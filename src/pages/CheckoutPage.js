import React from "react";
import Header from "../components/common/Header";
import Checkout from "../components/user/Checkout";
import { Toolbar } from "@mui/material";
const CartPage = () => {
  return (
    <div>
      <Header />
      <Toolbar />
      <Checkout />
    </div>
  );
};

export default CartPage;
