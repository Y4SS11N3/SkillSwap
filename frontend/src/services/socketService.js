import io from 'socket.io-client';
import { getCurrentUserId } from '../utils/utils';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const initializeSocket = () => {
  const userId = getCurrentUserId();
  const userString = localStorage.getItem('user');
  let token = null;

  if (userString) {
    try {
      const userData = JSON.parse(userString);
      token = userData.token;
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  if (!userId || !token) {
    console.error('User not found or not properly authenticated');
    return null;
  }

  const socket = io(SOCKET_URL, {
    auth: {
      token: token,
      userId: userId
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

export const emitRequestMeeting = (socket, exchangeId) => {
  if (socket) {
    socket.emit('request_meeting', { exchangeId });
  } else {
    console.error('Socket not initialized. Unable to request meeting.');
  }
};

export const emitAcceptMeeting = (socket, exchangeId) => {
  if (socket) {
    socket.emit('accept_meeting', { exchangeId });
  } else {
    console.error('Socket not initialized. Unable to accept meeting.');
  }
};