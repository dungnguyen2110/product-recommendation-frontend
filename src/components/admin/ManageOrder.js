import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManageOrder = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", total: 100, status: "Pending" },
    { id: 2, customerName: "Jane Smith", total: 200, status: "Pending" },
    { id: 3, customerName: "Michael Johnson", total: 150, status: "Pending" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [action, setAction] = useState(""); // "accept" or "reject"
  const [open, setOpen] = useState(false);

  const handleOpen = (order, action) => {
    setSelectedOrder(order);
    setAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setAction("");
  };

  const handleConfirmAction = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: action === "accept" ? "Accepted" : "Rejected" }
          : order
      )
    );
    handleClose();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Manage Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(order, "accept")}
                    style={{ marginRight: 8 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(order, "reject")}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Confirm {action === "accept" ? "acceptance" : "rejection"} of the order
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to {action === "accept" ? "accept" : "reject"} order{" "}
            {selectedOrder && selectedOrder.id}?
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmAction}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageOrder;