const generateJitsiLink = (exchangeId) => {
    const baseUrl = 'https://meet.jit.si/';
    const roomName = `SkillSwap-Exchange-${exchangeId}-${Date.now()}`;
    return `${baseUrl}${roomName}`;
  };
  
  module.exports = {
    generateJitsiLink
  };