const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');
const { setupAssociations } = require('./models/associations');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const messageRoutes = require('./routes/messageRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const setupSocketHandlers = require('./socketHandlers');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

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
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/profile', profileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup Socket Handlers
setupSocketHandlers(io);

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;