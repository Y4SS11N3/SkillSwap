import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSkills, createExchange, getExchanges } from '../redux/actions/exchangeActions';
import SearchBar from '../components/exchanges_comp/SearchBar';
import SearchResults from '../components/exchanges_comp/SearchResults';
import ExchangeCard from '../components/exchanges_comp/ExchangeCard';

const Exchanges = () => {
  const dispatch = useDispatch();
  const { searchResults, exchanges } = useSelector(state => state.exchange);
  const currentUser = useSelector(state => state.auth.user);
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
          <SearchResults 
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
                  currentUserId={currentUser.id} 
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