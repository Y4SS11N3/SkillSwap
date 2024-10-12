import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ConditionalHeader from './components/Headers/ConditionalHeader';
import ConditionalFooter from './components/Footers/ConditionalFooter';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-gray-100 flex flex-col">
          <ConditionalHeader />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;