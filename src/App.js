import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import AdminDashboardPage from "./pages/AdminDoashBoardPage";
import DataScientistDashboardPage from "./pages/DataScientistDashBoardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CardPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/scientist/dashboard" element={<DataScientistDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
