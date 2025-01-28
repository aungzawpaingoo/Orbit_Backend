require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const backlogRoutes = require('./routes/backlogRoutes');
app.use('/api/projects', backlogRoutes);


const activeSprintRoutes = require('./routes/activeSprintRoutes');
app.use('/api/projects', activeSprintRoutes);


const calendarRoutes = require('./routes/calendarRoutes');
app.use('/api/projects', calendarRoutes);


const isssueRoutes = require('./routes/isssueRoutes');
app.use('/api/projects', isssueRoutes);


const goalRoutes = require('./routes/goalRoutes');
app.use('/api/projects', goalRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
