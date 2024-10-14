/**
 * Generates a unique Jitsi meeting (free and open-source multiplatform) link for a given exchange
 * @param {string|number} exchangeId - The unique identifier for the exchange
 * @returns {string} The generated Jitsi meeting link
 */
const generateJitsiLink = (exchangeId) => {
    const baseUrl = 'https://meet.jit.si/';
    const roomName = `SkillSwap-Exchange-${exchangeId}-${Date.now()}`;
    return `${baseUrl}${roomName}`;
  };
  
  module.exports = {
    generateJitsiLink
  };