import React from "react";
import Header from "../components/common/Header";
import { Toolbar } from "@mui/material";
import DataScientistDashboard from "../components/dataScientist/Dashboard";
const DataScientistDashboardPage = () => {
  return (
    <div>
      <Header />
      <Toolbar />
      <DataScientistDashboard />
    </div>
  );
};

export default DataScientistDashboardPage;
