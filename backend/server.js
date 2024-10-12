const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const sequelize = db.sequelize;
const authRoutes = require('./routes/authRoutes');
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

// Routes
app.use('/api/auth', authRoutes);

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'Users'");
  })
  .then(([results, metadata]) => {
  })
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;