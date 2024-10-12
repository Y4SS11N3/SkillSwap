import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConditionalHeader from './components/Headers/ConditionalHeader';
import ConditionalFooter from './components/Footers/ConditionalFooter';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex flex-col">
        <ConditionalHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;