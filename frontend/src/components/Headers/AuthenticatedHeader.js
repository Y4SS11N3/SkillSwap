import React from 'react';
import { useLocation } from 'react-router-dom';

const AuthenticatedHeader = () => {
  const location = useLocation();

  const pageTitle = {
    '/dashboard': 'Dashboard',
    '/exchanges': 'Exchanges',
    '/my-skills': 'My Skills',
    '/profile': 'Profile',
  }[location.pathname] || 'SkillSwap';

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;