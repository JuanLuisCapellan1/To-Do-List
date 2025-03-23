const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/taskRoutes');
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(authRoutes, tasksRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

module.exports = app;
