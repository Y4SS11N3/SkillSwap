import messageService from '../../services/messageService';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const MESSAGE_ERROR = 'MESSAGE_ERROR';

/**
 * Fetches messages for a specific exchange.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const getMessages = (exchangeId) => async (dispatch) => {
  try {
    const messages = await messageService.getMessages(exchangeId);
    dispatch({ type: GET_MESSAGES, payload: messages });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.response.data.message });
  }
};

/**
 * Sends a message in a specific exchange.
 * @param {string} exchangeId - The ID of the exchange.
 * @param {string} content - The content of the message.
 * @returns {Function} A Redux thunk function.
 */
export const sendMessage = (exchangeId, content) => async (dispatch) => {
  try {
    const message = await messageService.sendMessage(exchangeId, content);
    dispatch({ type: SEND_MESSAGE, payload: message });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.response.data.message });
  }
};

/**
 * Handles receiving a new message.
 * @param {Object} message - The received message object.
 * @returns {Object} An action object.
 */
export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message
});