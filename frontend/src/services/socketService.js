import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const initializeSocket = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const socket = io(SOCKET_URL, {
    auth: {
      token: user.token
    }
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('connect_error', (err) => {
    console.error('WebSocket connection error:', err);
  });

  return socket;
};

export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};