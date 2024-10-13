const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');
const { setupAssociations, Message, User } = require('./models/associations');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

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

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_chat', (exchangeId) => {
    socket.join(exchangeId);
  });

  socket.on('send_message', async (data) => {
    try {
      // Save the message to the database
      const newMessage = await Message.create({
        content: data.content,
        exchangeId: data.exchangeId,
        senderId: data.senderId,
      });
  
      // Fetch the created message with associated user data
      const messageWithUser = await Message.findByPk(newMessage.id, {
        include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }]
      });
  
      // Emit the message with the id and user data
      io.to(data.exchangeId).emit('receive_message', {
        id: messageWithUser.id,
        content: messageWithUser.content,
        exchangeId: messageWithUser.exchangeId,
        senderId: messageWithUser.senderId,
        sender: {
          id: messageWithUser.sender.id,
          name: messageWithUser.sender.name
        },
        createdAt: messageWithUser.createdAt
      });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('message_error', { message: 'Failed to save message', details: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;