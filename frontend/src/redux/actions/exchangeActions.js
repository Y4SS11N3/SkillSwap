import exchangeService from '../../services/exchangeService';

export const CREATE_EXCHANGE = 'CREATE_EXCHANGE';
export const GET_EXCHANGES = 'GET_EXCHANGES';
export const UPDATE_EXCHANGE_STATUS = 'UPDATE_EXCHANGE_STATUS';
export const CANCEL_EXCHANGE = 'CANCEL_EXCHANGE';
export const SEARCH_SKILLS = 'SEARCH_SKILLS';
export const GET_EXCHANGE_DETAILS = 'GET_EXCHANGE_DETAILS';
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR';

export const createExchange = (providerId, requesterSkillId, providerSkillId) => async (dispatch) => {
    try {
      const exchange = await exchangeService.createExchange(providerId, requesterSkillId, providerSkillId);
      dispatch({ type: CREATE_EXCHANGE, payload: exchange });
      const exchanges = await exchangeService.getExchanges();
      dispatch({ type: GET_EXCHANGES, payload: exchanges });
    } catch (error) {
      dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
    }
};

export const getExchanges = () => async (dispatch) => {
  try {
    const exchanges = await exchangeService.getExchanges();
    dispatch({ type: GET_EXCHANGES, payload: exchanges });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};

export const updateExchangeStatus = (id, status) => async (dispatch) => {
  try {
    const updatedExchange = await exchangeService.updateExchangeStatus(id, status);
    dispatch({ type: UPDATE_EXCHANGE_STATUS, payload: updatedExchange });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};

export const cancelExchange = (id) => async (dispatch) => {
    try {
      const canceledExchange = await exchangeService.cancelExchange(id);
      dispatch({ type: CANCEL_EXCHANGE, payload: canceledExchange });
    } catch (error) {
      dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
    }
};

export const searchSkills = (query) => async (dispatch) => {
  try {
    const skills = await exchangeService.searchSkills(query);
    dispatch({ type: SEARCH_SKILLS, payload: skills });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};

export const getExchangeDetails = (id) => async (dispatch) => {
  try {
    const exchange = await exchangeService.getExchangeDetails(id);
    dispatch({ type: GET_EXCHANGE_DETAILS, payload: exchange });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};