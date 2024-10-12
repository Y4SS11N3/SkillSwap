export const getCurrentUserId = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        if (userData.user && userData.user.id) {
          return userData.user.id;
        } else {
          console.log('User ID not found in the expected structure');
          return null;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    console.log('No user found in localStorage');
    return null;
  };