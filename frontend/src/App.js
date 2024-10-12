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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-gray-100 flex flex-col">
          <ConditionalHeader />
          <div className="flex flex-grow">
            <ConditionalSidebar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/my-skills" element={<MySkills />} />
                  <Route path="/exchanges" element={<Exchanges />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </main>
          </div>
          <ConditionalFooter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;