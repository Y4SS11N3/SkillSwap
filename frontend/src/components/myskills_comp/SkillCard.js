import React from 'react';

const SkillCard = ({ skill, onDelete }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 m-2 transition duration-300 ease-in-out transform hover:scale-105 border-l-4 border-sky-500">
    <h3 className="text-xl font-bold mb-2 text-sky-600">{skill.Skill.name}</h3>
    <p className="text-sm text-gray-600 mb-2">{skill.Skill.description}</p>
    <p className="text-sm font-semibold text-sky-500 mb-4">
      Proficiency: <span className="capitalize">{skill.proficiency}</span>
    </p>
    <div className="flex justify-between items-center">
      <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full">
        {skill.Skill.category}
      </span>
      <button 
        onClick={() => onDelete(skill.skillId)} 
        className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm hover:bg-rose-600 transition duration-300"
      >
        Delete
      </button>
    </div>
  </div>
);

export default SkillCard;