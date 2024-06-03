import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Snackbar, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const DataScientistDashboard = () => {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('');
  const [parameters, setParameters] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleParametersChange = (event) => {
    setParameters(event.target.value);
  };

  const handleSubmit = () => {
    if (!file || !algorithm || !parameters) {
      setError('Please fill in all fields');
      return;
    }
    // Gửi dữ liệu lên server để xử lý
    setSuccessMessage('Data submitted successfully!');
    clearForm();
  };

  const clearForm = () => {
    setFile(null);
    setAlgorithm('');
    setParameters('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Data Scientist Interface
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Algorithm</InputLabel>
          <Select
            value={algorithm}
            onChange={handleAlgorithmChange}
          >
            <MenuItem value="knn">K-Nearest Neighbors (KNN)</MenuItem>
            {/* Add more algorithms here */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Parameters"
          value={parameters}
          onChange={handleParametersChange}
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


