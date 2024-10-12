const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');
const { setupAssociations } = require('./models/associations');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Setup associations
setupAssociations();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;