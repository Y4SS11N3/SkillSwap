import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSkills } from '../../redux/actions/skillActions';

const SkillSelectionModal = React.memo(({ isOpen, onClose, onSelectSkill, confirmButtonText }) => {
  const dispatch = useDispatch();
  const skillsState = useSelector(state => state.skills);
  
  const userSkills = useMemo(() => skillsState?.userSkills?.knownSkills || [], [skillsState]);
  
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUserSkills());
    }
  }, [isOpen, dispatch]);

  const handleSelectSkill = useCallback(() => {
    if (selectedSkill) {
      onSelectSkill(selectedSkill);
      onClose();
    }
  }, [selectedSkill, onSelectSkill, onClose]);

  const handleSkillChange = useCallback((e) => {
    const skillId = parseInt(e.target.value, 10);
    const skill = userSkills.find(skill => skill.skillId === skillId);
    if (skill) {
      setSelectedSkill({ id: skill.skillId, name: skill.Skill.name });
    } else {
      setSelectedSkill(null);
    }
  }, [userSkills]);

  const skillOptions = useMemo(() => {
    return userSkills.map(skill => (
      <option key={skill.skillId} value={skill.skillId}>
        {skill.Skill.name}
      </option>
    ));
  }, [userSkills]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Select a skill to offer</h3>
          <div className="mt-2 px-7 py-3">
            <select
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              value={selectedSkill ? selectedSkill.id : ''}
              onChange={handleSkillChange}
            >
              <option value="">Select a skill</option>
              {skillOptions}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleSelectSkill}
              disabled={!selectedSkill}
              className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                selectedSkill 
                  ? 'bg-sky-500 hover:bg-sky-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {confirmButtonText || "Confirm Selection"}
            </button>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SkillSelectionModal;