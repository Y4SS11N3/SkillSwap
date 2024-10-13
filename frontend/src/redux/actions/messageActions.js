import messageService from '../../services/messageService';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const MESSAGE_ERROR = 'MESSAGE_ERROR';

export const getMessages = (exchangeId) => async (dispatch) => {
  try {
    const messages = await messageService.getMessages(exchangeId);
    dispatch({ type: GET_MESSAGES, payload: messages });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.response.data.message });
  }
};

export const sendMessage = (exchangeId, content) => async (dispatch) => {
  try {
    const message = await messageService.sendMessage(exchangeId, content);
    dispatch({ type: SEND_MESSAGE, payload: message });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.response.data.message });
  }
};

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message
});