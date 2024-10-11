import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-white shadow-md p-6 mb-8 w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome to SkillSwap
        </h1>
      </header>
      <main className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <p className="text-gray-600 mb-4">
          Connect with others, share your skills, and learn something new!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </main>
    </div>
  );
}

export default App;