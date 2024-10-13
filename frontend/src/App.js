import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ConditionalHeader from './components/Headers/ConditionalHeader';
import ConditionalFooter from './components/Footers/ConditionalFooter';
import ConditionalSidebar from './components/Sidebars/ConditionalSidebar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import MySkills from './pages/MySkills';
import Exchanges from './pages/Exchanges';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-gray-100 flex">
          <ConditionalSidebar />
          <div className="flex flex-col flex-grow ml-16 md:ml-64">
            <ConditionalHeader />
            <main className="flex-grow p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/my-skills" element={<MySkills />} />
                  <Route path="/exchanges" element={<Exchanges />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chat/:id" element={<Chat />} />
                </Route>
              </Routes>
            </main>
            <ConditionalFooter />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;