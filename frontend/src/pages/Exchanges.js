import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSkills, createExchange, getExchanges, updateExchangeStatus, cancelExchange } from '../redux/actions/exchangeActions';
import SearchResultsCards from '../components/exchanges_comp/SearchResultsCards';
import ExchangeCard from '../components/exchanges_comp/ExchangeCard';
import { getCurrentUserId } from '../utils/utils';

const Exchanges = () => {
  const dispatch = useDispatch();
  const { searchResults, exchanges } = useSelector(state => state.exchange);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(getExchanges());
    dispatch(searchSkills(''));
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
  }, [dispatch]);

  const handleExchangeRequest = async (skill) => {
    if (selectedSkill) {
      if (skill.userId) {
        await dispatch(createExchange(skill.userId, selectedSkill.id, skill.id));
        dispatch(getExchanges());
      } else {
        console.error('Invalid skill object structure:', skill);
      }
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  const handleStatusUpdate = (id, status) => {
    dispatch(updateExchangeStatus(id, status));
  };

  const handleCancelExchange = (id) => {
    dispatch(cancelExchange(id));
  };

  const filteredExchanges = exchanges.filter(exchange => 
    statusFilter === 'all' || exchange.status === statusFilter
  );

  const filterButtons = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'declined', label: 'Declined' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'completed', label: 'Completed' },
  ];

  const filteredSearchResults = searchResults.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Skill Exchanges</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
        />
      </div>

      {searchQuery && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Search Results</h2>
          {filteredSearchResults.length > 0 ? (
            <SearchResultsCards 
              searchResults={filteredSearchResults} 
              handleExchangeRequest={handleExchangeRequest} 
              selectedSkill={selectedSkill} 
            />
          ) : (
            <p className="text-center text-gray-600">No results found for "{searchQuery}"</p>
          )}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Exchanges</h2>
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {filterButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => setStatusFilter(button.value)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                statusFilter === button.value
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
        {!filteredExchanges || filteredExchanges.length === 0 ? (
          <p className="text-center text-gray-600">No exchanges found for the selected filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExchanges.map((exchange) => (
              exchange && (
                <ExchangeCard 
                  key={exchange.id} 
                  exchange={exchange} 
                  currentUserId={currentUserId}
                  onStatusUpdate={handleStatusUpdate}
                  onCancel={handleCancelExchange}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchanges;