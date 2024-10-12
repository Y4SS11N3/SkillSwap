import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import AuthenticatedHeader from './AuthenticatedHeader';

const ConditionalHeader = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('user');
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isHomePage) {
    return <Header />;
  } else if (isAuthenticated && !isAuthPage) {
    return <AuthenticatedHeader />;
  } else {
    return null;
  }
};

export default ConditionalHeader;