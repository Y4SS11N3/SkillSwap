import React from 'react';

const SearchResultsCards = ({ searchResults, handleExchangeRequest, selectedSkill }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {searchResults.map((skill) => (
        <div key={skill.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border border-slate-200">
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-800">{skill.name}</h3>
              <span className="text-xs font-medium px-2 py-1 bg-sky-100 text-sky-800 rounded-full">
                {skill.category}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4">{skill.description}</p>
            <div className="flex items-center text-sm text-slate-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {skill.userName}
            </div>
          </div>
          <div className="px-6 pb-6">
            <button 
              onClick={() => handleExchangeRequest(skill)}
              className={`w-full py-2 px-4 rounded-full transition duration-300 ease-in-out ${
                selectedSkill && selectedSkill.id === skill.id
                  ? 'bg-teal-500 text-white hover:bg-teal-600'
                  : 'bg-sky-500 text-white hover:bg-sky-600'
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