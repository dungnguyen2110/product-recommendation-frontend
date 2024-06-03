import React from "react";
import Header from "../components/common/Header";
import Cart from "../components/user/Cart";
import { Toolbar } from "@mui/material";
const CartPage = () => {
  return (
    <div>
      <Header />
      <Toolbar />
      <Cart />
    </div>
  );
};

export default CartPage;
