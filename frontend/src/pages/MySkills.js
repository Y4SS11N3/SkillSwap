import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSkills, fetchSkills, addKnownSkill, deleteKnownSkill } from '../redux/actions/skillActions';
import AddSkillModal from '../components/myskills_comp/AddSkillModal';
import SkillCard from '../components/myskills_comp/SkillCard';

const MySkills = () => {
  const dispatch = useDispatch();
  const skillsState = useSelector(state => state.skills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserSkills());
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleAddSkill = (skillId, proficiency) => {
    dispatch(addKnownSkill(skillId, proficiency));
    setShowModal(false);
  };

  const handleDeleteSkill = (skillId) => {
    dispatch(deleteKnownSkill(skillId));
  };

  const userSkills = skillsState?.userSkills?.knownSkills || [];
  const allSkills = skillsState?.skills || [];
  const loading = skillsState?.loading || false;

  const filteredSkills = allSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !userSkills.some(userSkill => userSkill.skillId === skill.id)
  );

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search and add new skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
        />
      </div>

      {searchTerm && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map(skill => (
              <div key={skill.id} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-sky-600">{skill.name}</h4>
                <p className="text-sm text-gray-600">{skill.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full">
                    {skill.category}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedSkill(skill);
                      setShowModal(true);
                    }}
                    className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm hover:bg-sky-600 transition duration-300"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && selectedSkill && (
        <AddSkillModal
          skill={selectedSkill}
          onClose={() => setShowModal(false)}
          onAdd={handleAddSkill}
        />
      )}

      <h3 className="text-2xl font-bold mb-4 text-sky-700">My Known Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userSkills.map(skill => (
        <SkillCard 
            key={skill.skillId} 
            skill={skill} 
            onDelete={handleDeleteSkill} 
        />
        ))}
      </div>

      {loading && (
        <div className="text-center mt-8">
          <p className="text-xl text-sky-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default MySkills;