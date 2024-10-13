import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ConditionalHeader from './components/Headers/ConditionalHeader';
import ConditionalFooter from './components/Footers/ConditionalFooter';
import ConditionalSidebar from './components/Sidebars/ConditionalSidebar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import MySkills from './pages/MySkills';
import Exchanges from './pages/Exchanges';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('user');
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);
  const isChat = location.pathname.startsWith('/chat/');

  return (
    <div className={`App min-h-screen bg-gray-100 ${isAuthenticated && !isAuthPage ? 'flex' : ''}`}>
      {isAuthenticated && !isAuthPage && <ConditionalSidebar />}
      <div className={`flex flex-col flex-grow ${isAuthenticated && !isAuthPage ? 'ml-16 md:ml-64' : ''}`}>
        <ConditionalHeader />
        <main className={`flex-grow ${isAuthenticated && !isAuthPage && !isChat ? 'p-4' : ''} ${isChat ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {children}
        </main>
        {!isChat && <ConditionalFooter />}
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/my-skills" element={<MySkills />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;