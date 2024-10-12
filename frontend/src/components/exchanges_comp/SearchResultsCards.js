import React from 'react';

const SearchResultsCards = ({ searchResults, handleExchangeRequest, selectedSkill }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {searchResults.map((skill) => (
        <div key={skill.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
            <p className="text-xs text-gray-500 mb-2">Category: {skill.category}</p>
            <p className="text-xs text-gray-500">Offered by: {skill.userName}</p>
          </div>
          <div className="p-4 bg-gray-100">
            <button 
              onClick={() => handleExchangeRequest(skill)}
              className={`w-full py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                selectedSkill && selectedSkill.id === skill.id
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {selectedSkill && selectedSkill.id === skill.id ? 'Selected' : 'Exchange'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsCards;