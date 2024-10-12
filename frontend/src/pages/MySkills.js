import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSkills, fetchSkills, addKnownSkill } from '../redux/actions/skillActions';

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SkillCard = ({ skill, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-2">
    <h3 className="text-lg font-semibold">{skill.name}</h3>
    <p className="text-sm text-gray-600">Proficiency: {skill.proficiency}</p>
    <button 
      onClick={() => onDelete(skill.id)} 
      className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
);

const MySkills = () => {
  const dispatch = useDispatch();
  const skillsState = useSelector(state => state.skills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState('Beginner');

  useEffect(() => {
    dispatch(fetchUserSkills());
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleAddSkill = () => {
    if (selectedSkill) {
      dispatch(addKnownSkill(selectedSkill.id, selectedProficiency));
      setSelectedSkill(null);
      setSelectedProficiency('Beginner');
    }
  };

  const handleDeleteSkill = (skillId) => {
    console.log(`Delete skill with id: ${skillId}`);
  };

  const userSkills = skillsState?.userSkills?.knownSkills || [];
  const allSkills = skillsState?.skills || [];
  const loading = skillsState?.loading || false;

  const filteredSkills = allSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Skills</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {searchTerm && (
        <div className="mb-4">
          <select 
            value={selectedSkill ? selectedSkill.id : ''} 
            onChange={(e) => setSelectedSkill(allSkills.find(s => s.id === parseInt(e.target.value)))}
            className="p-2 border rounded mr-2"
          >
            <option value="">Select a skill</option>
            {filteredSkills.map(skill => (
              <option key={skill.id} value={skill.id}>{skill.name}</option>
            ))}
          </select>
          <select
            value={selectedProficiency}
            onChange={(e) => setSelectedProficiency(e.target.value)}
            className="p-2 border rounded mr-2"
          >
            {proficiencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button 
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userSkills.map(skill => (
          <SkillCard key={skill.id} skill={skill} onDelete={handleDeleteSkill} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MySkills;