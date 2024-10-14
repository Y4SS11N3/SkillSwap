import exchangeService from '../../services/exchangeService';

export const CREATE_EXCHANGE = 'CREATE_EXCHANGE';
export const GET_EXCHANGES = 'GET_EXCHANGES';
export const UPDATE_EXCHANGE_STATUS = 'UPDATE_EXCHANGE_STATUS';
export const CANCEL_EXCHANGE = 'CANCEL_EXCHANGE';
export const SEARCH_SKILLS = 'SEARCH_SKILLS';
export const GET_EXCHANGE_DETAILS = 'GET_EXCHANGE_DETAILS';
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR';

/**
 * Creates a new exchange.
 * @param {string} providerId - The ID of the skill provider.
 * @param {string} requesterSkillId - The ID of the requester's skill.
 * @param {string} providerSkillId - The ID of the provider's skill.
 * @returns {Function} A Redux thunk function.
 */
export const createExchange = (providerId, requesterSkillId, providerSkillId) => async (dispatch) => {
    try {
      let exchange = await exchangeService.createExchange(providerId, requesterSkillId, providerSkillId);
      
      exchange = {
        ...exchange,
        requester: exchange.requester || { name: 'Unknown User' },
        provider: exchange.provider || { name: 'Unknown User' },
        requesterSkill: exchange.requesterSkill || { name: 'Unknown Skill' },
        providerSkill: exchange.providerSkill || { name: 'Unknown Skill' }
      };
      
      dispatch({ type: CREATE_EXCHANGE, payload: exchange });
      
      const exchanges = await exchangeService.getExchanges();
      dispatch({ type: GET_EXCHANGES, payload: exchanges });
    } catch (error) {
      dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
    }
  };

/**
 * Fetches all exchanges.
 * @returns {Function} A Redux thunk function.
 */
export const getExchanges = () => async (dispatch) => {
  try {
    const exchanges = await exchangeService.getExchanges();
    dispatch({ type: GET_EXCHANGES, payload: exchanges });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};

/**
 * Updates the status of an exchange.
 * @param {string} id - The ID of the exchange to update.
 * @param {string} status - The new status of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const updateExchangeStatus = (id, status) => async (dispatch) => {
    try {
      const updatedExchange = await exchangeService.updateExchangeStatus(id, status);
      dispatch({ type: UPDATE_EXCHANGE_STATUS, payload: updatedExchange });
      
      const exchanges = await exchangeService.getExchanges();
      dispatch({ type: GET_EXCHANGES, payload: exchanges });
    } catch (error) {
      dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
    }
  };

/**
 * Cancels an exchange.
 * @param {string} id - The ID of the exchange to cancel.
 * @returns {Function} A Redux thunk function.
 */
export const cancelExchange = (id) => async (dispatch) => {
    try {
      const canceledExchange = await exchangeService.cancelExchange(id);
      dispatch({ type: CANCEL_EXCHANGE, payload: canceledExchange });
    } catch (error) {
      dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
    }
};

/**
 * Searches for skills based on a query.
 * @param {string} query - The search query.
 * @returns {Function} A Redux thunk function.
 */
export const searchSkills = (query) => async (dispatch) => {
  try {
    const skills = await exchangeService.searchSkills(query);
    dispatch({ type: SEARCH_SKILLS, payload: skills });
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.response.data.message });
  }
};

/**
 * Fetches details of a specific exchange.
 * @param {string} id - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const getExchangeDetails = (id) => async (dispatch) => {
  try {
    const response = await exchangeService.getExchangeDetails(id);
    dispatch({ 
      type: GET_EXCHANGE_DETAILS, 
      payload: {
        ...response,
        meetingRequestStatus: response.meetingRequestStatus
      } 
    });
    return response;
  } catch (error) {
    dispatch({ type: EXCHANGE_ERROR, payload: error.message });
  }
};