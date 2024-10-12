import React from 'react';

const SearchResults = ({ searchResults, handleExchangeRequest, selectedSkill }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {searchResults.map((skill) => (
        skill && (
          <div key={skill.id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{skill.User?.name}</p>
            <button
              onClick={() => handleExchangeRequest(skill)}
              className={`w-full py-2 rounded-lg transition duration-300 ease-in-out ${
                selectedSkill && selectedSkill.id === skill.id
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {selectedSkill && selectedSkill.id === skill.id ? 'Selected' : 'Exchange'}
            </button>
          </div>
        )
      ))}
    </div>
  );
};

export default SearchResults;