import React, { useState } from 'react';

const proficiencyLevels = ['competent', 'proficient', 'expert', 'master'];

const AddSkillModal = ({ skill, onClose, onAdd }) => {
  const [selectedProficiency, setSelectedProficiency] = useState('competent');

  const handleAdd = () => {
    onAdd(skill.id, selectedProficiency);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add "{skill.name}" to your skills</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {skill.description}
            </p>
            <select
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value)}
              className="mt-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-sky-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              Add Skill
            </button>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-white text-sky-500 text-base font-medium rounded-md w-full shadow-sm border border-sky-300 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;