const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/projects', projectRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
