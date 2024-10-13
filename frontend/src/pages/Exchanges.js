import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSkills, createExchange, getExchanges, updateExchangeStatus, cancelExchange } from '../redux/actions/exchangeActions';
import SearchBar from '../components/exchanges_comp/SearchBar';
import SearchResultsCards from '../components/exchanges_comp/SearchResultsCards';
import ExchangeCard from '../components/exchanges_comp/ExchangeCard';
import { getCurrentUserId } from '../utils/utils';

const Exchanges = () => {
  const dispatch = useDispatch();
  const { searchResults, exchanges } = useSelector(state => state.exchange);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    dispatch(getExchanges());
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSkills(searchQuery));
  };

  const handleExchangeRequest = async (skill) => {
    console.log('Skill object:', skill);
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

  const handleStatusUpdate = (id, status) => {
    dispatch(updateExchangeStatus(id, status));
  };

  const handleCancelExchange = (id) => {
    dispatch(cancelExchange(id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Skill Exchanges</h1>
      
      <div className="mb-12">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
      </div>

      {searchResults && searchResults.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Search Results</h2>
          <SearchResultsCards 
            searchResults={searchResults} 
            handleExchangeRequest={handleExchangeRequest} 
            selectedSkill={selectedSkill} 
          />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Exchanges</h2>
        {!exchanges || exchanges.length === 0 ? (
          <p className="text-center text-gray-600">You have no exchanges yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exchanges.map((exchange) => (
              exchange && (
                <ExchangeCard 
                  key={exchange.id} 
                  exchange={exchange} 
                  getStatusColor={getStatusColor} 
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