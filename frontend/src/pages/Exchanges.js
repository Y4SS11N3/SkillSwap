import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSkills, createExchange, getExchanges } from '../redux/actions/exchangeActions';

const Exchanges = () => {
  const dispatch = useDispatch();
  const { searchResults, exchanges } = useSelector(state => state.exchange);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    dispatch(getExchanges());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSkills(searchQuery));
  };

  const handleExchangeRequest = (skill) => {
    if (selectedSkill) {
      dispatch(createExchange(skill.User.id, selectedSkill.id, skill.id));
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'accepted': return 'bg-green-200 text-green-800';
      case 'declined': return 'bg-red-200 text-red-800';
      case 'canceled': return 'bg-gray-200 text-gray-800';
      case 'completed': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Skill Exchanges</h1>
      
      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for skills..."
            className="flex-grow p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((skill) => (
              <div key={skill.id} className="border rounded p-4 shadow-sm">
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.User.name}</p>
                <button
                  onClick={() => handleExchangeRequest(skill)}
                  className={`mt-2 px-3 py-1 rounded ${
                    selectedSkill && selectedSkill.id === skill.id
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {selectedSkill && selectedSkill.id === skill.id ? 'Selected' : 'Exchange'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Exchanges */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Exchanges</h2>
        {exchanges.length === 0 ? (
          <p>You have no exchanges yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exchanges.map((exchange) => (
              <div key={exchange.id} className="border rounded p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {exchange.requesterSkill.name} ↔ {exchange.providerSkill.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      With: {exchange.requesterId === exchange.User.id ? exchange.provider.name : exchange.requester.name}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(exchange.status)}`}>
                    {exchange.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchanges;