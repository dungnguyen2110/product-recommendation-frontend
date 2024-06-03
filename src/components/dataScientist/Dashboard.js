import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Snackbar, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const DataScientistDashboard = () => {
  const [file, setFile] = useState(null);
  const [interests, setInterests] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [userBehavior, setUserBehavior] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInterestsChange = (event) => {
    setInterests(event.target.value);
  };

  const handlePurchaseHistoryChange = (event) => {
    setPurchaseHistory(event.target.value);
  };

  const handleUserBehaviorChange = (event) => {
    setUserBehavior(event.target.value);
  };

  const handleSubmit = () => {
    if (!file || !interests || !purchaseHistory || !userBehavior) {
      setError('Please fill in all fields');
      return;
    }
    // Gửi dữ liệu lên server để xử lý
    setSuccessMessage('Data submitted successfully!');
    clearForm();
  };

  const clearForm = () => {
    setFile(null);
    setInterests('');
    setPurchaseHistory('');
    setUserBehavior('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Data Scientist Interface
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <TextField
          fullWidth
          label="Interests"
          value={interests}
          onChange={handleInterestsChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Purchase History"
          value={purchaseHistory}
          onChange={handlePurchaseHistoryChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="User Behavior"
          value={userBehavior}
          onChange={handleUserBehaviorChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
    </Container>
  );
};

export default DataScientistDashboard;
